import { HStack, Heading, Image, Box, Spacer, Link, VStack, useColorModeValue } from "@chakra-ui/react";

export const Footer = () => {
    const faqImage = useColorModeValue('https://i.ibb.co/zHhtwQt/faq.png', 'https://i.ibb.co/bXdpdVQ/faq-dark.png');
    const paperImage = useColorModeValue('https://i.ibb.co/vLNtyks/paper.png', 'https://i.ibb.co/j69Q6jr/paper-dark.png');
    return (
        <>
        <HStack w='full' h='75px' display={{lg: 'flex', md: 'flex', sm: 'none', base:"none"}}>
            <Box w='10px'/>
            <Image
            src='https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png'
            alt='Saver Token icon'
            boxSize={70}
            />
            <Box w='25px' />
            <Heading fontSize={{lg: 'xl', md: 'xl', sm: 'lg', base: 'md'}} color='pink.400'>Saver Community</Heading>
            <Spacer />

            <Image
            src={faqImage}
            alt='FAQ-image'
            boxSize='20px'
            />
            <Link href="https://saver-community.gitbook.io/es/preguntas-frecuentes" color='pink.300' isExternal fontSize={{lg: 'lg', md: 'lg', sm: 'md', base: 'sm'}}>Preguntas Frequentes</Link>
            
            <Box w='10px' />

            <Image
            src={paperImage}
            alt='whitepaper'
            boxSize='20px'
            />
            <Link href="https://saver-community.gitbook.io/es/" color='pink.300' isExternal fontSize={{lg: 'lg', md: 'lg', sm: 'md', base: 'sm'}}>Whitepaper</Link>
            
            <Box w='10px' />

            <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/480px-Telegram_logo.svg.png'
            alt='telegram'
            boxSize='20px'
            />
            <Link href='https://t.me/+yBl4MggjkRswMWM0' color='pink.300' isExternal fontSize={{lg: 'lg', md: 'lg', sm: 'md', base: 'sm'}}>Telegram</Link>
            
            <Box w='10px'/>
        </HStack>
        <VStack w='full' display={{lg: 'none', md: 'none', sm: 'flex', base:'flex'}}>
            <HStack w='full'>
                <Box w='10px' />
                <Image
                src='https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png'
                alt='Saver Token icon'
                boxSize={70}
                />
                <Heading fontSize={{lg: 'xl', md: 'xl', sm: 'lg', base: 'lg'}} color='pink.400'>Saver Community</Heading>
                <Spacer />
            </HStack>
            <HStack w='full'>
                <Box w='85px' />
                <Image
                src={faqImage}
                alt='FAQ-image'
                boxSize='20px'
                />
                <Link href="https://saver-community.gitbook.io/es/preguntas-frecuentes" color='pink.300' isExternal fontSize='md'>Preguntas Frequentes</Link>
            </HStack>
            
            <HStack w='full'>
                <Box w='85px' />
                <Image
                src={paperImage}
                alt='whitepaper'
                boxSize='20px'
                />
                <Link href="https://saver-community.gitbook.io/es/" color='pink.300' isExternal fontSize='md'>Whitepaper</Link>
            </HStack>

            <HStack w='full'>
                <Box w='85px' />
                <Image
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/480px-Telegram_logo.svg.png'
                alt='telegram'
                boxSize='20px'
                />
                <Link href="https://saver-community.gitbook.io/es/preguntas-frecuentes" color='pink.300' isExternal fontSize='md'>Telegram</Link>
            </HStack>
            
            <Box h='5px' />
        </VStack>
        </>
        
        
    );
};