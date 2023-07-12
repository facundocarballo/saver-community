import React from "react";
import { VStack, HStack, Spacer, Button, Input, Text, Box, Spinner,  AlertDialog, 
        AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
        AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton } from "@chakra-ui/react";
import { useProvider } from "../../context";
import { GAS_PRICE, loadDappData, SAVER_TOKEN_CONTRACT_ADDRESS, STABLE_COIN_FORMAT } from "../../web3/funcs";
import { MAIN_CURRENCY } from "../../web3/funcs";


export const ConvertCDAtoCDAToken = () =>
{
    // Context
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

    // React useState
    const [loading, setLoading] = React.useState(false);
    const [amountToConvert, setAmountToConvert] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
  
    const cancelRef = React.useRef();

    // Handles
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

    const handleConvert = async () =>
    {
        const amountToConvertWEI = web3.utils.toWei(amountToConvert, STABLE_COIN_FORMAT);

        const data = await contractSaver.methods.convertCDAtoCDAToken(amountToConvertWEI).encodeABI();

        const nonce = await web3.eth.getTransactionCount(account);

        const estimateGas = await web3.eth.estimateGas({
            from: account,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            nonce: nonce,
            data: data
        });

        const params = {
            from: account,
            to: SAVER_TOKEN_CONTRACT_ADDRESS,
            gas: web3.utils.toHex(estimateGas),
            gasPrice: web3.utils.toHex(web3.utils.toWei(GAS_PRICE, "gwei")),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log('Transaction Hash: ', res);
            
            setLoading(true);

            const interval = setInterval(() => {

                web3.eth.getTransactionReceipt(res, async (err, rec) => {
                    if (rec)
                    {
                        clearInterval(interval);

                        await handleWeb3();

                        setIsOpen(true);

                        setLoading(false);
                    }
                    if (err)
                    {
                        clearInterval(interval);
                        console.log('ERROR: ', err);
                    }
                });

            }, 500);

        });
    }

    return (
        <>
            
                <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogHeader>{'Enhorabuena!!'}</AlertDialogHeader>
                    <AlertDialogContent>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            {`Has convertido ${amountToConvert} CDA en CDA Tokens`}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} variant='info'>
                            Ok
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
        
                </AlertDialog>
            

            <VStack w="full">
                <HStack w={{lg: "800px", md: "500px", sm: "full", base: "full"}}>
                    <Box w="5px" />
                    <Input
                    value={amountToConvert}
                    onChange={ (e) => setAmountToConvert(e.currentTarget.value) }
                    placeholder="Cantidad de CDA"
                    borderColor="pink.300"
                    borderRadius={6}
                    />
                    <Box w="10px" />
                    {
                        !loading ? 
                        <Button
                        variant='actionDapp'
                        onClick={handleConvert}
                        w="270px"
                        >
                            <Text color="#F687B3">Recibir CDA</Text>
                        </Button> : <Spinner />
                    }
                    <Box w="5px" />
                </HStack>

                <Text
                color="#F687B3"
                >
                    Convierte tus CDA en el token CDA (Los decimales con ".")
                </Text>

            </VStack>

        </>
        
    );
}