import { HStack, VStack, Spacer, Box, Image, Text, useColorModeValue } from "@chakra-ui/react";

interface IERC2O {
    image: string,
    symbol: string,
    amount: number,
    firstAmount: number
};

export const ERC20 = ({props}: {props: IERC2O}) => {
    const color = useColorModeValue('pink.300', 'pink.400');
    
    const formatAmount = (amount:number):string => {
        // > 1 Billion
        if ((amount / 1000000000) >= 1) return `${Number(amount / 1000000000).toFixed(2)}B`;
        // > 1Million
        if ((amount / 1000000) >= 1) return `${Number(amount / 1000000).toFixed(2)}M`;
        // > 100K
        if ((amount / 100000) >= 1) return `${Number(amount / 1000).toFixed(2)}K`;
        
        // < 100K
        return `${Number(amount).toFixed(2)}`;
    };

    const getPercent = (): number =>
    {        
        if (props.firstAmount == 0) return 0;
        return (((props.amount - props.firstAmount) / props.firstAmount) * 100);
    }

    return(
        <VStack 
        w={{lg: '220px', md: '220px', sm: '190px', base: '190px'}}
        h={{lg: '65px', md: '65px', sm: '60px', base: '60px'}}
        border='1px solid'
        borderColor={color}
        borderRadius={6}>
            <Spacer />
            <HStack w='full'>
                <Spacer />
                <Image 
                src={props.image}
                alt='erc20IMG'
                boxSize='20px'
                />
                <Text 
                color={color} 
                fontWeight='bold' 
                fontSize={{lg:'lg', md: 'lg', sm: '14px', base: '14px'}}
                >{formatAmount(props.amount)}</Text>

                <Spacer />

                {
                    getPercent() != 0 ?
                    <>
                        <Text
                        color={color}
                        fontSize={{lg: '12px', md: '12px', sm: '10px', base: '10px'}}
                        >
                            {getPercent().toFixed(2)} %
                        </Text>
                        <Image
                        src={ getPercent() < 0 ? 'https://i.ibb.co/ZB8B8C1/arrow-down-red.png' : 'https://i.ibb.co/gyWLmmb/arrow-up-green.png' }
                        alt='upgrade'
                        boxSize='20px'
                        />
                    </> : null
                }
        
                <Box w='5px' />
            </HStack>
            <Spacer />
        </VStack>
    );
};