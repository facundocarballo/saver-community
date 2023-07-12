import { VStack, HStack, Box, Image, Link, Spacer, Button, Spinner } from "@chakra-ui/react";
import React from "react";
import NextLink from 'next/link';

export const ShowDapp = () => {

    return (
        <VStack w='full'>
            <Box h="100px"/>

            <Image 
            src='https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png'
            alt='Saver Token Icon'
            boxSize={400}
            />
            <HStack w='full'>
                <Spacer />
                <NextLink href='/dapp'>
                    <Button variant='callToAction' >
                        Conoce la Dapp
                    </Button>
                </NextLink>
                <Box w='5px' />
                <Link isExternal href='https://saver-community.gitbook.io/es/'>
                    <Button variant='info'>
                        Como funciona?
                    </Button>
                </Link>
                <Spacer />
            </HStack>

            <Box h="100px" />
        </VStack>
    );
};