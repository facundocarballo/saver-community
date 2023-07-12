import { useColorModeValue } from '@chakra-ui/color-mode';

export const CardsStyles = {
    variants: {
        callToAction: () => ({
            bg: 'yellow.400',
            color: useColorModeValue('white', 'gray.800'),
            borderRadius: "7px",
            boxShadow: "lg",
            _hover: {
                transform: "scale(1.005)",
                boxShadow: "2xl"
            }
        }),
        chartCard1: () => ({
            bg: 'yellow.400', // useColorModeValue('gray.100', 'gray.500'),
            color: useColorModeValue('white', 'gray.800'),
            borderRadius: "7px",
            boxShadow: "lg",
            _hover: {
                transform: "scale(1.005)",
                boxShadow: "2xl"
            }
        }),
        chartCard2: () => ({
            bg: 'blue.300',// useColorModeValue('gray.100', 'gray.500'),
            color: useColorModeValue('white', 'gray.800'),
            borderRadius: "7px",
            boxShadow: "lg",
            _hover: {
                transform: "scale(1.005)",
                boxShadow: "2xl"
            }
        }),
        chartCard3: () => ({
            bg: 'pink.300',// useColorModeValue('gray.100', 'gray.500'),
            color: useColorModeValue('white', 'gray.800'),
            borderRadius: "7px",
            boxShadow: "lg",
            _hover: {
                transform: "scale(1.005)",
                boxShadow: "2xl"
            }
        })

    }
};

export const ButtonStyles = {
    variants: {
        headers: () => ({
            bg: useColorModeValue('bgLight', 'bgDark'),
            color: useColorModeValue('bgDark', 'bgLight'),
            margin: '2px',
            _hover: {
                boxShadow: 'md',
                transform: 'scale(1.02)',
                bg: useColorModeValue('pink.300', 'pink.300'),
                color: useColorModeValue('bgLight', 'bgDark')
            }
        }),
        callToAction: () => ({
            bg: useColorModeValue('yellow.300', 'yellow.400'),
            color: useColorModeValue('white', 'gray.800'),
            margin: '2px',
            _hover: {
                boxShadow: 'lg',
                transform: 'scale(1.02)',
                bg: useColorModeValue('yellow.300', 'yellow.400'),
            }
        }),
        actionDapp: () => ({
            color: 'black',
            bg: 'yellow.400',
            margin: '2px',
            border: '2px',
            borderColor: 'white',
            fontWeight: 'bold',
            boxShadow: '0px 0px 20px #EDF2F7',
            borderRadius: '10px',
            _hover: {
                transform: 'scale(1.12)',
                boxShadow: '0px 0px 110px #EDF2F7',
            }
        }),
        info: () => ({
            bg: useColorModeValue('pink.300', 'pink.400'),
            color: useColorModeValue('white', 'gray.800'),
            borderRadius: "7px",
            boxShadow: "lg",
            _hover: {
                transform: "scale(1.005)",
                boxShadow: "2xl"
            }
        }),
        alertDapp: () => ({
            bg: 'red.400',
            color: useColorModeValue('white', 'gray.800'),
            fontWeight: 'bold',
            fontSize: 'lg',
            borderRadius: '6px',
            _hover: {
                transform: "scale(1.01)",
                boxShadow: "xl"
            }
        }),
        blueDapp: () => ({
            bg: 'blue.300',
            color: useColorModeValue('white', 'gray.800'),
            fontWeight: 'bold',
            fontSize: 'lg',
            borderRadius: '6px',
            _hover: {
                transform: "scale(1.01)",
                boxShadow: "xl"
            }
        })
    }
};

export const ProgressStyles = {
    variants: {
        bdd: () => ({
            colorScheme: 'yellow.400',
            bg: 'yellow.300',
            borderRadius: '6px',
            _hover: {
                boxShadow: 'md',
                transform: 'scale(1.02)',
            }
        })
    }
};