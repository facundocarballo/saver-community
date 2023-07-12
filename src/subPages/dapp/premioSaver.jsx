import { VStack, HStack, Spacer, Box, Text, Heading, Image, Button, 
    useColorModeValue, Spinner, Slider, SliderTrack, SliderFilledTrack,
    AlertDialog, 
    AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
     AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import React from 'react';
import { useProvider } from '../../context';
import { loadDappData, GAS_PRICE, SAVER_TOKEN_CONTRACT_ADDRESS } from '../../web3/funcs';
import { MAIN_CURRENCY } from '../../web3/funcs';


export const PremioSaver = () => {
    return(
        <>
            <Desktop />
            <Mobile />
        </>
    );
};

const Desktop = () => {

    const DAYS = 30;
    const MIN_AMOUNT = 369;

    const { 
        account, setAccount,
        chainID, setChainID, 
        contractSaver, setContractSaver,
        stableCoinContract, setStableCoinContract,
        rewardAmountRaised, setRewardAmountRaised, 
        actualRewardAmount, setActualRewardAmount,
        actualAmountToClaim, setActualAmountToClaim,
        futureRewardAmount, setFutureRewardAmount,
        futureAmountToClaim, setFutureAmountToClaim,
        timestampOpenReward, setTimestampOpenReward,
        timestampNow, setTimestampNow,
        amountBDD, setAmountBDD, 
        amountUSDC, setAmountUSDC,
        amountSaver, setAmountSaver, 
        amountDAI, setAmountDAI, 
        timestampToClaimSaver, setTimestampToClaimSaver,
        alreadyClaim, setAlreadyClaim, 
        canClaim, setCanClaim, 
        bddQualified, setBDDQualified, 
        timer, setTimer, 
        userQualified, setUserQualified, 
        actualRewardState, setActualRewardState,
        futureRewardState, setFutureRewardState, 
        personalPurpose, setPersonalPurpose,
        communityPurpose, setCommunityPurpose, 
        haveToRecover, setHaveToRecover,
        canClaimForSavings, setCanClaimForSavings, 
        canClaimForDonatedPerDay, setCanClaimForDonatedPerDay,
        savingLimit, setSavingLimit, 
        donatedLastDay, setDonatedLastDay,
        balanceForDevelopment, setBalanceForDevelopment, 
        balanceForProjects, setBalanceForProjects,
        usdcRecord, setUsdcRecord, 
        daiRecord, setDaiRecord, 
        totalRecord, setTotalRecord,      
    } = useProvider();

    const [loading, setLoading] = React.useState(false);

    // PopUp
    const [openPopUpClaimSaver, setOpenPopUpClaimSaver] = React.useState(false);
    const cancelRef = React.useRef();

    const colorBlue = useColorModeValue('blue.300', 'blue.400');
    const textColor = useColorModeValue('white', 'bgDark');
    const sliderBG = useColorModeValue('blue.200', 'blue.300');
    const filledBG = useColorModeValue('blue.300', 'blue.200');

    // Photos
    const bddPhoto = useColorModeValue('https://i.ibb.co/Pgb5Nh8/donate.png', 'https://i.ibb.co/pwWZ1PJ/donate-dark.png');
    const timePhoto = useColorModeValue('https://i.ibb.co/rf0c0Ht/time.png', 'https://i.ibb.co/zQSJzhn/time-dark.png');

    const getDaysPlaying = () => 
    {
        if (timestampToClaimSaver == 0) return 0;
        const differenceTimestamp = timestampToClaimSaver - timestampNow;
        const daysToClaimSaver = Math.trunc(differenceTimestamp / (60*60*24) );

        if ((DAYS - daysToClaimSaver - 1) < 0) return 0;

        return (DAYS - daysToClaimSaver) - 1;
    };

    const getDaysPlayingValue = () => 
    {
        const daysPlaying = getDaysPlaying();
        return ((daysPlaying * 100) / DAYS);
    };

    const handleWeb3 = async () => 
    {
        const data = await loadDappData();

        setStableCoinContract(data.StableCoinContract);
        setActualAmountToClaim(data.actualAmountToClaim);
        setFutureAmountToClaim(data.futureAmountToClaim)
    
        setRewardAmountRaised(data.rewardAmountRaised)
        setActualRewardAmount(data.actualRewardAmount);
        setFutureRewardAmount(data.futureRewardAmount);
        setAlreadyClaim(data.alreadyClaim);
        setBDDQualified(data.bddQualified);
        setCanClaim(data.canClaim);
        setUserQualified(data.userQualified);

        setUsdcRecord(data.usdcRecord);
        setDaiRecord(data.daiRecord);
        setTotalRecord(data.totalRecord);

        setBalanceForDevelopment(data.balanceForDevelopment);
        setBalanceForProjects(data.balanceForProjects);


        setDonatedLastDay(data.donatedLastDay);
        setSavingLimit(data.savingLimit);

        setHaveToRecover(data.haveToRecover);
        
        setChainID(data.chainID);
    
        setTimestampOpenReward(data.timestampOpenReward);
        setTimestampNow(data.timestampNow);
        setTimestampToClaimSaver(data.timestampToClaimSaver);
        setTimer(data.timer);

        setCanClaimForDonatedPerDay(data.canClaimForDonatedPerDay);
        setCanClaimForSavings(data.canClaimForSavings);
    
        setAmountBDD(data.donationBalance);
        setAmountUSDC(data.USDCBalance);
        setAmountSaver(data.saverBalance);
        setAmountDAI(data.daiBalance);

        setPersonalPurpose(data.personalPurpose);
        setCommunityPurpose(data.communityPurporse);
              
        setAccount(data.addressAccount);
        setContractSaver(data.ContractST);
        
    
        setActualRewardState({
            title: 'REPARTIENDO',
            amountRaised: `${data.rewardAmountRaised}  ${MAIN_CURRENCY}`,
            amountToClaim: `${ data.canClaim && !data.alreadyClaim ? data.actualAmountToClaim : '0.00' }  ${MAIN_CURRENCY}`,
            actualAmount: `${data.actualRewardAmount}  ${MAIN_CURRENCY}`
        });
    
        setFutureRewardState({
            title: "RECAUDANDO",
            amountRaised: `${data.futureRewardAmount}  ${MAIN_CURRENCY}`,
            amountToClaim: `${data.futureAmountToClaim}  ${MAIN_CURRENCY}`,
            actualAmount: `${data.futureRewardAmount}  ${MAIN_CURRENCY}`
        });
    
      }

    const handleClaim = async () => 
    {
        const data = await contractSaver.methods.claimSaver().encodeABI();
        
        const nonce = await web3.eth.getTransactionCount(account);
        const estimateGas = await web3.eth.estimateGas({
            from: account,
            nonce: nonce,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            data: data
        });

        const params = {
            from: account,
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

            setLoading(true)
            const interval = setInterval(() => {
                web3.eth.getTransactionReceipt(res, (err, rec) => {
                    if (rec)
                    {
                        clearInterval(interval);
                        setLoading(false);
                        setOpenPopUpClaimSaver(true);
                        handleWeb3();
                        
                    }

                    if (err) 
                    {
                        clearInterval(interval);
                        console.log('ERROR: ', err);
                    }
                });
                
            }, 500);

        });
    };

    

    return (
        <>
            {/* PopUp Claim */}
            <AlertDialog
                isOpen={openPopUpClaimSaver}
                leastDestructiveRef={cancelRef}
                onClose={() => setOpenPopUpClaimSaver(false)}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        FELICITACIONES! HAS CONSEGUIDO EL PREMIO ABLE
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    {`Has Recibido ${amountBDD} ABLES. Gracias por formar parte de esta comunidad de ahorradores, con tu participación nos beneficiamos tod@s.`}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button colorScheme='pink' ref={cancelRef} onClick={() => setOpenPopUpClaimSaver(false)} ml={3}>
                        Donar es Recibir
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <VStack display={{lg: 'flex', md: 'none', sm:'none', base: 'none'}} w='full'>
            <Box h='20px' />
            <HStack w='full'>
                <Box w='30px' />
                <Heading fontSize='50px' fontWeight='bold' color='pink.400'>PREMIO ABLE</Heading>
                <Spacer />
            </HStack>
            <Box h='10px' />
            <HStack w='full' h='full'>
                <Box w='30px' />
                <VStack h='full' w='full'>
                    <Spacer />

                    <HStack w='full'>
                        <Box w='30px' />

                        <Slider value={getDaysPlayingValue()} h='100px'>
                            <SliderTrack bg={sliderBG} h='50px' borderRadius={8}>
                                <SliderFilledTrack bg={filledBG} />

                                <VStack h='full' position='absolute'>
                                    <Spacer />
                                    <HStack w='full'>
                                        <Box w={{xl:'420px', lg:'300px'}} />
                                        <Text color={textColor} fontWeight='bold'
                                        >{getDaysPlaying()} Dias Jugando</Text>
                                    </HStack>
                                    <Spacer />
                                </VStack>

                            </SliderTrack>
                            
                        </Slider>

                        <Spacer />

                    </HStack>

                    <HStack w='full'>
                        <Box w='30px' />
                        {/* Mostrar cosas que nos faltan para alcanzar el premio saver en forma de lista */}
                        
                        <Text color='pink.400'>
                            {
                                getDaysPlaying() < DAYS ? 
                                'Actualmente no estas calificado para recibir el PREMIO ABLE' :
                                 'YA PUEDES RECIBIR EL PREMIO SAVER'
                            }
                        </Text>
                        <Spacer />
                    </HStack>


                    {
                        userQualified ?
                            getDaysPlaying() < DAYS ?
                            <HStack w='full'>
                                <Box w='30px' />
                                <Image 
                                src={timePhoto}
                                alt='bdd'
                                boxSize='30px'
                                />
                                <Text color='pink.400' fontWeight='bold'>
                                    Debes permanecer {DAYS - getDaysPlaying()} DIA{ (DAYS - getDaysPlaying() ) > 1 ? 'S' : null } calificado para poder reclamar el Premio ABLE
                                </Text>
                                <Spacer />
                            </HStack> : null
                            :
                            <HStack w='full'>
                                <Box w='30px' />
                                <Image 
                                src={timePhoto}
                                alt='bdd'
                                boxSize='30px'
                                />
                                <Text color='pink.400' fontWeight='bold'>Debes calificarte para empezar a participar del Premio ABLE</Text>
                                <Spacer />
                            </HStack>
                    }


                    <Spacer />
                </VStack>
                <Spacer />
                {
                    !loading ?
                    <VStack w='500px' h='full'>
                        <Spacer />
                        <Image 
                        src='https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png'
                        alt='saver'
                        boxSize='fit'
                        opacity={ getDaysPlaying() <= DAYS ? '50%' : null }
                        />
                        <Button variant='actionDapp' onClick={handleClaim}>RECLAMAR</Button>
                    </VStack> :
                    <Spinner w='500px' />
                    // Probamos aca con 500px
                }
            </HStack>
            <Box h='10px' />
        </VStack>
        </>
        
    );
    
};

const Mobile = () => {

    const DAYS = 30;
    const MIN_AMOUNT = 369;

    const { 
        account, setAccount,
        chainID, setChainID, 
        contractSaver, setContractSaver,
        stableCoinContract, setStableCoinContract,
        rewardAmountRaised, setRewardAmountRaised, 
        actualRewardAmount, setActualRewardAmount,
        actualAmountToClaim, setActualAmountToClaim,
        futureRewardAmount, setFutureRewardAmount,
        futureAmountToClaim, setFutureAmountToClaim,
        timestampOpenReward, setTimestampOpenReward,
        timestampNow, setTimestampNow,
        amountBDD, setAmountBDD, 
        amountUSDC, setAmountUSDC,
        amountSaver, setAmountSaver, 
        amountDAI, setAmountDAI, 
        timestampToClaimSaver, setTimestampToClaimSaver,
        alreadyClaim, setAlreadyClaim, 
        canClaim, setCanClaim, 
        bddQualified, setBDDQualified, 
        timer, setTimer, 
        userQualified, setUserQualified, 
        actualRewardState, setActualRewardState,
        futureRewardState, setFutureRewardState, 
        personalPurpose, setPersonalPurpose,
        communityPurpose, setCommunityPurpose, 
        haveToRecover, setHaveToRecover,
        canClaimForSavings, setCanClaimForSavings, 
        canClaimForDonatedPerDay, setCanClaimForDonatedPerDay,
        savingLimit, setSavingLimit, 
        donatedLastDay, setDonatedLastDay,
        balanceForDevelopment, setBalanceForDevelopment, 
        balanceForProjects, setBalanceForProjects,
        usdcRecord, setUsdcRecord, 
        daiRecord, setDaiRecord, 
        totalRecord, setTotalRecord,      
    } = useProvider();

    const [loading, setLoading] = React.useState(false);

    // PopUp
    const [openPopUpClaimSaver, setOpenPopUpClaimSaver] = React.useState(false);
    const cancelRef = React.useRef();

    const colorBlue = useColorModeValue('blue.300', 'blue.400');
    const textColor = useColorModeValue('white', 'bgDark');
    const sliderBG = useColorModeValue('blue.200', 'blue.300');
    const filledBG = useColorModeValue('blue.300', 'blue.200');
    
    // Photos
    const bddPhoto = useColorModeValue('https://i.ibb.co/Pgb5Nh8/donate.png', 'https://i.ibb.co/pwWZ1PJ/donate-dark.png');
    const timePhoto = useColorModeValue('https://i.ibb.co/rf0c0Ht/time.png', 'https://i.ibb.co/zQSJzhn/time-dark.png');

    const getDaysPlaying = () => 
    {

        if (timestampToClaimSaver == 0) return 0;
        const differenceTimestamp = timestampToClaimSaver - timestampNow;
        const daysToClaimSaver = Math.trunc( differenceTimestamp / (60*60*24) );

        if ( (DAYS - daysToClaimSaver - 1) < 0) return 0;

        return (DAYS - daysToClaimSaver) - 1;
    };

    const getDaysPlayingValue = () => 
    {
        const daysPlaying = getDaysPlaying();
        return ((daysPlaying * 100) / DAYS);
    };

    // PROBAR LAS RECLAMACIONES
    const handleClaim = async () => 
    {
        const data = await contractSaver.methods.claimSaver().encodeABI();

        const nonce = await web3.eth.getTransactionCount(account);
        const estimateGas = await web3.eth.estimateGas({
            from: account,
            nonce: nonce,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            data: data
        });

        const params = {
            from: account,
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
            setTimeout(() => {
                setLoading(false);
                setOpenPopUpClaimSaver(true);
                handleWeb3();
            }, 10000);

        });

    };

    const handleWeb3 = async () => 
    {
        const data = await loadDappData();
        
        setStableCoinContract(data.StableCoinContract);
        setActualAmountToClaim(data.actualAmountToClaim);
        setFutureAmountToClaim(data.futureAmountToClaim)
    
        setRewardAmountRaised(data.rewardAmountRaised)
        setActualRewardAmount(data.actualRewardAmount);
        setFutureRewardAmount(data.futureRewardAmount);
        setAlreadyClaim(data.alreadyClaim);
        setBDDQualified(data.bddQualified);
        setCanClaim(data.canClaim);
        setUserQualified(data.userQualified);

        setUsdcRecord(data.usdcRecord);
        setDaiRecord(data.daiRecord);
        setTotalRecord(data.totalRecord);

        setBalanceForDevelopment(data.balanceForDevelopment);
        setBalanceForProjects(data.balanceForProjects);


        setDonatedLastDay(data.donatedLastDay);
        setSavingLimit(data.savingLimit);

        setHaveToRecover(data.haveToRecover);
        
        setChainID(data.chainID);
    
        setTimestampOpenReward(data.timestampOpenReward);
        setTimestampNow(data.timestampNow);
        setTimestampToClaimSaver(data.timestampToClaimSaver);
        setTimer(data.timer);

        setCanClaimForDonatedPerDay(data.canClaimForDonatedPerDay);
        setCanClaimForSavings(data.canClaimForSavings);
    
        setAmountBDD(data.donationBalance);
        setAmountUSDC(data.USDCBalance);
        setAmountSaver(data.saverBalance);
        setAmountDAI(data.daiBalance);

        setPersonalPurpose(data.personalPurpose);
        setCommunityPurpose(data.communityPurporse);
              
        setAccount(data.addressAccount);
        setContractSaver(data.ContractST);
        
    
        setActualRewardState({
            title: 'REPARTIENDO',
            amountRaised: `${data.rewardAmountRaised}  ${MAIN_CURRENCY}`,
            amountToClaim: `${ data.canClaim && !data.alreadyClaim ? data.actualAmountToClaim : '0.00' }  ${MAIN_CURRENCY}`,
            actualAmount: `${data.actualRewardAmount}  ${MAIN_CURRENCY}`
        });
    
        setFutureRewardState({
            title: "RECAUDANDO",
            amountRaised: `${data.futureRewardAmount}  ${MAIN_CURRENCY}`,
            amountToClaim: `${data.futureAmountToClaim}  ${MAIN_CURRENCY}`,
            actualAmount: `${data.futureRewardAmount}  ${MAIN_CURRENCY}`
        });
       
    };

    return (
       <>

         {/* PopUp Claim */}
         <AlertDialog
                isOpen={openPopUpClaimSaver}
                leastDestructiveRef={cancelRef}
                onClose={() => setOpenPopUpClaimSaver(false)}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        FELICITACIONES! HAS CONSEGUIDO EL PREMIO ABLE
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    {`Has Recibido ${amountBDD} ABLE. Gracias por formar parte de esta comunidad de ahorradores, con tu participación nos beneficiamos tod@s.`}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button colorScheme='pink' ref={cancelRef} onClick={() => setOpenPopUpClaimSaver(false)} ml={3}>
                        Donar es Recibir
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

         <VStack w='full' display={{lg: 'none', md: 'flex', sm: 'flex', base: 'flex'}}>
            <Box h='20px' />
            <HStack w='full'>
                <Box w='30px' />
                <Heading fontSize='50px' fontWeight='bold' color='pink.400'>PREMIO ABLE</Heading>
                <Spacer />
            </HStack>
            <Box h='10px' />
            <VStack h='full' w='full'>
                    <Spacer />

                    <HStack w='full'>
                        <Spacer />

                        <Slider value={getDaysPlayingValue()} h='50px'>
                            <SliderTrack bg={sliderBG} h='50px' borderRadius={6}>
                                <SliderFilledTrack bg={filledBG} />
                                <VStack h='full' position='absolute'>
                                    <Spacer />
                                    <HStack>
                                        <Box w={{md:'380px', sm: '250px', base: '130px'}}/>
                                        <Text color={textColor} fontWeight='bold' >{getDaysPlaying()} Dias Jugando</Text>
                                    </HStack>
                                    <Spacer />
                                </VStack>
                            </SliderTrack>
                            
                        </Slider>                        
 
                        <Spacer />
                    </HStack>
                    <HStack w='full'>
                        <Spacer />
                        <Text color='pink.400'>
                            {
                                getDaysPlaying() < DAYS ? 
                                'Actualmente no estas calificado para recibir el PREMIO ABLE' :
                                'YA PUEDES RECIBIR EL PREMIO ABLE'
                            }
                        </Text>
                        <Spacer />
                    </HStack>

                    {
                        userQualified ?
                            getDaysPlaying() < DAYS ?
                            <HStack w='full'>
                                <Box w='30px' />
                                <Image 
                                src={timePhoto}
                                alt='bdd'
                                boxSize='30px'
                                />
                                <Text color='pink.400' fontWeight='bold'>
                                    Debes esperar {DAYS - getDaysPlaying()} DIA{ (DAYS - getDaysPlaying() ) > 1 ? 'S' : null } calificado para poder reclamar el Premio ABLE
                                </Text>
                                <Spacer />
                            </HStack> : null
                            :
                            <HStack w='full'>
                                <Box w='30px' />
                                <Image 
                                src={timePhoto}
                                alt='bdd'
                                boxSize='30px'
                                />
                                <Text color='pink.400' fontWeight='bold'>Debes calificarte para empezar a participar del Premio ABLE</Text>
                                <Spacer />
                            </HStack>
                    }

                    <Spacer />
                </VStack>
                {
                    !loading ?
                    <VStack w='full' h='full'>
                        <Spacer />
                        <Image 
                        src='https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png'
                        alt='saver'
                        boxSize='fit'
                        opacity={ getDaysPlaying() <= DAYS ? '50%' : null }
                        />
                        <Button  variant='actionDapp' onClick={handleClaim}>RECLAMAR</Button>
                    </VStack> :
                    <Spinner />
                }
                <Box h='10px' />
        </VStack>
       </>
    );
};