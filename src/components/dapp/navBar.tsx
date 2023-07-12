import { Text, useColorMode, useColorModeValue, useDisclosure, Button, IconButton, Container, HStack, Heading, Spacer, Box, Collapse, Stack, Center, Image, VStack } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import React from 'react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon  } from '@chakra-ui/icons'
import NextLink from 'next/link'

export interface Lang {
    symbol: string,
    href: string,
    photoURL: string
}

export interface TheNavItem {
    label: string,
    href: string,
}

export interface TheNavBar {
    photoURL: string,
    title?: string,
    navItems: TheNavItem[],
    lang: Lang,
    langs: Lang[],
}

export interface NavBarProps {
    props: TheNavBar
}

export const NavBar = ({props}: NavBarProps) => {
    const {colorMode, toggleColorMode} = useColorMode();
    const bg = useColorModeValue('bgLight','bgDark');
    const isDark = colorMode === 'dark';
    const {isOpen, onToggle} = useDisclosure();


    

    return (
        <Container maxW='100%' p={4} style={{position:'fixed', zIndex: 100}} bg={bg}>
            <HStack>
                
                <VStack display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}>
                    <Image
                    boxSize="50px"
                    src={props.photoURL}
                    alt="Saver Community"
                    />
                    <Text color='pink.400' fontFamily='mono' fontSize={{lg: 'md', md: 'md', sm: '10px', base: '10px'}}>Donar es Recibir</Text>
                </VStack>

                <VStack w='full' display={{lg: 'none', md: 'none', sm: 'flex', base: 'flex'}} >
                    <Image
                    boxSize="50px"
                    src={props.photoURL}
                    alt="Saver Community"
                    />
                    <Text color='pink.400' fontFamily='mono' fontSize='10px' >Donar es Recibir</Text>
                </VStack>

                { props.title != '' ? <Title title={props.title} /> : null }

                <Spacer/>

                <Box display={{lg: 'flex', md: 'none', sm: 'none', base: 'none'}}>
                    {props.navItems.map((navItem, index) => 
                    <NextLink href={navItem.href} passHref key={index}>
                        <Button as='a' variant='headers'>
                            {navItem.label}
                        </Button>
                    </NextLink>
                    )} 
                </Box>
                <Button onClick={toggleColorMode} variant='headers'>
                {
                    colorMode === 'dark' 
                    ? <SunIcon/> : <MoonIcon/>
                }
                </Button>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='headers'>
                        {props.lang.symbol}
                    </MenuButton>
                    <MenuList>
                        {
                            props.langs.map((lang, idx) => 
                            <NextLink href={lang.href} passHref key={idx} >
                                <MenuItem fontSize={{base: 'sm', sm: 'sm'}}>{lang.symbol}</MenuItem>
                            </NextLink>)
                        }
                    </MenuList>
                </Menu>
                <Box display={{lg: 'none', md:'flex', sm:'flex'}}>
                    <IconButton
                    onClick={onToggle}
                    icon = {isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>}
                    variant = 'headers'
                    aria-label={'Toggle Navigation'}
                    />
                </Box>
            </HStack>
            <Collapse in={isOpen} animateOpacity>
                <Stack
                bg={isDark ? 'bgDark' : 'bgLight'}
                p={4}
                >
                    {props.navItems.map((navItem, index) => 
                    <Center key={index}> 
                        <NextLink href={navItem.href} passHref>
                            <Button w='100%' variant='headers' as='a' onClick={onToggle}>{navItem.label}</Button>
                        </NextLink>
                    </Center>
                    )}
                </Stack>
            </Collapse>
        </Container>
    )
}

const Title = (props) => {
    return (
        <HStack>
            <Container maxW='2em'/>
            <Heading as='h1' fontSize={{base: 'lg', sm: 'lg', md: '4xl'}} color='pink.400'>
                {props.title}
            </Heading>
        </HStack>
    )
}