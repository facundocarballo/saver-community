import { HStack, VStack, Spacer, Box, Button, Input, Spinner, useColorModeValue, useDisclosure, AlertDialog, 
    AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
     AlertDialogBody, AlertDialogFooter, Text } from '@chakra-ui/react';
import { CardDapp } from '../../components/dapp/card'; 
import { Timer } from '../../components/dapp/timer';
import { GAS_PRICE, loadDappData, SAVER_TOKEN_CONTRACT_ADDRESS, STABLE_COIN_CONTRACT_ADDRESS, STABLE_COIN_FORMAT } from '../../web3/funcs';
import React from 'react';
import { useProvider } from '../../context';
import { PurposeMobile } from '../../components/dapp/purposes';
import { CloseIcon } from "@chakra-ui/icons";
import { MAIN_CURRENCY } from '../../web3/funcs';


export const AmountReward = () => {

    const { 
        addresAccount,
        Able, 
        StableCoin,
        USDC, 
        USDT,
        canClaim,
        actualRewardState, 
        futureRewardState,
        Qualified,
        uploadBuyCDA,
        uploadReward
    } = useProvider();

    const [showInput, setShowInput] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loading2, setLoading2] = React.useState(false);
    const [isApprove, setIsApprove] = React.useState(false);
    const [approving, setApproving] = React.useState(false);
    const [donating, setDonating] = React.useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef()

    const [isOpenClaimMessage, setIsOpenClaimMessage] = React.useState(false);
    
    const [amountToDonate, setAmountToDonate] = React.useState('');
    const [amountClaimed, setAmountClaimed] = React.useState(0);

    const colorRed = useColorModeValue('red.400', 'red.500');

    // Recover
    const [loadingRecover, setLoadingRecover] = React.useState(false);
    const [isOpenRecover, setIsOpenRecover] = React.useState(true);

    const handleRecover = async () => 
    {
        const data = await Able.contract.methods.saverRecover(addresAccount).encodeABI();

        const nonce =  await web3.eth.getTransactionCount(addresAccount);

        const estimateGas = await web3.eth.estimateGas({
            from: addresAccount,
            nonce: nonce,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            data: data
        });

        const params = {
            from: addresAccount,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('5', 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);

            setLoadingRecover(true);

            const interval = setInterval(() => {

                web3.eth.getTransactionReceipt(res, async (err, rec) => {
                    if (rec) 
                    {
                        clearInterval(interval);
                        await uploadBuyCDA();
                        setTimeout(() => {
                            setIsOpenRecover(false);
                            setLoadingRecover(false);
                        }, 5000);
                    }
                    
                    if(err)
                    {
                        clearInterval(interval);
                        console.log('ERROR: ', err);
                    }
                });
                
            }, 500);
            
        });
        
    };

    const getMin = (saver, dai, USDC) => 
    {
        var min = saver;

        if (Number(dai) < Number(min))
        {
            min = dai;
        }

        if (Number(USDC) < Number(min)) 
        {
            min = USDC;
        }

        return Number(min);
    };

     const getMaxAmountToDonate = () => 
     {
        const min = getMin(Able.balance, USDT.balance, USDC.balance);

        const USDC = Number(USDC.balance);
        const bdd = Number(Able.donationBalance);

        if (USDC == min) return USDC / 2;

        if (bdd == 0 && (USDC - min) >= min)
        {
            return min;
        }

        if (bdd == 0) return (USDC / 2);

        if ((((USDC - bdd) / 2) + bdd) <= min)
        {
            return ((USDC - bdd) / 2);
        }

        let i = 2;

        while( ( ( ( USDC - min ) / i ) + bdd ) > min) i++;

        return ((USDC - min) / i);

     };

     
     const handleBuyCDA = async () =>
     {
        const data = await Able.contract.methods.donateStableCoin().encodeABI();
        
        const nonce = await web3.eth.getTransactionCount(addresAccount);

        const estimateGas = await Able.contract.methods.donateStableCoin().estimateGas({
            from: addresAccount,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            value: web3.utils.toHex(web3.utils.toWei(amountToDonate, 'ether')),
            nonce: nonce,
            data: data
        });

        const params = {
            from: addresAccount,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            value: web3.utils.toHex(web3.utils.toWei(amountToDonate, 'ether')),
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei(GAS_PRICE, 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);

            setLoading(true);
            const interval = setInterval( () => {
                web3.eth.getTransactionReceipt(res, async (err, rec) => {
                    if (rec)
                    {
                        clearInterval(interval);
                        await uploadBuyCDA();
                        setLoading(false);
                        setIsApprove(false);
                        setShowInput(false);
                        setDonating(false);
                        setAmountToDonate(null);
                        // Mostrar PopUp
                        onOpen();
                        // Recargar datos de la blockchain (como si fuera que toca el boton de actualizar)
                    }

                    if (err) 
                    {
                        clearInterval(interval);
                        console.log('ERROR: ', err);
                        /// Mostrar en pantalla que ocurrio un error.
                    }

                });
            }, 500);
            
         });

     }

// Estas dos funciones no sirven mas
    const handleApprove = async () => 
    {
        setApproving(true);

        const amountWEI = await web3.utils.toWei(amountToDonate, STABLE_COIN_FORMAT);
        const data = StableCoin.contract.methods.approve(SAVER_TOKEN_CONTRACT_ADDRESS, amountWEI).encodeABI();

        const nonce = await web3.eth.getTransactionCount(addresAccount);
        
        const estimateGas = await web3.eth.estimateGas({
            from: addresAccount,
            nonce: nonce,
            to: STABLE_COIN_CONTRACT_ADDRESS,
            data: data
        });

        const params = {
            from: addresAccount,
            to: STABLE_COIN_CONTRACT_ADDRESS,
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei(GAS_PRICE, 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);

            setLoading(true);

            const interval = setInterval(() => {

                web3.eth.getTransactionReceipt(res, (err, rec) => {
                    if (rec) 
                    {
                        clearInterval(interval);
                        setTimeout(() => {
                            setIsApprove(true);
                            setLoading(false);
                            setApproving(false);
                        }, 5000);
                    }
                    
                    if(err)
                    {
                        clearInterval(interval);
                        console.log('ERROR: ', err);
                    }
                });
                
            }, 500);
            
        });

    };

    const handleDonate = async () => 
    {
        setDonating(true);
        const amountWEI = await web3.utils.toWei(amountToDonate, STABLE_COIN_FORMAT);
        const data = await Able.contract.methods.donateStableCoin(amountWEI).encodeABI();

        const nonce = await web3.eth.getTransactionCount(addresAccount);
        
        const estimateGas = await Able.contract.methods.donateStableCoin(amountWEI).estimateGas({
            from: addresAccount,
            nonce: nonce,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            data: data
        });
        
        const params = {
            from: addresAccount,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei(GAS_PRICE, 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);

            setLoading(true);
            const interval = setInterval( () => {
                web3.eth.getTransactionReceipt(res, async (err, rec) => {
                    if (rec)
                    {
                        clearInterval(interval);
                        await uploadBuyCDA();
                        setLoading(false);
                        setIsApprove(false);
                        setShowInput(false);
                        setDonating(false);
                        setAmountToDonate(null);
                        // Mostrar PopUp
                        onOpen();
                        // Recargar datos de la blockchain (como si fuera que toca el boton de actualizar)
                    }

                    if (err) 
                    {
                        clearInterval(interval);
                        console.log('ERROR: ', err);
                        /// Mostrar en pantalla que ocurrio un error.
                    }

                });
            }, 500);
            
         });

    };

    const handleClaim = async () => 
    {
        const data = await Able.contract.methods.claim().encodeABI();

        const nonce = await web3.eth.getTransactionCount(addresAccount);

        const estimateGas = await Able.contract.methods.claim().estimateGas({
            from: addresAccount,
            nonce: nonce,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            data: data
        });

        const params = {
            from: addresAccount,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei(GAS_PRICE, 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);
            
            setLoading2(true);
            var i = 1;
            const interval = setInterval(() => {

                web3.eth.getTransactionReceipt(res, async (err, rec) => {
                    if (rec)
                    {
                        clearInterval(interval);

                        await uploadReward();
                        setLoading2(false);
                        setAmountClaimed(actualAmountToClaim)
                        setIsOpenClaimMessage(true);
                    }
                    if (err)
                    {
                        clearInterval(interval);
                        console.log('ERROR: ', err);
                    }
                });

                i++;

            }, 500);

        });
    };


      return (
          <>
            {/* PopUp Donation */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Gracias por donar a Saver Community
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Con su acción generosa ayuda a otros ahorradores a cumplir sus propósitos
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button colorScheme='pink' ref={cancelRef} onClick={onClose} ml={3}>
                        Donar es Recibir
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

             {/* PopUp Claim */}
             <AlertDialog
                isOpen={isOpenClaimMessage}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpenClaimMessage(false)}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Gracias por Ahorrar junto a Saver Community
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Has recibido {amountClaimed} USDC por conservar tus Ahorros.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button colorScheme='pink' ref={cancelRef} onClick={() => setIsOpenClaimMessage(false)} ml={3}>
                        Donar es Recibir
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* DESKTOP */}

            <HStack w='full' display={{xl: 'flex', lg: 'none', md: 'none', sm: 'none', base: 'none'}}>
                <Spacer />

                {/* BOTE RECAUDANDO */}
                <VStack w='full'>
                    <CardDapp {...futureRewardState} />
                    {
                        loading ? <Spinner /> :
                        !showInput ?
                        <Button w='450px' h='50px' fontSize='3xl' fontWeight='bold' variant='callToAction'
                        onClick={ () => setShowInput(true) } >ADQUIRIR CDA</Button>
                        : 
                        <HStack w='450px'>
                            <Box w='10px' />
                            <Input
                             value={amountToDonate}
                             placeholder="Cantidad de USDT a donar"
                             onChange={ (e) => setAmountToDonate(e.currentTarget.value) }
                             borderColor={ Number(amountToDonate) > 0 ? 'pink.400' : colorRed }
                             type='number'
                             w='full'
                             h='50px'
                             />
                             <Box w='10px' />
                             {
                                 Number(amountToDonate) > 0 ?
                                 isApprove ? 
                                 <Button variant='info' onClick={handleDonate} h='50px' w='450px' isDisabled={approving} >
                                     {'ADQUIRIR CDA'}
                                 </Button> : 
                                 <Button variant='info' onClick={handleApprove} h='50px' w='450px' isDisabled={approving} >
                                    {'Aprobar Transacción'}
                                </Button> : null
                             }
                            <Box w='10px' />
                             <Button variant='alertDapp' onClick={() => setShowInput(false) } h='50px' >
                                <CloseIcon />
                            </Button>
                        </HStack>
                    }
                </VStack>

                <Spacer />

                <Timer />

                <Spacer />
                
                {/* BOTE REPARTIENDO */}
                <VStack w='full'>
                    <CardDapp {...actualRewardState} />
                    {
                        loading2 ? <Spinner /> :
                        <Button w='450px' h='50px' fontSize='3xl' fontWeight='bold' variant='callToAction'
                        onClick={ handleClaim } isDisabled={!canClaim}>RECIBIR</Button>
                         
                    }
                    {
                            !canClaim ? 
                                !canClaim() ?
                                    // Donar X para alcanzar los 1.2 xDAI diarios
                                    !Qualified.donatedPerDay ? 
                                    <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                        Debes comprar 1.2 CDA por dia. (Te faltan {Number(1.2 - Number(Able.donatedLastDay)).toFixed(2)} xDAI)
                                    </Text> :
                                    !Qualified.savings ?
                                        (Number(USDC.balance) + Number(USDT.balance)) >= Number(Able.savingLimit) ?
                                            <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                                Debes actualizar para que el contrato sepa que estas calificado
                                            </Text>
                                        : 
                                        <VStack>
                                            <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                                Debes aumentar tus ahorros (USDC y DAI) en un 0.369%
                                            </Text>
                                            <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                                Necesitas ingresar esta cantidad para calificarte
                                            </Text>
                                            <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                                { Number( Number(Able.savingLimit) - ( Number(USDC.balance) + Number(USDT.balance)) ).toFixed(2) } USDC o DAI
                                            </Text>
                                        </VStack> 
                                    :
                                    <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                        Debes calificarte para poder recibir.
                                    </Text> 
                                :
                                // Aumentar ahorros
                                    <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                        Debes esperar al proximo bote para poder recibir.
                                    </Text> 
                                    
                            : null
                        }
                    {
                        (!canClaim && canClaim() && (actualRewardState.actualAmount < actualAmountToClaim) ) ?
                            <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                No quedan fondos suficientes en el bote para entregar la cantidad que debes recibir.
                            </Text> : null
                    }
                </VStack>

                <Spacer />

            </HStack>

            {/* MOBIL */}
            
            <VStack w='full' display={{xl:'none',lg: 'flex', md: 'flex', sm: 'flex', base: 'flex'}}>
                {/* BOTE REPARTIENDO */}
                <HStack w='full'>
                    <Box w='10px' />
                    <VStack w='full'>
                        <CardDapp {...futureRewardState} />
                        {
                        loading ? <Spinner /> :
                        !showInput ?
                        <Button w='full' h='50px' fontSize='3xl' fontWeight='bold' variant='callToAction'
                        onClick={ () => setShowInput(true) } >ADQUIRIR CDA</Button>
                        : 
                        <HStack w='full'>
                            <Box w='10px' />
                            <Input
                             value={amountToDonate}
                             placeholder="Cantidad de USDT a donar"
                             onChange={ (e) => setAmountToDonate(e.currentTarget.value) }
                             borderColor={ Number(amountToDonate) > 0 ? 'pink.400' : colorRed }
                             type='number'
                             w='full'
                             h='50px'
                             />
                             <Spacer />
                             {
                                 Number(amountToDonate) > 0 ?
                                 isApprove ? 
                                 <Button variant='info' onClick={handleDonate} h='50px' w='full' isDisabled={approving}>
                                     <VStack>
                                         <Text>{'ADQUIRIR'}</Text>
                                         <Text>{'CDA'}</Text>
                                     </VStack>
                                 </Button> : 
                                <Button variant='info' onClick={handleApprove} h='50px' w='450px' isDisabled={approving} >
                                    <VStack>
                                         <Text>{'APROBAR'}</Text>
                                         <Text>{'TRANSACCION'}</Text>
                                     </VStack>
                                </Button> : null
                             }
                             <Button variant='alertDapp' onClick={() => setShowInput(false) } h='50px' >
                                <CloseIcon />
                            </Button>
                        </HStack>
                    }

                    <PurposeMobile isPersonalPurpose={false} />
                    </VStack>
                    <Box w='10px' />
                </HStack>

                <Box h='10px' />
                <Timer />
                <Box h='10px' />

                {/* BOTE RECAUDANDO */}
                <HStack w='full' >
                    <Box w='10px' />
                    <VStack w='full'>
                        <CardDapp {...actualRewardState} />
                        {
                            loading2  ? <Spinner /> :
                            <Button w='full' h='50px' fontSize='3xl' fontWeight='bold' variant='callToAction'
                            onClick={ handleClaim } isDisabled={!canClaim}>RECIBIR</Button>
                            
                        }
                        {
                                !canClaim ? 
                                    !canClaim() ?
                                        // Donar X para alcanzar los 1.2 xDAI diarios
                                        !Qualified.donatedPerDay ? 
                                        <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                            Debes comprar 1.2 CDA por dia. (Te faltan {Number(1.2 - Number(Able.donatedLastDay)).toFixed(2)} xDAI)
                                        </Text> :
                                        !Qualified.savings ?
                                            (Number(USDC.balance) + Number(USDT.balance)) >= Number(Able.savingLimit) ?
                                                <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                                    Debes actualizar para que el contrato sepa que estas calificado
                                                </Text>
                                            : 
                                            <VStack>
                                                <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                                    Debes aumentar tus ahorros (USDC y DAI) en un 0.369%
                                                </Text>
                                                <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                                    Necesitas ingresar esta cantidad para calificarte
                                                </Text>
                                                <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                                    { Number( Number(Able.savingLimit) - ( Number(USDC.balance) + Number(USDT.balance)) ).toFixed(2) } USDC o DAI
                                                </Text>
                                            </VStack> 
                                        :
                                        <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                            Debes calificarte para poder recibir.
                                        </Text> 
                                    :
                                    // Aumentar ahorros
                                        <Text color='pink.400' fontSize='12px' fontFamily='italic'>
                                            Debes esperar al proximo bote para poder recibir.
                                        </Text> 
                                        
                                : null
                            }
                    <PurposeMobile isPersonalPurpose={true} />
                    </VStack>
                    <Box w='10px' />
                </HStack>
                
                <Box h='10px' />
                
            </VStack>
          </>
      );
};