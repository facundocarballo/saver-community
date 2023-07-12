import { VStack, HStack, Heading, Spacer, Box, Container } from "@chakra-ui/react";

export interface InfoCardProps {
    props: {
        title: string,
        amount: string,
    }
};

export const InfoCard = ({props}: InfoCardProps) => {
    return (
        <Container variant='callToAction'>
            <VStack 
            w='full'
            h={{lg: '140px', md: '140px', sm: '125px', base: '125px'}}
            >
                <Box h='10px' />
                <HStack w='full'> 
                    <Spacer />
                    <Heading size='lg'>{props.title}</Heading>
                    <Spacer />
                </HStack>
                <Box h='10px' />
                <Heading size='2xl' fontWeight='bold'>{props.amount}</Heading>
                <Box h='10px' />
            </VStack>
        </Container>
    );
};