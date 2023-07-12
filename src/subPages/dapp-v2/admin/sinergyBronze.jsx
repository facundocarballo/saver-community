import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Heading,
  Input,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
} from "@chakra-ui/react";
import { CardDapp } from "../../../components/dapp/card";
import { useProvider } from "../../../context";
import { Loading } from "../../../components/dapp-v2/loading";
import {
  ABLE_SALE_ADDRESS,
  buildTransaciont,
  MAIN_CURRENCY,
  SINERGY_BRONZE_CONTRACT_ADDRESS,
} from "../../../web3/funcs";
import { BronzeSinergyFormula } from "../../../components/dapp-v2/bronzeSInergyFormula";

export const SinergyBronze_Admin = () => {
  // Attributes
  const [max_to_sell, set_max_to_sell] = React.useState("");
  const [min_to_sell, set_min_to_sell] = React.useState("");
  const [price, set_price] = React.useState("");

  const [limit_per_cycle, set_limit_per_cycle] = React.useState("");

  const [msg_pop_up, set_msg_pop_up] = React.useState("");
  const [error, setError] = React.useState(false);
  const [show_pop_up, set_show_pop_up] = React.useState(false);
  const [loading, set_loading] = React.useState(false);

  const cancelRef = React.useRef();

  const actualPassiveReward = {
    title: "RECAUDANDO",
    amountRaised: `${
      SinergyBronze != null
        ? SinergyBronze.rewards.passive.BUSD.future.raised
        : 0
    }  ${MAIN_CURRENCY}`,
    amountToClaim: `${SinergyBronze != null ? 0 : 0}  ${MAIN_CURRENCY}`,
    actualAmount: `${
      SinergyBronze != null
        ? SinergyBronze.rewards.passive.BUSD.future.raised
        : 0
    }  ${MAIN_CURRENCY}`,
  };

  const futurePassiveReward = {
    title: "REPARTIENDO",
    amountRaised: `${
      SinergyBronze != null
        ? SinergyBronze.rewards.passive.BUSD.actual.raised
        : 0
    }  ${MAIN_CURRENCY}`,
    amountToClaim: `${
      SinergyBronze != null ? SinergyBronze.rewards.passive.BUSD.toClaim : 0
    }  ${MAIN_CURRENCY}`,
    actualAmount: `${
      SinergyBronze != null
        ? Number(SinergyBronze.rewards.passive.BUSD.actual.raised) -
          Number(SinergyBronze.rewards.passive.BUSD.actual.claimed)
        : 0
    }  ${MAIN_CURRENCY}`,
  };

  // Context
  const { SinergyBronze, addressAccount, AbleSale } = useProvider();

  // Methods
  const handle_limit_post_by_cycle = async () => {
    const data = await AbleSale.contract.methods
      .set_limit_post_by_cycle(limit_per_cycle)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      ABLE_SALE_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        set_loading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              set_loading(false);
              // Mostrar PopUp
              set_msg_pop_up("Transaccion realizada con exito!");
              set_show_pop_up(true);
            }

            if (err) {
              clearInterval(interval);
              set_loading(false);
              setError(true);
              /// Mostrar en pantalla que ocurrio un error.
              set_msg_pop_up("Error al realizar la transaccion.");
              set_show_pop_up(true);
            }
          });
        }, 500);
      });
  };
  const handle_set_values_of_sale = async () => {
    const data = await AbleSale.contract.methods
      .set_values_of_sale(max_to_sell, min_to_sell, price)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      ABLE_SALE_ADDRESS,
      data
    );
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        set_loading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              set_loading(false);
              // Mostrar PopUp
              set_msg_pop_up("Transaccion realizada con exito!");
              set_show_pop_up(true);
            }

            if (err) {
              clearInterval(interval);
              set_loading(false);
              setError(true);
              /// Mostrar en pantalla que ocurrio un error.
              set_msg_pop_up("Error al realizar la transaccion.");
              set_show_pop_up(true);
            }
          });
        }, 500);
      });
  };

  // Component
  return (
    <>
      <AlertDialog
        isOpen={show_pop_up}
        leastDestructiveRef={cancelRef}
        onClose={() => set_show_pop_up(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Transaccion Exitosa"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text color="white">{msg_pop_up}</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="pink"
                ref={cancelRef}
                onClick={() => set_show_pop_up(false)}
                ml={3}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack w="full">
        <Heading color="white">Sinergy Bronze</Heading>

        {/* Botes */}
        <HStack w="full" display={{ lg: "flex", md: "none" }}>
          <Spacer />
          <CardDapp {...actualPassiveReward} />
          <Spacer />
          <CardDapp {...futurePassiveReward} />
          <Spacer />
        </HStack>

        <Box h="10px" />

        <Heading color="white">Formula Sinergy Bronze</Heading>
        <BronzeSinergyFormula />

        <Box h="10px" />

        <Heading color="white">Configuraciones de Sinergy Bronze</Heading>

        <HStack w={{ lg: "65%", md: "74%", sm: "90%", base: "95%" }}>
          <VStack w="30%">
            <Text>Actualmente: {AbleSale.MAX_AMOUNT_SELL_TOKEN}</Text>
            <Input
              value={max_to_sell}
              onChange={(e) => {
                set_max_to_sell(e.currentTarget.value);
              }}
              placeholder="Maxima cantidad a vender por un NFT."
              size="lg"
              color="white"
            />
          </VStack>

          <VStack w="30%">
            <Text>Actualmente: {AbleSale.MIN_AMOUNT_SELL_TOKEN}</Text>
            <Input
              value={min_to_sell}
              onChange={(e) => {
                set_min_to_sell(e.currentTarget.value);
              }}
              placeholder="Minima cantidad a vender por un NFT."
              size="lg"
              color="white"
            />
          </VStack>

          <VStack w="30%">
            <Text>
              Actualmente: {AbleSale.TOKEN_PRICE} {MAIN_CURRENCY}
            </Text>
            <Input
              value={price}
              onChange={(e) => {
                set_min_to_sell(e.currentTarget.value);
              }}
              placeholder="Precio de 1 ABLE en la Lista de Venta."
              size="lg"
              color="white"
            />
          </VStack>
          <Button variant="actionDapp" onClick={handle_set_values_of_sale}>
            Cambiar
          </Button>
        </HStack>

        <HStack w={{ lg: "65%", md: "74%", sm: "90%", base: "95%" }}>
          <Text>Actualmente: {AbleSale.LIMIT_POST_BY_CYCLE}</Text>
          <Input
            value={limit_per_cycle}
            onChange={(e) => {
              set_limit_per_cycle(e.currentTarget.value);
            }}
            placeholder="Limite de publicaciones por billetera por ciclo en la Lista de Venta."
            size="lg"
            color="white"
          />
          <Button variant="actionDapp" onClick={handle_limit_post_by_cycle}>
            Cambiar
          </Button>
          <Spacer />
        </HStack>
      </VStack>
    </>
  );
};
