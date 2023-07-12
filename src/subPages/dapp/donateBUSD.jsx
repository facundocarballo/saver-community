import { CloseIcon } from "@chakra-ui/icons";
import { VStack, HStack, Spacer, Box, Text, Heading, Button, Progress, Image, useColorModeValue, Input, Link } from "@chakra-ui/react";
import React from "react";
import { Triangule } from "../../components/dapp/triangule";
import { useProvider } from "../../context";

export const DonateBUSD = () => {
    // Ahora desktop y mobile son los mismos...
    return(
        <>
            <Desktop />
            <Mobile />
        </>
    );
};


const Mobile = () => {
    
    const [showInput, setShowInput] = React.useState(false);
    const [isApprove, setIsApprove] = React.useState(false);

    const [amountToDonate, setAmountToDonate] = React.useState('');
    const [linkDonation, setLinkDonation] = React.useState('');
    const [linkApprove, setLinkApprove] = React.useState('');

    const { amountBDD, amountBUSD, amountSaver, contractSaver, account, contractSaverAddress, contractBUSD, contractBUSDaddress } = useProvider();

    const bddPhoto = useColorModeValue('https://i.ibb.co/Pgb5Nh8/donate.png', 'https://i.ibb.co/pwWZ1PJ/donate-dark.png');

    const regularExpression = new RegExp('^[0-9]*$');

    const isQualified = () => Number(amountBDD) >= 3 && Number(amountBUSD) >= Number(amountBDD) && Number(amountSaver) >= Number(amountBDD);
    
    const handleApprove = async () => {
        const amountWEI = await web3.utils.toWei(amountToDonate, 'ether');
        console.log('AmountWei: ', amountWEI);
        const data = contractBUSD.methods.approve(contractSaverAddress, amountWEI).encodeABI();

        const nonce = await web3.eth.getTransactionCount(account);
        
        const estimateGas = await web3.eth.estimateGas({
            from: account,
            nonce: nonce,
            to: contractBUSDaddress,
            data: data
        });

        const params = {
            from: account,
            to: contractBUSDaddress,
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('20', 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);
            document.getElementById('transactionApproveIDmobil').innerHTML = `TransactionID Approve ${res}`;
            setLinkApprove(`https://testnet.bscscan.com/tx/${res}`);
            setIsApprove(true);
        });

    };

    const handleDonate = async () => {
        const amountWEI = await web3.utils.toWei(amountToDonate, 'ether');
        console.log('AmountWei: ', amountWEI);
        const data = await contractSaver.methods.donateStableCoin(amountWEI).encodeABI();

        const nonce = await web3.eth.getTransactionCount(account);
        
        const estimateGas = await web3.eth.estimateGas({
            from: account,
            nonce: nonce,
            to: contractSaverAddress,
            data: data
        });
        
        const params = {
            from: account,
            to: contractSaverAddress,
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('20', 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);
            document.getElementById('transactionDonationIDmobil').innerHTML = `TransactionID Donation ${res}`;
            setLinkDonation(`https://testnet.bscscan.com/tx/${res}`);
         });

    };

    const handleTest = () => regularExpression.test(amountToDonate);

    return(
       <VStack display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}}>
            <Triangule />
       </VStack>
    );

};

const Desktop = () => {
    
    const [showInput, setShowInput] = React.useState(false);
    const [isApprove, setIsApprove] = React.useState(false);

    const [amountToDonate, setAmountToDonate] = React.useState('');
    const [linkDonation, setLinkDonation] = React.useState('');
    const [linkApprove, setLinkApprove] = React.useState('');

    const regularExpression = new RegExp('^[0-9]*$');

    const { amountBDD, amountBUSD, amountSaver, contractSaver, account, contractSaverAddress, contractBUSD, contractBUSDaddress } = useProvider();

    const bddPhoto = useColorModeValue('https://i.ibb.co/Pgb5Nh8/donate.png', 'https://i.ibb.co/pwWZ1PJ/donate-dark.png');

    const isQualified = () => Number(amountBDD) >= 3 && Number(amountBUSD) >= Number(amountBDD) && Number(amountSaver) >= Number(amountBDD);
    
    const handleApprove = async () => {
        const amountWEI = await web3.utils.toWei(amountToDonate, 'ether');
        console.log('AmountWei: ', amountWEI);
        const data = contractBUSD.methods.approve(contractSaverAddress, amountWEI).encodeABI();

        const nonce = await web3.eth.getTransactionCount(account);
        
        const estimateGas = await web3.eth.estimateGas({
            from: account,
            nonce: nonce,
            to: contractBUSDaddress,
            data: data
        });

        const params = {
            from: account,
            to: contractBUSDaddress,
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('20', 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);
            document.getElementById('transactionApproveID').innerHTML = `TransactionID Approve ${res}`;
            setLinkApprove(`https://testnet.bscscan.com/tx/${res}`);
            setIsApprove(true);
        });

    };

    const handleDonate = async () => {
        const amountWEI = await web3.utils.toWei(amountToDonate, 'ether');
        console.log('AmountWei: ', amountWEI);
        const data = await contractSaver.methods.donateStableCoin(amountWEI).encodeABI();

        const nonce = await web3.eth.getTransactionCount(account);
        
        const estimateGas = await web3.eth.estimateGas({
            from: account,
            nonce: nonce,
            to: contractSaverAddress,
            data: data
        });
        console.log('gas: ', estimateGas);
        console.log('nonce: ', nonce);
        
        const params = {
            from: account,
            to: contractSaverAddress,
            gas: window.web3.utils.toHex(estimateGas), // Gas limit
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('20', 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);
            document.getElementById('transactionDonationID').innerHTML = `TransactionID Donation ${res}`;
            setLinkDonation(`https://testnet.bscscan.com/tx/${res}`);
         });

    };

    const handleTest = () => regularExpression.test(amountToDonate);

    return(
        <VStack display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
            <Triangule />
         </VStack>
    );

    // return(
    //     <VStack w='full' display={{lg:'flex', md:'flex', sm: 'none', base: 'none'}}>
    //         <HStack w='full'>
    //             <Box w='10px' />
    //             <VStack w='full'>
    //                 <Spacer />
    //                 <HStack w='full'>
    //                 <Spacer />
    //                 <Image
    //                 src={bddPhoto}
    //                 alt='bdd'
    //                 boxSize='50px'
    //                 />
    //                 <Box w='10px' />
    //                 {
    //                     !showInput ?
    //                     <Button variant='actionDapp' onClick={ () => setShowInput(true) } w='350px' h='75px' fontSize='25px'>AUMENTA TU BDD</Button>
    //                     : 
    //                     <HStack w='full'>
    //                         <Input
    //                         value={amountToDonate}
    //                         placeholder="Cantidad de BUSD a donar"
    //                         onChange={ (e) => setAmountToDonate(e.currentTarget.value) }
    //                         borderColor={ handleTest() ? 'gray.400' : 'red.400' }
    //                         type='number'
    //                         w='full'
    //                         h='50px'
    //                         />
    //                         <Box w='10px' />
    //                         {
    //                             handleTest() ? isApprove ?
    //                             <Button variant='info' onClick={handleDonate} h='50px' >
    //                                 DONAR
    //                             </Button> :
    //                             <Button variant='info' onClick={handleApprove} h='50px' w='350px'>
    //                                 Aprobar Transaccion
    //                             </Button> 
    //                             : 
    //                             <Button variant='info' isDisabled h='50px' >
    //                                 DONAR
    //                             </Button>
    //                         }
                            // <Button variant='alertDapp' onClick={() => setShowInput(false) } h='50px' >
                            //     <CloseIcon />
                            // </Button>
    //                     </HStack>
    //                 }
    //                 <Spacer />
    //             </HStack>
    //                 <Link href={linkApprove} isExternal>
    //                     <Text id='transactionApproveID' color='gray.400' fontSize='md' />
    //                 </Link>
    //                 <Link href={linkDonation} isExternal>
    //                     <Text id='transactionDonationID' color='gray.400' fontSize='md' />
    //                 </Link>
    //                 <Spacer />
    //             </VStack>
    //             <Spacer />
    //             <VStack w='full'>
    //                 <Spacer />

    //                 <HStack w='full'>
    //                     <Spacer />
    //                     <Text color='gray.400' fontWeight='bold'>Balance de Donaciones: {amountBDD} BDD</Text>
    //                     <Spacer />
    //                 </HStack>
    //                 <HStack w='full'>
    //                     <Box w='15px' />
    //                     <Progress value={amountBDD} colorScheme='yellow' bg='yellow.300' h='50px' w='full' borderRadius={6} max={3} min={0} />
    //                     <Box w='15px' />
    //                 </HStack>

    //                 <HStack w='full'>
    //                     <Spacer />
    //                     <Text color='gray.400' fontWeight='bold'>Cantidad de SAVER en tu billetera: {amountSaver} SAVER</Text>
    //                     <Spacer />
    //                 </HStack>
    //                 <HStack w='full'>
    //                     <Box w='15px' />
    //                     <Progress value={amountSaver} colorScheme='pink' bg='pink.300' h='50px' w='full' borderRadius={6} max={amountBDD} min={0} />
    //                     <Box w='15px' />
    //                 </HStack>

    //                 <HStack w='full'>
    //                     <Spacer />
    //                     <Text color='gray.400' fontWeight='bold'>Cantidad de BUSD en tu billetera: {amountBUSD} BUSD</Text>
    //                     <Spacer />
    //                 </HStack>
    //                 <HStack w='full'>
    //                     <Box w='15px' />
    //                     <Progress value={amountBUSD} colorScheme='green' bg='green.300' h='50px' w='full' borderRadius={6} max={amountBDD} min={0} />
    //                     <Box w='15px' />
    //                 </HStack>
    //                 <Spacer />
    //             </VStack>
    //         </HStack>
    //         <Box h='10px' />
    //         <HStack w='full' h='100px'>
    //             <Box w='30px' />
    //             <VStack h='full'>
    //                 <Spacer />
    //                 <Image
    //                 src={isQualified() ? 'https://i.ibb.co/0JT3GVz/check.png' : 'https://i.ibb.co/893fFzv/stop.png'}
    //                 alt={isQualified() ? 'calificado' : 'noCalificado'}
    //                 boxSize='75px'
    //                 />
    //                 <Spacer />
    //             </VStack>
    //             <VStack h='full'>
    //                 <Spacer />
    //                 <Text fontWeight='bold' fontSize='30px' color='gray.400'>
    //                     {
    //                         isQualified() ?
    //                         'BILLETERA CALIFICADA PARA RECLAMAR EL BOTE DE BUSD' :
    //                         'BILLETERA NO CALIFICADA PARA RECLAMAR EL BOTE DE BUSD'
    //                     }
    //                 </Text>
    //                 <Spacer />
    //             </VStack>
    //             <Spacer />

    //             {
    //                     isQualified() ?
    //                     null :
    //                     <VStack>
    //                         <HStack w='full'>
    //                             <Text color='gray.400' fontSize='30px'>Para calificar: </Text>
    //                             <Spacer />
    //                         </HStack>
    //                         {amountBDD < 3 ? 
    //                             <HStack w='full'>
    //                                 <Box w='10px' />
    //                                 <Image
    //                                 src={bddPhoto}
    //                                 alt="bdd"
    //                                 boxSize="30px"
    //                                 />
    //                                 <Text color='gray.400' fontWeight='bold'>{3 - amountBDD} {'más en tu Balance de Donaciones'}</Text>
                                    
    //                             </HStack>
    //                         : null}
    //                         {Number(amountBUSD) < Number(amountBDD) ? 
    //                             <HStack w='full'>
    //                                 <Box w='10px' />
    //                                 <Image 
    //                                 src="https://i.ibb.co/3C00M3S/busd.png"
    //                                 alt='busd'
    //                                 boxSize='30px'
    //                                 />
    //                                 <Text color='gray.400' fontWeight='bold'>{amountBDD - amountBUSD} {'BUSD más en tu billetera'}</Text>
    //                             </HStack>
    //                         : null }
    //                         {Number(amountSaver) < Number(amountBDD) ?
    //                             <HStack w='full'>
    //                                 <Box w='10px' />
    //                                 <Image
    //                                 src="https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png"
    //                                 alt="saver"
    //                                 boxSize="30px"
    //                                 />
    //                                 <Text color='gray.400' fontWeight='bold'>{amountBDD - amountSaver} {'SAVER más en tu billetera'}</Text> 
    //                             </HStack>
    //                         : null}
    //                     </VStack>
    //             }

    //             <Box w='30px' />    
    //         </HStack>
    //         <HStack w='full'>
    //             <Spacer />
                
    //             <Spacer />
    //         </HStack>
    //     </VStack>
    // );
};