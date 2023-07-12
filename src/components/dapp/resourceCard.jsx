import { VStack, HStack, Heading, Spacer, Box, Container, Button, Text, useColorModeValue, Spinner } from "@chakra-ui/react";
import { useProvider } from "../../context";
import { buildTransaciont, GAS_PRICE, SAVER_TOKEN_CONTRACT_ADDRESS } from "../../web3/funcs";
import React from "react";


export const ResourceCard = (props) => 
{
    const colorFont = useColorModeValue('bgLight', 'bgDark');
    const colorCard = useColorModeValue('blue.300', 'blue.400');

    const { addressAccount, Able } = useProvider();

    const [loading, setLoading] = React.useState(false);

    const handleClaimProjects = async () =>
    {
        const data = await Able.contract.methods.claimResourcesForProjects().encodeABI();
        const params = await buildTransaciont(addressAccount, SAVER_TOKEN_CONTRACT_ADDRESS, data);

        ethereum.request({
            method:  'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            
            setLoading(true);

            const interval = setInterval(() => {

                web3.eth.getTransactionReceipt(res, (err, rec) => {
                    if (rec) 
                    {
                        clearInterval(interval);
                        setTimeout(() => {
                            setLoading(false);
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
    }

    const handleClaimDevelopment = async () =>
    {
        const data = await Able.contract.methods.claimResourceForDevelopment().encodeABI();
        const params = await buildTransaciont(addressAccount, SAVER_TOKEN_CONTRACT_ADDRESS, data);

        ethereum.request({
            method:  'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            
            setLoading(true);

            const interval = setInterval(() => {

                web3.eth.getTransactionReceipt(res, (err, rec) => {
                    if (rec) 
                    {
                        clearInterval(interval);
                        setTimeout(() => {
                            setLoading(false);
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
        
    }

    return (
        
        <VStack
        w="full"
        h={{lg: '140px', md: '140px', sm: '125px', base: '125px'}}
        bg={colorCard}
        borderRadius={6}
        shadow={6}
        >
                <Box h='10px' />
                <HStack w='full'> 
                    <Spacer />
                    <Heading size='lg' color={colorFont}>{props.title}</Heading>
                    <Spacer />
                </HStack>
                
                <Spacer />
                <HStack w="full">
                    <Box w="10px" />
                    <Heading size='lg' color={colorFont}>{props.amount}</Heading>
                    <Spacer />
                    {
                        !loading ? 
                        <Button 
                        variant="callToAction"
                        onClick = { props.title == "Proyectos (21%)" ? handleClaimProjects :  handleClaimDevelopment }
                        >
                            RECIBIR
                        </Button>
                        :
                        <Spinner />
                    }
                    
                    <Box w="10px" />
                </HStack>

                
                <Box h='10px' />
        </VStack>
    );

};