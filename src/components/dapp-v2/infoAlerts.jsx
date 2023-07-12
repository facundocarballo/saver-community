import React from "react";
import { VStack, HStack, Text, Box, Spacer } from "@chakra-ui/react";
import { useProvider } from "../../context";
import { MAIN_CURRENCY, NATIVE_CRYPTO } from "../../web3/funcs";
import { Events } from "./events";

export const InfoAlerts = () => {
  // Attributes

  // Context
  const {
    Able,
    User,
    USDT,
    USDC,
    nativeCryptoBalance,
    SinergyBronze,
    StableCoin,
    addressAccount,
    Clock,
    Test,
    AbleSale,
  } = useProvider();

  // Methods
  const isBalanced = () =>
    Number(USDC.balance) > Number(Able.points.points_of) &&
    Number(USDT.balance) > Number(Able.points.points_of) &&
    Number(Able.balance) > Number(Able.points.points_of);

  const GetMinAmountToIncreasePoints = (points, last_points) =>
    Number(points) >= 1.009 * Number(last_points)
      ? 0
      : (1.009 * Number(last_points) - Number(points) + 0.01).toFixed(4);

  // Component
  return (
    <>
      {/* Desktop */}
      <VStack
        display={{ lg: "flex", md: "none", sm: "none", base: "none" }}
        w="25%"
      >
        <Text color="white" fontSize="25px">
          {"Información"}
        </Text>
        <VStack
          w="full"
          border="1px"
          borderColor="white"
          borderRadius={6}
          p={2}
        >
          <Box h="5px" />

          {/* Informamos los requisitos que no cumplio el usuario */}
          {!User.is_qualified ? (
            <>
              <Text color="red" fontSize="20px">
                Cuenta Descalificada
              </Text>

              {Clock.cycle >= User.cycleToCheck ? (
                <Text color="white">
                  {"Actualice y revise que estén realizados los requisitos"}
                </Text>
              ) : (
                <>
                  {!User.qualified.sinergy ? (
                    <Text color="white">
                      Al cerrar el ciclo no disponias de ningun NFT de Sinergy
                    </Text>
                  ) : null}
                  {!User.qualified.test ? (
                    <Text color="white">
                      No respondiste correctamente el Able Test
                    </Text>
                  ) : null}
                  {!User.qualified.increase_points ? (
                    <Text color="white">No aumentaste el 0.9% de tus ABLE</Text>
                  ) : null}
                  {!User.qualified.able ? (
                    <Text color="white">
                      Tus Able fueron menores a tus puntos
                    </Text>
                  ) : null}
                  {!User.qualified.usdc ? (
                    <Text color="white">
                      Tus USDC fueron menores a tus puntos
                    </Text>
                  ) : null}
                  {!User.qualified.usdt ? (
                    <Text color="white">
                      Tus USDT fueron menores a tus puntos
                    </Text>
                  ) : null}
                  {!User.qualified.points ? (
                    <Text color="white">
                      Tus puntos eran menores al minimo (3)
                    </Text>
                  ) : null}
                </>
              )}
            </>
          ) : (
            <Text color="green" fontSize="20px">
              Cuenta Calificada
            </Text>
          )}

          {/* Informamos las condiciones que el usuario tiene que cumplir para poder estar calificado el ciclo siguiente */}
          {/* 0.9% TRIPLE per Cycle */}
          {Number(Able.points.points_of) < 1.009 * Number(User.last_points) ? (
            // <Text color="white" fontSize="12px" fontFamily="italic">
            //   Debes aumentar el 0.9% de tus ABLE por ciclo. (Te faltan{" "}
            //   {Number(Number(Able.minAmountToDonate) + 0.01).toFixed(2)} ABLE)
            // </Text>
            <Text color="white" fontSize="12px" fontFamily="italic">
              Debes aumentar el 0.9% de tus ABLE por ciclo. (Te faltan{" "}
              {GetMinAmountToIncreasePoints(
                Able.points.points_of,
                User.last_points
              )}{" "}
              ABLE)
            </Text>
          ) : null}

          {/* Video */}
          {!Test.last_answer ? (
            <VStack>
              <Text color="white" fontSize="12px" fontFamily="italic">
                Debes responder correctamente el video para calificarte.
              </Text>
            </VStack>
          ) : null}

          {/* Sinergy NFT */}
          {Number(SinergyBronze.amount) == 0 ? (
            <VStack>
              <Text color="white" fontSize="12px" fontFamily="italic">
                Debes adquirir al menos 1 NFT para estar calificado.
              </Text>
            </VStack>
          ) : null}

          {/* Savings Balances */}
          {!isBalanced() ? (
            <VStack>
              <Text color="white" fontSize="12px" fontFamily="italic">
                Debes calificarte para poder recibir. Fijate el balance de tus
                ahorros!!
              </Text>
            </VStack>
          ) : null}

          {/* Check all */}
          {isBalanced() &&
          Number(SinergyBronze.amount > 0) &&
          Test.last_answer &&
          Number(AbleSale.points_increased_in_this_cycle) >=
            Number(
              GetMinAmountToIncreasePoints(
                Able.points.points_of,
                User.last_points
              )
            ) ? (
            <VStack>
              <Text color="white" fontSize="12px" fontFamily="italic">
                Estas calificado, pero debes esperar hasta el proximo ciclo (
                {Number(Able.cycle) + 1}) para poder recibir tus recompensas.
              </Text>
              <Text color="white" fontSize="18px">
                Bien hecho! Vas por el camino correcto
              </Text>
            </VStack>
          ) : null}

          <Box h="5px" />
          {/* PERDIDAS POR ESTAR DESCALIFICADO (Esto me parece que no va mas...) */}
          {Number(SinergyBronze.totalLostIncome) > 0 ? (
            <>
              <Text color="red" fontSize="15px" fontFamily="bold">
                PERDIDAS POR ESTAR DESCALIFICADO
              </Text>
              <Text color="white" fontSize="12px" fontFamily="italic">
                TOTAL: {SinergyBronze.totalLostIncome} {MAIN_CURRENCY}
              </Text>
              <Text color="white" fontSize="12px" fontFamily="italic">
                CICLO ACTUAL: {SinergyBronze.actualLostIncome} {MAIN_CURRENCY}
              </Text>
            </>
          ) : null}
          <Box h="5px" />
          {/* Informacion de Gestion */}
          {Able.management_info != "" ? (
            <>
              <Text color="yellow.300" fontSize="20px" fontWeight="bold">
                Novedades
              </Text>
              <Text color="white" fontSize="12px" fontFamily="italic">
                {Able.admin.managementInfo}
              </Text>
            </>
          ) : null}
        </VStack>

        <HStack w="full" zIndex={100}>
          <Text color="white" fontSize="25px">
            {nativeCryptoBalance} {NATIVE_CRYPTO}
          </Text>
          <Spacer />
          <Text color="white" fontSize="25px">
            {StableCoin.balance} {MAIN_CURRENCY}
          </Text>
        </HStack>

        <Events />
      </VStack>

      {/* Mobile */}
      <VStack
        display={{ lg: "none", md: "flex", sm: "flex", base: "flex" }}
        w="full"
      >
        <Text color="white" fontSize="25px">
          Informacion
        </Text>
        <VStack w="full" border="1px" borderColor="white" borderRadius={6}>
          <Box h="5px" />
          {/* Informamos los requisitos que no cumplio el usuario */}
          {!User.is_qualified ? (
            <>
              <Text color="red" fontSize="20px">
                Cuenta Descalificada
              </Text>
              {!User.qualified.sinergy ? (
                <Text color="white">
                  Al cerrar el ciclo no disponias de ningun NFT de Sinergy
                </Text>
              ) : null}
              {!User.qualified.test ? (
                <Text color="white">
                  No respondiste correctamente el Able Test
                </Text>
              ) : null}
              {!User.qualified.increase_points ? (
                <Text color="white">No aumentaste 0.9% tus ABLE</Text>
              ) : null}
              {!User.qualified.able ? (
                <Text color="white">Tus Able fueron menores a tus puntos</Text>
              ) : null}
              {!User.qualified.usdc ? (
                <Text color="white">Tus USDC fueron menores a tus puntos</Text>
              ) : null}
              {!User.qualified.usdt ? (
                <Text color="white">Tus USDT fueron menores a tus puntos</Text>
              ) : null}
              {!User.qualified.points ? (
                <Text color="white">Tus puntos eran menores al minimo (3)</Text>
              ) : null}
            </>
          ) : (
            <Text color="green" fontSize="20px">
              Cuenta Calificada
            </Text>
          )}

          {/* Informamos las condiciones que el usuario tiene que cumplir para poder estar calificado el ciclo siguiente */}
          {/* 0.9% TRIPLE per Cycle */}
          {Number(Able.points.points_of) < 1.009 * Number(User.last_points) ? (
            // <Text color="white" fontSize="12px" fontFamily="italic">
            //   Debes aumentar el 0.9% de tus ABLE por ciclo. (Te faltan{" "}
            //   {Number(Number(Able.minAmountToDonate) + 0.01).toFixed(2)} ABLE)
            // </Text>
            <Text color="white" fontSize="12px" fontFamily="italic">
              Debes aumentar el 0.9% de tus ABLE por ciclo. (Te faltan{" "}
              {GetMinAmountToIncreasePoints(
                Able.points.points_of,
                User.last_points
              )}{" "}
              ABLE)
            </Text>
          ) : null}

          {/* Video */}
          {!Test.last_answer ? (
            <VStack>
              <Text color="white" fontSize="12px" fontFamily="italic">
                Debes responder correctamente el video para calificarte.
              </Text>
            </VStack>
          ) : null}

          {/* Sinergy NFT */}
          {Number(SinergyBronze.amount) == 0 ? (
            <VStack>
              <Text color="white" fontSize="12px" fontFamily="italic">
                Debes adquirir al menos 1 NFT para estar calificado.
              </Text>
            </VStack>
          ) : null}

          {/* Savings Balances */}
          {!isBalanced() ? (
            <VStack>
              <Text color="white" fontSize="12px" fontFamily="italic">
                Debes calificarte para poder recibir. Fijate el balance de tus
                ahorros!!
              </Text>
            </VStack>
          ) : null}

          {/* Check all */}
          {isBalanced() &&
          Number(SinergyBronze.amount > 0) &&
          Test.last_answer &&
          Number(AbleSale.points_increased_in_this_cycle) >=
            Number(
              GetMinAmountToIncreasePoints(
                Able.points.points_of,
                User.last_points
              )
            ) ? (
            <VStack>
              <Text color="white" fontSize="12px" fontFamily="italic">
                Estas calificado, pero debes esperar hasta el proximo ciclo (
                {Number(Able.cycle) + 1}) para poder recibir tus recompensas.
              </Text>
              <Text color="white" fontSize="18px">
                Bien hecho! Vas por el camino correcto
              </Text>
            </VStack>
          ) : null}

          <Box h="5px" />
          {/* Informacion de Gestion */}
          {Able.management_info != "" ? (
            <>
              <Text color="yellow.300" fontSize="20px" fontWeight="bold">
                Novedades
              </Text>
              <Text color="white" fontSize="12px" fontFamily="italic">
                {Able.admin.managementInfo}
              </Text>
            </>
          ) : null}
        </VStack>

        <HStack w={{ md: "full", sm: "80%", base: "60%" }}>
          <Text color="white" fontSize="20px">
            {nativeCryptoBalance} {NATIVE_CRYPTO}
          </Text>
          <Spacer />
          <Text color="white" fontSize="20px">
            {StableCoin.balance} {MAIN_CURRENCY}
          </Text>
        </HStack>

        <Events wallet={addressAccount} />
      </VStack>
    </>
  );
};
