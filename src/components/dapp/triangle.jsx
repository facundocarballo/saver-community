import React from "react";
import { VStack, HStack, Spacer, Image, Box, Text, useColorModeValue, Textarea } from "@chakra-ui/react";
import { useProvider } from "../../context";
import { ERC20 } from "./ERC20";
import { PurposeDesktop } from "./purposes";

export const Triangle = () => {

    const { userQualified, amountUSDC, amountSaver, amountDAI, amountBDD, usdcRecord, daiRecord } = useProvider();

    // Triangle Images
    const qualifiedImage = 'https://i.ibb.co/7G0nHrm/triangulo-green.png';
    const notQualifiedImage = 'https://i.ibb.co/Z1QKmtC/triangulo-red.png';

    // Token Images
    const saverImage = "https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png";
    const USDCImage = "https://i.ibb.co/mzdkGpd/usdc.png";
    const daiImage = "https://i.ibb.co/jM9D4nh/DAI.png";

    // Colors
    const color = useColorModeValue('pink.300', 'pink.400');
    const blue = useColorModeValue('blue.300', 'blue.400');

    // Handlers
    const formatAmount = (amount) => {
        // > 1 Billion
        if ((amount / 1000000000) >= 1) return `${Number(amount / 1000000000).toFixed(2)}B`;
        // > 1Million
        if ((amount / 1000000) >= 1) return `${Number(amount / 1000000).toFixed(2)}M`;
        // > 100K
        if ((amount / 100000) >= 1) return `${Number(amount / 1000).toFixed(2)}K`;
        
        // < 100K
        return `${Number(amount).toFixed(2)}`;
    };

    const USDC = {
        image: USDCImage,
        symbol: 'USDC',
        amount: Number(amountUSDC),
        firstAmount: usdcRecord[0]
    };

    const dai = {
        image: daiImage,
        symbol: 'DAI',
        amount: Number(amountDAI),
        firstAmount: daiRecord[0]
    };

    const saver = {
        image: saverImage,
        symbol: 'ABLE',
        amount: Number(amountSaver),
        firstAmount: Number(amountSaver)
    };

    return(
        <HStack w='full'>
            <Box w='50px' />
            
            <PurposeDesktop isPersonalPurpose={false} />

            <Spacer />

            <VStack>
                <ERC20 props={saver}/>

                {/* TRIANGULO */}
                <Image
                src={userQualified ? qualifiedImage : notQualifiedImage}
                alt='triangle'
                boxSize={{lg: '200px', md: '200px', sm: '150px', base: '150px'}}
                />

                <VStack position='absolute'>
                    <Box h={{lg: '135px', md:'120px', sm: '90px', base: '90px'}} />
                    <Text 
                    color={color} fontWeight='bold' fontSize={{lg:'14px', md: '14px', sm: '12px', base: '10px'}}
                    >CDA</Text>
                    <HStack>
                        <Text 
                        color={color} fontWeight='bold' fontSize={{lg:'18px', md: '18px', sm: '14px', base: '14px'}}
                        >{formatAmount(amountBDD)}</Text>
                    </HStack>

                    <Box h='3px' />

                    <Text
                    color={blue}
                    fontWeight='bold'
                    fontSize={{lg:'18px', md: '18px', sm: '14px', base: '14px'}}
                    >
                       {` x3: ${formatAmount(Number(amountBDD) * 3)}`}
                    </Text>

                </VStack>

                <HStack>
                    <ERC20 props={USDC} />
                    <Box w={{lg: '100px', md: '70px', sm:'50px', base: '35px'}}/>
                    <ERC20 props={dai} />
                </HStack>

            </VStack>

            <Spacer />

            <PurposeDesktop isPersonalPurpose={true} />

            <Box w='50px' />
        </HStack>
    );

};