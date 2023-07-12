import { VStack, HStack, Box, Spacer, Spinner, Text } from '@chakra-ui/react';
import { InfoCard } from '../components/infoCard';
import React from 'react';
import { useProvider } from '../context';
import { MAIN_CURRENCY } from '../web3/funcs';

export const InfoStableCoin = () => {
    
    const { 
        stableCoinDistribute,
        lastStableCoinDistribute
      } = useProvider();

    const allDistributed = {
        title: `Total ${MAIN_CURRENCY} Distribuido`,
        amount: `${stableCoinDistribute} ${MAIN_CURRENCY}`
    };

    const lastDistributed = {
        title: `Última Distribución de ${MAIN_CURRENCY}`,
        amount: `${lastStableCoinDistribute} ${MAIN_CURRENCY}`
    };

    return (
        <>
            {/* Mobile */}

            <VStack w='full' display={{lg: "none", md: "none", sm: "flex", base: "flex"}}>
                <HStack w='full'>
                    <Spacer />
                    <InfoCard props={allDistributed}/>
                    <Spacer />
                </HStack>
                <HStack w='full'>
                    <Spacer />
                    <Text align='justify' w='full'>
                        {'A través de la distribución de USDC como recompensas diarias, se estimula la conservación e incrementos de los activos que conformar el juego (SAVER, USDC y DAI). Su metodología fomenta la confianza en el DAR y RECIBIR. Sus usuarios comprenden que al hacer donaciones a la comunidad, aumentan sus posibilidades de recibir triplicadas sus aportaciones. Al mismo tiempo que están fomentando con sus acciones, el ahorro en otras personas, que se proponen mejorar su nivel adquisitivo para el desarrollo de sus propósitos. Cuando un usuario realiza una donación, su Balance de Donaciones (BDD) aumenta y en la próxima repartición del BOTE de la comunidad, podrá reclamar una recompensa proporcional a la cantidad de su BDD en relación con el total de donaciones que haya recibido el BOTE. De esta manera, el usuario podría aumentar su BDD realizando donaciones y así, su posibilidad de recibir recompensas mayores aumenta también.'}
                    </Text>
                    <Spacer />
                </HStack>

                <Box h='30px' />

                <HStack w='full'>
                    <Spacer />
                    <InfoCard props={lastDistributed}/>
                    <Spacer />
                </HStack>
                <HStack w='full'>
                    <Spacer />
                    <Text align='justify' w='full'>
                        {'Cada día son repartidos y anunciados todos los fondos donados de la comunidad a todas las cuentas calificadas. Tanto de nuevas cuentas que se van incorporando al juego como los que ya estaban participando. Esto genera un efecto de Fuente de agua, donde todas las cuentas que participan con donaciones, van retroalimentando a los usuarios que también lo han hecho antes y mantienen sus cuantas calificadas. De esta forma, se crea una sinergia que genera un flujo creciente para todos los participantes. El sistema no sólo anima a los usuarios a que realicen donaciones, sino a que también ahorren en USDC, SAVER y DAI en sus billeteras. Con esto se realiza el propósito de que los usuarios logren ahorrar fondos para sus proyectos personales.'}
                    </Text>
                    <Spacer />
                </HStack>

                <Box h='30px' />
                
            </VStack>

            {/* Desktop */}
            <VStack w="full" display={{lg: "flex", md: "flex", sm: "none", base: "none"}}>

                <HStack w='full'>
                    <Box w='10px' />
                    <Text align='justify' w='full'>
                        {`A través de la distribución de ${MAIN_CURRENCY} como recompensas diarias, se estimula la conservación e incrementos de los activos que conformar el juego (SAVER, USDC y DAI). Su metodología fomenta la confianza en el DAR y RECIBIR. Sus usuarios comprenden que al hacer donaciones a la comunidad, aumentan sus posibilidades de recibir triplicadas sus aportaciones. Al mismo tiempo que están fomentando con sus acciones, el ahorro en otras personas, que se proponen mejorar su nivel adquisitivo para el desarrollo de sus propósitos. Cuando un usuario realiza una donación, su Balance de Donaciones (BDD) aumenta y en la próxima repartición del BOTE de la comunidad, podrá reclamar una recompensa proporcional a la cantidad de su BDD en relación con el total de donaciones que haya recibido el BOTE. De esta manera, el usuario podría aumentar su BDD realizando donaciones y así, su posibilidad de recibir recompensas mayores aumenta también.`}
                    </Text>
                    <Spacer />
                    <InfoCard props={allDistributed}/>
                    <Box w='10px' />  
                </HStack>

                <Box h='30px' />

                <HStack>
                    <Box h='10px' /> 
                    <InfoCard props={lastDistributed}/>
                    <Spacer />
                    <Text align='justify' w='full'>
                        {'Cada día son repartidos y anunciados todos los fondos donados de la comunidad a todas las cuentas calificadas. Tanto de nuevas cuentas que se van incorporando al juego como los que ya estaban participando. Esto genera un efecto de Fuente de agua, donde todas las cuentas que participan con donaciones, van retroalimentando a los usuarios que también lo han hecho antes y mantienen sus cuantas calificadas. De esta forma, se crea una sinergia que genera un flujo creciente para todos los participantes. El sistema no sólo anima a los usuarios a que realicen donaciones, sino a que también ahorren en USDC, SAVER y DAI en sus billeteras. Con esto se realiza el propósito de que los usuarios logren ahorrar fondos para sus proyectos personales.'}
                    </Text>
                    <Box h='10px' />
                </HStack>

                <Box h='30px' />

            </VStack>

        </>
    );
};