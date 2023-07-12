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
  buildTransaciont,
  MAIN_CURRENCY,
  SINERGY_SILVER_ADDRESS,
} from "../../../web3/funcs";

export const SinergySilver_Admin = () => {
  // Attributes
  const [nfts_on_advertising_list, set_nfts_on_advertising_list] =
    React.useState("");
  const [
    loading_nfts_on_advertising_list,
    set_loading_nfts_on_advertising_list,
  ] = React.useState(false);

  const [new_time_advertising_list, set_new_time_advertising_list] =
    React.useState("");
  const [loading_time_advertising_list, set_loading_time_advertising_list] =
    React.useState(false);

  const [max_connections, set_max_connections] = React.useState("");
  const [loading_max_connections, set_loading_max_connections] =
    React.useState(false);

  const [cls_price, set_cls_price] = React.useState("");
  const [loading_cls_price, set_loading_cls_price] = React.useState(false);

  const [range_max_value, set_range_max_value] = React.useState('');
  const [loading_range_max_value, set_loading_range_max_value] = React.useState(false);

  const [range_min_value, set_range_min_value] = React.useState('');
  const [loading_range_min_value, set_loading_range_min_value] = React.useState(false);

  const [msg_pop_up, set_msg_pop_up] = React.useState("");
  const [error, setError] = React.useState(false);
  const [show_pop_up, set_show_pop_up] = React.useState(false);

  const cancelRef = React.useRef();

  const actualPassiveReward_SinergySilver = {
    title: "RECAUDANDO",
    amountRaised: `${
      SinergySilver != null
        ? SinergySilver.rewards.passiveReward.future.raised
        : 0
    }  ${MAIN_CURRENCY}`,
    amountToClaim: `${
      SinergySilver != null ? 0 : 0 // SinergyBronze.rewards.passiveReward.future.tpClaim
    }  ${MAIN_CURRENCY}`,
    actualAmount: `${
      SinergySilver != null
        ? SinergySilver.rewards.passiveReward.future.raised
        : 0
    }  ${MAIN_CURRENCY}`,
  };

  const futurePassiveReward_SinergySilver = {
    title: "REPARTIENDO",
    amountRaised: `${
      SinergySilver != null
        ? SinergySilver.rewards.passiveReward.actual.raised
        : 0
    }  ${MAIN_CURRENCY}`,
    amountToClaim: `${
      SinergySilver != null ? SinergySilver.rewards.passiveReward.toClaim : 0
    }  ${MAIN_CURRENCY}`,
    actualAmount: `${
      SinergySilver != null
        ? Number(SinergySilver.rewards.passiveReward.actual.raised) -
          Number(SinergySilver.rewards.passiveReward.actual.claimed)
        : 0
    }  ${MAIN_CURRENCY}`,
  };

  // Context
  const { SinergySilver, addressAccount } = useProvider();

  // Methods
  const handleChangeNFTsAdvertisingList = async () => {
    const data = await SinergySilver.contract.methods
      .change_nfts_on_advertising_list(nfts_on_advertising_list)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      SINERGY_SILVER_ADDRESS,
      data
    );
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        set_loading_nfts_on_advertising_list(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              set_loading_nfts_on_advertising_list(false);
              set_msg_pop_up(
                "La cantidad de NFTs en la Lista de Sorteo se ha cambiado correctamente"
              );
              // Mostrar PopUp
              set_show_pop_up(true);
            }

            if (err) {
              clearInterval(interval);
              set_loading_nfts_on_advertising_list(false);
              setError(true);
              set_msg_pop_up(
                "Hubo un error durante la transaccion, no se pudo actualizar la cantidad de NFTs en la Lista de Sorteo."
              );
              /// Mostrar en pantalla que ocurrio un error.
              set_show_pop_up(true);
            }
          });
        }, 500);
      });
  };

  const handleChangeTimeAdvertisingList = async () => {
    const data = await SinergySilver.contract.methods
      .change_time_on_advertising_list(new_time_advertising_list)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      SINERGY_SILVER_ADDRESS,
      data
    );
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        set_loading_time_advertising_list(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              set_loading_time_advertising_list(false);
              set_msg_pop_up(
                "Se ha cambiado el tiempo que pasa un NFT dentro de la Lista de Sorteo correctamente."
              );
              // Mostrar PopUp
              set_show_pop_up(true);
            }

            if (err) {
              clearInterval(interval);
              set_loading_time_advertising_list(false);
              setError(true);
              set_msg_pop_up(
                "Hubo un error al cambiar el tiempo que pasa un NFT dentro de la Lista de Sorteo. Intentalo nuevamente."
              );
              /// Mostrar en pantalla que ocurrio un error.
              set_show_pop_up(true);
            }
          });
        }, 500);
      });
  };

  const handleChangeMaxConnections = async () => {
    const data = await SinergySilver.contract.methods
      .change_max_connections_advertising_list(max_connections)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      SINERGY_SILVER_ADDRESS,
      data
    );
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        set_loading_max_connections(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              set_loading_max_connections(false);
              set_msg_pop_up(
                "Se ha cambiado la maxima cantidad de conexiones que un NFT dentro de la Lista de Sorteo puede recibir."
              );
              // Mostrar PopUp
              set_show_pop_up(true);
            }

            if (err) {
              clearInterval(interval);
              set_loading_max_connections(false);
              setError(true);
              set_msg_pop_up(
                "Hubo un error al cambiar la maxima cantidad de conexiones que un NFT dentro de la Lista de Sorteo puede recibir. Intentalo nuevamente."
              );
              /// Mostrar en pantalla que ocurrio un error.
              set_show_pop_up(true);
            }
          });
        }, 500);
      });
  };

  const handleChangeCLS_Price = async () => {
    const data = await SinergySilver.contract
      .change_clps_price(cls_price)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      SINERGY_SILVER_ADDRESS,
      data
    );
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        set_loading_cls_price(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              set_loading_cls_price(false);
              set_msg_pop_up(
                `Se ha actualizdo el precio de los CLS: ${cls_price} BUSD.`
              );
              set_cls_price("");
              // Mostrar PopUp
              set_show_pop_up(true);
            }

            if (err) {
              clearInterval(interval);
              set_loading_cls_price(false);
              setError(true);
              set_msg_pop_up(
                "Hubo un error al actualizar el precio de los CLS."
              );
              /// Mostrar en pantalla que ocurrio un error.
              set_show_pop_up(true);
            }
          });
        }, 500);
      });
  };

  const handleChangeRangeMaxValue = async () => {
    const data = await SinergySilver.contract.methods.change_clps_range_max_value(range_max_value).encodeABI();
    const params = await buildTransaciont(addressAccount, SINERGY_SILVER_ADDRESS, data);
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        set_loading_range_max_value(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              set_loading_range_max_value(false);
              set_msg_pop_up(
                `Se ha actualizdo el rango maximo de los CLS totales: ${range_max_value} CLS.`
              );
              set_range_max_value("");
              // Mostrar PopUp
              set_show_pop_up(true);
            }

            if (err) {
              clearInterval(interval);
              set_loading_range_max_value(false);
              setError(true);
              set_msg_pop_up(
                "Hubo un error al actualizar el rango maximo de los CLS."
              );
              /// Mostrar en pantalla que ocurrio un error.
              set_show_pop_up(true);
            }
          });
        }, 500);
      });
  };

  const handleChangeRangeMinValue = async () => {
    const data = await SinergySilver.contract.methods.change_clps_range_min_value(range_min_value).encodeABI();
    const params = await buildTransaciont(addressAccount, SINERGY_SILVER_ADDRESS, data);
    ethereum
    .request({
      method: "eth_sendTransaction",
      params: [params],
    })
    .then((res) => {
      set_loading_range_min_value(true);
      const interval = setInterval(() => {
        web3.eth.getTransactionReceipt(res, async (err, rec) => {
          if (rec) {
            clearInterval(interval);
            set_loading_range_min_value(false);
            set_msg_pop_up(
              `Se ha actualizdo el rango minimo de los CLS totales: ${range_min_value} CLS.`
            );
            set_range_min_value("");
            // Mostrar PopUp
            set_show_pop_up(true);
          }

          if (err) {
            clearInterval(interval);
            set_loading_range_min_value(false);
            setError(true);
            set_msg_pop_up(
              "Hubo un error al actualizar el rango minimo de los CLS."
            );
            /// Mostrar en pantalla que ocurrio un error.
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
        <Heading color="white">Sinergy Silver</Heading>

        {/* Botes */}
        <HStack w="full" display={{ lg: "flex", md: "none" }}>
          <Spacer />
          <CardDapp {...actualPassiveReward_SinergySilver} />
          <Spacer />
          <CardDapp {...futurePassiveReward_SinergySilver} />
          <Spacer />
        </HStack>

        <Box h="10px" />

        <Heading color="white">Configuraciones de Sinergy Silver</Heading>

        <HStack w={{ lg: "65%", md: "74%", sm: "90%", base: "95%" }}>
          <Spacer />
          <Input
            value={nfts_on_advertising_list}
            onChange={(e) => {
              set_nfts_on_advertising_list(e.currentTarget.value);
            }}
            placeholder="Nueva cantidad de NFTs en la Lista de Sorteo"
            size="lg"
            color="white"
          />
          {loading_nfts_on_advertising_list ? (
            <Loading />
          ) : (
            <Button
              variant="actionDapp"
              onClick={handleChangeNFTsAdvertisingList}
            >
              Cambiar
            </Button>
          )}
          <Spacer />
        </HStack>

        <HStack w={{ lg: "65%", md: "74%", sm: "90%", base: "95%" }}>
          <Spacer />
          <Input
            value={new_time_advertising_list}
            onChange={(e) => {
              set_new_time_advertising_list(e.currentTarget.value);
            }}
            placeholder="Nuevo tiempo en Lista de Sorteo (en horas)"
            size="lg"
            color="white"
          />
          {loading_time_advertising_list ? (
            <Loading />
          ) : (
            <Button
              variant="actionDapp"
              onClick={handleChangeTimeAdvertisingList}
            >
              Cambiar
            </Button>
          )}
          <Spacer />
        </HStack>

        <HStack w={{ lg: "65%", md: "74%", sm: "90%", base: "95%" }}>
          <Spacer />
          <Input
            value={new_time_advertising_list}
            onChange={(e) => {
              set_max_connections(e.currentTarget.value);
            }}
            placeholder="Maximas conexiones en Lista de Sorteo"
            size="lg"
            color="white"
          />
          {loading_max_connections ? (
            <Loading />
          ) : (
            <Button variant="actionDapp" onClick={handleChangeMaxConnections}>
              Cambiar
            </Button>
          )}
          <Spacer />
        </HStack>

        <HStack w={{ lg: "65%", md: "74%", sm: "90%", base: "95%" }}>
          <Spacer />
          <Input
            value={cls_price}
            onChange={(e) => {
              set_cls_price(e.currentTarget.value);
            }}
            placeholder="Precio del CLS"
            size="lg"
            color="white"
          />
          {loading_cls_price ? (
            <Loading />
          ) : (
            <Button variant="actionDapp" onClick={handleChangeCLS_Price}>
              Cambiar
            </Button>
          )}
          <Spacer />
        </HStack>

        <HStack w={{ lg: "65%", md: "74%", sm: "90%", base: "95%" }}>
          <Spacer />
          <Input
            value={range_min_value}
            onChange={(e) => {
              set_range_min_value(e.currentTarget.value);
            }}
            placeholder="Rango Minimo de CLS Total"
            size="lg"
            color="white"
          />
          {loading_cls_price ? (
            <Loading />
          ) : (
            <Button variant="actionDapp" onClick={handleChangeRangeMinValue}>
              Cambiar
            </Button>
          )}
          <Spacer />
        </HStack>

        <HStack w={{ lg: "65%", md: "74%", sm: "90%", base: "95%" }}>
          <Spacer />
          <Input
            value={range_max_value}
            onChange={(e) => {
              set_range_max_value(e.currentTarget.value);
            }}
            placeholder="Rango Maximo de CLS"
            size="lg"
            color="white"
          />
          {loading_cls_price ? (
            <Loading />
          ) : (
            <Button variant="actionDapp" onClick={handleChangeRangeMaxValue}>
              Cambiar
            </Button>
          )}
          <Spacer />
        </HStack>

      </VStack>
    </>
  );
};
