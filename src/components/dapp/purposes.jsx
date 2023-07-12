import { CloseIcon } from "@chakra-ui/icons";
import { VStack, HStack, Spacer, Text, useColorModeValue, Textarea, Button, Spinner } from "@chakra-ui/react";
import React from "react";
import { useProvider } from "../../context";
import { SAVER_TOKEN_CONTRACT_ADDRESS, MAIN_CURRENCY } from "../../web3/funcs";
import { GAS_PRICE } from "../../web3/funcs";


export const PurposeDesktop = (props) => 
{
    // Provider
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

    // Colors
    const blue = useColorModeValue('blue.300', 'blue.400');
    const pink = useColorModeValue('pink.300', 'pink.400');

    // Use State
    const [purpose, setPurpose] = React.useState('');
    const [showSpinner, setShowSpinner] = React.useState(false);
    const [showTextArea, setShowTextArea] = React.useState(false);

    // Handlers
    const formatAmount = (amount) => 
    {
        // > 1 Billion
        if ((amount / 1000000000) >= 1) return `${Number(amount / 1000000000).toFixed(2)}B`;
        // > 1Million
        if ((amount / 1000000) >= 1) return `${Number(amount / 1000000).toFixed(2)}M`;
        // > 100K
        if ((amount / 100000) >= 1) return `${Number(amount / 1000).toFixed(2)}K`;
        
        // < 100K
        return `${Number(amount).toFixed(2)}`;
    };

    const showCreateButton = () => showTextArea ||
        (props.isPersonalPurpose && personalPurpose == '') || 
        (!props.isPersonalPurpose && communityPurpose == '');
        
    const canSetPurpose = () => purpose.length <= 200;

    const handleUpload = async () => 
    {
        // const data = await loadDappData();
    
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

    const handlePurpose = async () => 
    {
        const data = props.isPersonalPurpose ? await contractSaver.methods.setPersonalPurpose(purpose).encodeABI()
                        : await contractSaver.methods.setCommunityPurpose(purpose).encodeABI();
        
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
            gas: window.web3.utils.toHex(estimateGas),
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei(GAS_PRICE, 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => 
        {
            setShowSpinner(true);
            const interval = setInterval( () => {
                
                web3.eth.getTransactionReceipt(res, async (err, rec) => {
                    if (rec)
                    {
                        clearInterval(interval);
                        await handleUpload();
                        setShowSpinner(false);
                        setShowTextArea(false);
                    }

                    if (err) 
                    {
                        clearInterval(interval);
                        await handleUpload();
                        console.log('ERROR: ', err);
                        setShowSpinner(false);
                        setShowTextArea(false);
                    }
                });

            }, 500);
        });
    }; 

    /*
        - Agregar cartel avisando que hay un coste de gas.
        - En el triangulo mostrar tambien el potencial del BDD y ademas agrandar un poco los numeros
        
    */

    return (
        <VStack 
        display={{lg: 'flex', md: 'none', sm: 'none', base: 'none'}}
        w='450px'
        >

            <Text
            fontWeight='bold'
            fontSize={{xl: '25px', lg: '20px'}}
            color={blue}
            >
                {
                    props.isPersonalPurpose ? 'Propósito Personal' : 'Propósito Común'
                }
            </Text>

            {
                showSpinner ? <Spinner />
                :
                <>
                        {
                            props.isPersonalPurpose ? 
                                personalPurpose == '' || showTextArea ?
                                    <>
                                        <Textarea 
                                        w='full' 
                                        borderColor={blue}
                                        value={purpose} 
                                        onChange={(e) => setPurpose(e.currentTarget.value)}
                                        />
                                        <Text>{`${purpose.length} / 200 caracteres`}</Text>
                                    </>
                                :
                                    <Text
                                    color={pink}
                                    fontSize='25px'
                                    >{personalPurpose}</Text>
                            :   communityPurpose == '' || showTextArea ?
                                    <>
                                        <Textarea
                                        w='full'
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.currentTarget.value)}
                                        />
                                        <Text>{`${purpose.length} / 200 caracteres`}</Text>
                                    </>
                                :   
                                    <Text
                                    color={pink}
                                    fontSize='25px'
                                    >{communityPurpose}</Text>
                        }

                    {
                        props.isPersonalPurpose ?
                        <HStack w='full'>

                        <Text
                        fontWeight='bold'
                        color={blue}
                        >
                            { `$ ${formatAmount(Number(amountUSDC) + Number(amountDAI))} Ahorrados`}
                        </Text>

                        <Spacer />

                        <Button 
                        onClick={ showCreateButton() ? handlePurpose : () => setShowTextArea(true) }
                        variant='callToAction'
                        isDisabled={!canSetPurpose()}
                        >
                            {
                                showCreateButton() ? 'Crear Propósito' : 'Editar'
                            }
                        </Button>

                        {
                            showTextArea ? 
                            <Button
                            onClick={() => setShowTextArea(false)}
                            variant='alertDapp'
                            >
                                <CloseIcon />
                            </Button> : null
                        }

                    </HStack> :
                    <HStack w='full'>

                        <Button 
                        onClick={ showCreateButton() ? handlePurpose : () => setShowTextArea(true) }
                        variant='callToAction'
                        isDisabled={!canSetPurpose()}
                        >
                            {
                                showCreateButton() ? 'Crear Propósito' : 'Editar'
                            }
                        </Button>

                        {
                            showTextArea ? 
                            <Button
                            onClick={() => setShowTextArea(false)}
                            variant='alertDapp'
                            >
                                <CloseIcon />
                            </Button> : null
                        }

                        <Spacer />


                        <Text
                        fontWeight='bold'
                        color={blue}
                        >
                            { `$ ${formatAmount(amountBDD)} Donados`}
                        </Text>

                    </HStack>
                    }
                </>
            }
            

        </VStack>
    );

}



// MOBILE


export const PurposeMobile = (props) => 
{
    // Provider
    const { amountUSDC, amountDAI, personalPurpose, communityPurpose,
    contractSaver, contractSaverAddress, account, setAccount, setContractUSDC, setRewardAmountRaised, setAlreadyClaim,
    setActualRewardAmount, setActualAmountToClaim, setFutureRewardAmount,
    setFutureAmountToClaim, setTimestampOpenReward, setTimestampNow,
    setAmountBDD, setAmountUSDC, setAmountSaver, setTimestampToClaimSaver,
    setBDDQualified, setTimer, setCanClaim,
     setActualRewardState, setFutureRewardState, setUserQualified, setAmountDAI, 
     setContractUSDCaddress, setContractSaverAddress,
     setContractSaver, setChainID, setPersonalPurpose, setCommunityPurpose, amountBDD } = useProvider();

    // Colors
    const blue = useColorModeValue('blue.300', 'blue.400');
    const pink = useColorModeValue('pink.300', 'pink.400');

    // Use State
    const [purpose, setPurpose] = React.useState('');
    const [showSpinner, setShowSpinner] = React.useState(false);
    const [showTextArea, setShowTextArea] = React.useState(false);

    // Handlers
    const formatAmount = (amount) => 
    {
        // > 1 Billion
        if ((amount / 1000000000) >= 1) return `${Number(amount / 1000000000).toFixed(2)}B`;
        // > 1Million
        if ((amount / 1000000) >= 1) return `${Number(amount / 1000000).toFixed(2)}M`;
        // > 100K
        if ((amount / 100000) >= 1) return `${Number(amount / 1000).toFixed(2)}K`;
        
        // < 100K
        return `${Number(amount).toFixed(2)}`;
    };

    const showCreateButton = () => showTextArea ||
        (props.isPersonalPurpose && personalPurpose == '') || 
        (!props.isPersonalPurpose && communityPurpose == '');

    const canSetPurpose = () => purpose.length <= 200;

    const handleUpload = async () => 
    {
        // const data = await loadDappData();
    
        setActualAmountToClaim(data.actualAmountToClaim);
        setFutureAmountToClaim(data.futureAmountToClaim)
    
        setRewardAmountRaised(data.rewardAmountRaised)
        setActualRewardAmount(data.actualRewardAmount);
        setFutureRewardAmount(data.futureRewardAmount);
        setAlreadyClaim(data.alreadyClaim);
        setBDDQualified(data.bddQualified);
        setCanClaim(data.canClaim);
        setUserQualified(data.userQualified);

        setCommunityPurpose(data.communityPurporse);
        setPersonalPurpose(data.personalPurpose);
    
        setTimestampOpenReward(data.timestampOpenReward);
        setTimestampNow(data.timestampNow);
        setTimestampToClaimSaver(data.timestampToClaimSaver);
        setTimer(data.timer);

        setChainID(data.chainID);
    
        setAmountBDD(data.donationBalance);
        setAmountUSDC(data.USDCBalance);
        setAmountSaver(data.saverBalance);
        setAmountDAI(data.daiBalance);
        
    
        setContractSaverAddress(data.SAVER_TOKEN_CONTRACT_ADDRESS);
        setContractUSDCaddress(data.USDC_CONTRACT_ADDRESS);
        
        setContractUSDC(data.ContractUSDC)
    
        setAccount(data.addressAccount);
        setContractSaver(data.ContractST);

        setActualRewardState({
            title: "REPARTIENDO",
            amountRaised: `${data.rewardAmountRaised} USDC`,
            amountToClaim: `${ data.canClaim ? data.actualAmountToClaim : '0.00' } USDC`,
            actualAmount: `${data.actualRewardAmount} USDC`
        });

        setFutureRewardState({
            title: "RECAUDANDO",
            amountRaised: `${data.futureRewardAmount} USDC`,
            amountToClaim: `${data.futureAmountToClaim} USDC`,
            actualAmount: `${data.futureRewardAmount} USDC`
        });
    };

    const handlePurpose = async () => 
    {
        const data = props.isPersonalPurpose ? await contractSaver.methods.setPersonalPurpose(purpose).encodeABI()
                        : await contractSaver.methods.setCommunityPurpose(purpose).encodeABI();
        
        const nonce = await web3.eth.getTransactionCount(account);

        const estimateGas = await web3.eth.estimateGas({
            from: account,
            to: contractSaverAddress,
            nonce: nonce,
            data: data
        });

        const params = {
            from: account,
            to: contractSaverAddress,
            gas: window.web3.utils.toHex(estimateGas),
            gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('50', 'gwei')),
            data: data
        };

        ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => 
        {
            setShowSpinner(true);
            const interval = setInterval( () => {
                
                web3.eth.getTransactionReceipt(res, async (err, rec) => {
                    if (rec)
                    {
                        clearInterval(interval);
                        await handleUpload();
                        setShowSpinner(false);
                        setShowTextArea(false);
                    }

                    if (err) 
                    {
                        clearInterval(interval);
                        await handleUpload();
                        console.log('ERROR: ', err);
                        setShowSpinner(false);
                        setShowTextArea(false);
                    }
                });

            }, 500);
        });
    }; 

    /*
        - Agregar cartel avisando que hay un coste de gas.
        - En el triangulo mostrar tambien el potencial del BDD y ademas agrandar un poco los numeros
        
    */

    return (
        <VStack 
        display={{lg: 'none', md: 'flex', sm: 'flex', base: 'flex'}}
        w='full'
        >

            <Text
            fontWeight='bold'
            fontSize='20px'
            color={blue}
            >
                {
                    props.isPersonalPurpose ? 'Propósito Personal' : 'Propósito Común'
                }
            </Text>

            {
                showSpinner ? <Spinner />
                :
                <>
                        {
                            props.isPersonalPurpose ? 
                                personalPurpose == '' || showTextArea ?
                                <>
                                    <Textarea 
                                    w='full' 
                                    borderColor={blue}
                                    value={purpose} 
                                    onChange={(e) => setPurpose(e.currentTarget.value)}
                                    />
                                    <Text>{`${purpose.length} / 200 caracteres`}</Text>
                                </>
                                :
                                    <Text color={pink}>{personalPurpose}</Text>
                            :   communityPurpose == '' || showTextArea ?
                                    <>
                                        <Textarea 
                                        w='full' 
                                        borderColor={blue}
                                        value={purpose} 
                                        onChange={(e) => setPurpose(e.currentTarget.value)}
                                        />
                                        <Text>{`${purpose.length} / 200 caracteres`}</Text>
                                    </>
                                :   
                                    <Text color={pink}>{communityPurpose}</Text>
                        }

                    <HStack w='full'>

                        <Text
                        fontWeight='bold'
                        color={blue}
                        >
                            { `$ ${props.isPersonalPurpose ? formatAmount(Number(amountUSDC) + Number(amountDAI)) : formatAmount(amountBDD) } ${props.isPersonalPurpose ? 'Ahorrados' : 'Donados'}`}
                        </Text>

                        <Spacer />

                        <Button 
                        onClick={ showCreateButton() ? handlePurpose : () => setShowTextArea(true) }
                        variant='callToAction'
                        isDisabled={!canSetPurpose()}
                        >
                            {
                                showCreateButton() ? 'Crear Propósito' : 'Editar'
                            }
                        </Button>

                        {
                            showTextArea ?
                            <Button
                            onClick={() => setShowTextArea(false)}
                            variant='alertDapp'
                            >
                                <CloseIcon />
                            </Button> : null
                        }

                    </HStack>
                </>
            }
            

        </VStack>
    );

}