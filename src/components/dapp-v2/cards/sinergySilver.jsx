import React from "react";
import {
  HStack,
  VStack,
  Spacer,
  Image,
  Heading,
  Text,
  Button,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Input,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { useProvider } from "../../../context";
import { Events } from "../sinergySilver/events";
import {
  ABLE_SALE_ADDRESS,
  buildTransaciont,
  CDA_CONTRACT_ADDRESS,
  MINI_GAME_ADDRESS,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  SINERGY_SILVER_ADDRESS,
  STABLE_COIN_CONTRACT_ADDRESS,
} from "../../../web3/funcs";
import { Loading } from "../loading";

/*
    ESTRUCTURA DE UN NFT
{
        name,
        id: tokenID,
        connections_in_advertising_list,
        time_to_end_advertising_list,
        timestamp_come_waiting_list,
        time_wasted_advertisig_list
        imageURL,
        ownerAddress,
        activeRewardsClaimed,
        references: {
            total: totalAmountReferences
        },
        clps_amount,
        is_in_advertising_list,
        is_in_waiting_list
}
*/

export const SinergySilverCard = ({ nft, owner }) => {
  const PRICE = 30;
  // Attributes
  const [showNFTs, setShowNFTs] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [showClps, setShowClps] = React.useState(false);
  const [showFinalMessage, setShowFinalMessage] = React.useState(false);
  const [approveBUSD, setApproveBUSD] = React.useState(false);

  // Sell ABLE
  const [showSellAble, setShowSellAble] = React.useState(false);
  const [amountOfAble, setAmountOfAble] = React.useState('');

  // Edit NFT
  // const [showEditNFT, setShowEditNFT] = React.useState(false);
  // const [name, setName] = React.useState("");
  // const [inscription, setInscription] = React.useState("");
  // const [valueProposal, setValueProposal] = React.useState("");
  // const [approveABLE, setApproveABLE] = React.useState(false);
  // const [approveCDA, setApproveCDA] = React.useState(false);

  const [amountOfClps, setAmountOfClps] = React.useState("");
  const [finalMessage, setFinalMessage] = React.useState("");

  const [nftSelected, setNftSelected] = React.useState(null);

  const cancelRef = React.useRef();
  const toast = useToast();
  const checkImage = "https://i.ibb.co/0JT3GVz/check.png";
  // Context
  const {
    addressAccount,
    SinergySilver,
    StableCoin,
    uploadAbleSale,
    Able,
    AbleSale,
    uploadSinergySilverCLS,
    uploadChooseFavouriteNFT_Silver,
    uploadModifyNFT_Silver,
  } = useProvider();
  // Methods
  const getCleanAddress = (address) => {
    const firstPart = address.substring(0, 5);
    const secondPart = address.substring(address.length - 5, address.length);

    return firstPart + "..." + secondPart;
  };
  const showCheckImg = (nft) => {
    return nftSelected == null
      ? nft.id == SinergySilver.favouriteNFT.id
      : nft.id == nftSelected;
  };

  // TODO
  const handleChangeFavouriteNFT = async () => {
    const data = await SinergySilver.contract.methods
      .setFavouriteNFT(nftSelected)
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
        console.log("Transaction Hash: ", res);

        setLoading(true);

        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
              await uploadChooseFavouriteNFT_Silver();
              setLoading(false);
              setShowNFTs(false);
            }

            if (err) {
              clearInterval(interval);
              setShowNFTs(false);
              setLoading(false);
              setError(true);
            }
          });
        }, 500);
      });
  };

  const getPositionInWaitingList = () => {
    for (let i = 0; i < SinergySilver.waiting_list.length; i++) {
      if (SinergySilver.waiting_list[i].id == nft.id) return i + 1;
    }
    return 999;
  };

  const getStateOfNFT = (nft) => {
    if (nft.is_in_advertising_list) return "Lista de Sorteo";
    if (nft.is_in_waiting_list)
      return `Lista de Espera | Posicion: ${getPositionInWaitingList()}`;
    return "Fuera del Mini Juego";
  };

  const isOwner = () => {
    return (
      String(addressAccount).toLowerCase() ==
      String(nft.ownerAddress).toLowerCase()
    );
  };

  const handleBuyCLP = async () => {
    const data = await SinergySilver.mini_game.methods
      .buy_clps(nft.id, amountOfClps)
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      MINI_GAME_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);

        setLoading(true);

        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
              await uploadSinergySilverCLS();
              setLoading(false);
              setShowClps(false);
              setFinalMessage(`Has adquirido ${amountOfClps} CLS`);
              setAmountOfClps("");
              setShowFinalMessage(true);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setShowClps(false);
              setError(true);
              setFinalMessage(
                `Hubo un error en la transaccion. Por favor, revisa las condiciones y vuelve a intentarlo.`
              );
              setAmountOfClps("");
              setShowFinalMessage(true);
            }

            setApproveBUSD(false);
          });
        }, 500);
      });
  };

  const handleApprove_ERC20 = async (
    amount,
    Contract,
    ContractAddress,
    func,
    spender
  ) => {
    const amountWEI = web3.utils.toWei(amount, "ether");
    const data = await Contract.methods.approve(spender, amountWEI).encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      ContractAddress,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);

        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
              func(true);
              setLoading(false);
            }

            if (err) {
              setLoading(false);
              setFinalMessage(
                `Hubo un error en la transaccion. Por favor, revisa las condiciones y vuelve a intentarlo.`
              );
              setAmountOfClps("");
              setShowFinalMessage(true);
            }
          });
        }, 500);
      });
  };

  const handleSellAble = async () => {
    const amount_able_wei = web3.utils.toWei(amountOfAble, 'ether');
    const data = await AbleSale.contract.methods
      .sell_able(amount_able_wei, nft.id)
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
        console.log("Transaction Hash: ", res);

        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
              await uploadAbleSale();
              setLoading(false);
              setShowSellAble(false);
              setFinalMessage(`Has publicado ${amountOfAble} ABLE`);
              setAmountOfAble("");
              setShowFinalMessage(true);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setShowSellAble(false);
              setError(true);
              setFinalMessage(
                `Hubo un error en la transaccion. Por favor, revisa las condiciones y vuelve a intentarlo.`
              );
              setAmountOfClps("");
              setShowFinalMessage(true);
            }
          });
        }, 500);
      });
  };

  const handleSellCLP = async () => {
    const data = await SinergySilver.mini_game.methods
      .sell_clps(nft.id, amountOfClps)
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      MINI_GAME_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);

        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
              await uploadSinergySilverCLS();
              setLoading(false);
              setShowClps(false);
              setFinalMessage(`Has vendido ${amountOfClps} CLS`);
              setAmountOfClps("");
              setShowFinalMessage(true);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setShowClps(false);
              setError(true);
              setFinalMessage(
                `Hubo un error en la transaccion. Por favor, revisa las condiciones y vuelve a intentarlo.`
              );
              setAmountOfClps("");
              setShowFinalMessage(true);
            }
          });
        }, 500);
      });
  };

  const handleEditNFT = async () => {
    const data = await SinergySilver.contract.methods
      .modifyNFT(name, inscription, valueProposal, nft.id)
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
        console.log("Transaction Hash: ", res);

        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
              await uploadModifyNFT_Silver();
              setLoading(false);
              setShowEditNFT(false);
              setFinalMessage(`Has editado tu NFT.`);
              setName("");
              setInscription("");
              setValueProposal("");
              setApproveABLE(false);
              setApproveBUSD(false);
              setApproveCDA(false);
              setShowFinalMessage(true);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setShowEditNFT(false);
              setError(true);
              setFinalMessage(
                `Hubo un error en la transaccion. Por favor, revisa las condiciones y vuelve a intentarlo.`
              );
              setShowFinalMessage(true);
              setApproveABLE(false);
              setApproveBUSD(false);
              setApproveCDA(false);
            }
          });
        }, 500);
      });
  };

  // Component
  return (
    <>
      {/* NFT FAVORITO */}
      <AlertDialog
        isOpen={showNFTs}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowNFTs(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.700">
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white">
              ELIGE TU NFT FAVORITO
            </AlertDialogHeader>
            <AlertDialogBody>
              {SinergySilver == null
                ? null
                : SinergySilver.myNFTs.map((nft, idx) => (
                    <div key={idx}>
                      <HStack
                        w="full"
                        _hover={{
                          // transform: 'scale(1.1)',
                          bg: "gray.800",
                          animationDuration: "3s",
                          // boxShadow: '0px 0px 10px #fff',
                          borderRadius: "6px",
                        }}
                      >
                        <Box w="10px" />

                        {showCheckImg(nft) ? (
                          <Image
                            src={checkImage}
                            alt="selected"
                            boxSize="30px"
                          />
                        ) : (
                          <Box
                            w="30px"
                            h="30px"
                            border="1px solid"
                            borderColor="gray"
                            borderRadius="6px"
                            onClick={() => setNftSelected(nft.id)}
                            cursor="pointer"
                          />
                        )}
                        <Text color="white">{nft.name}</Text>
                        <Spacer />
                        <Text color="white">{nft.clps_amount} CLS</Text>
                        <Box w="10px" />
                      </HStack>
                      <Box h="10px" />
                      <Divider />
                      <Box h="10px" />
                    </div>
                  ))}
            </AlertDialogBody>
            <AlertDialogFooter>
              {error ? (
                <Text>Ocurrio un Error. Intentalo nuevamente</Text>
              ) : null}
              {loading ? (
                <Loading />
              ) : (
                <Button
                  variant="actionDapp"
                  ref={cancelRef}
                  onClick={handleChangeFavouriteNFT}
                  ml={3}
                  disabled={nftSelected == null}
                >
                  HACER FAVORITO
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* ADQUIRIR / VENDER CLS */}
      <AlertDialog
        isOpen={showClps}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowClps(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.700">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              ADQUIERE O VENDE CLS
            </AlertDialogHeader>
            <AlertDialogBody>
              <Input
                value={amountOfClps}
                onChange={(e) => setAmountOfClps(e.currentTarget.value)}
                placeholder="Cantidad de CLS"
                size="md"
                color="white"
              />
              <Box h="10px" />
              {loading ? (
                <Loading />
              ) : (
                <HStack w="full">
                  <Spacer />

                  {approveBUSD ? (
                    <Button
                      variant="actionDapp"
                      onClick={handleBuyCLP}
                      isDisabled={
                        !SinergySilver.waiting_list_state ||
                        Number(amountOfClps) > 30
                      }
                    >
                      ADQUIRIR
                    </Button>
                  ) : (
                    <Button
                      variant="actionDapp"
                      onClick={() =>
                        handleApprove_ERC20(
                          Number(
                            Number(amountOfClps) * SinergySilver.cls_price
                          ).toString(),
                          StableCoin.contract,
                          STABLE_COIN_CONTRACT_ADDRESS,
                          setApproveBUSD,
                          MINI_GAME_ADDRESS
                        )
                      }
                      isDisabled={
                        !SinergySilver.waiting_list_state ||
                        Number(amountOfClps) > 30
                      }
                    >
                      APROBAR
                    </Button>
                  )}
                  <Button
                    isDisabled={
                      nft.clps_amount == 0 ||
                      Number(amountOfClps) > nft.clps_amount ||
                      !isOwner()
                    }
                    variant="actionDapp"
                    onClick={handleSellCLP}
                  >
                    VENDER
                  </Button>
                </HStack>
              )}
            </AlertDialogBody>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* VENDER ABLE */}
      <AlertDialog
        isOpen={showSellAble}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowSellAble(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.700">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              VENDE ABLE
            </AlertDialogHeader>
            <AlertDialogBody>
              <Input
                value={amountOfAble}
                onChange={(e) => setAmountOfAble(e.currentTarget.value)}
                placeholder="Cantidad de ABLE"
                size="md"
                color="white"
              />
              <Box h="10px" />
              {loading ? (
                <Loading />
              ) : (
                <HStack w="full">
                  <Spacer />

                  {approveBUSD ? (
                    <Button
                      variant="actionDapp"
                      onClick={handleSellAble}
                    >
                      VENDER
                    </Button>
                  ) : (
                    <Button
                      variant="actionDapp"
                      onClick={() =>
                        handleApprove_ERC20(
                          amountOfAble,
                          Able.contract,
                          SAVER_TOKEN_CONTRACT_ADDRESS,
                          setApproveBUSD,
                          ABLE_SALE_ADDRESS
                        )
                      }
                      isDisabled={
                        !SinergySilver.waiting_list_state ||
                        Number(amountOfClps) > 30
                      }
                    >
                      APROBAR
                    </Button>
                  )}
                </HStack>
              )}
            </AlertDialogBody>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* MENSAJE FINAL (ERROR O TRANSACCION EXITOSA) */}
      <AlertDialog
        isOpen={showFinalMessage}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowFinalMessage(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.700">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Transaccion Exitosa"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text color="white">{finalMessage}</Text>
            </AlertDialogBody>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack
        border="2px"
        borderColor="yellow.400"
        borderRadius={15}
        minW={{ lg: "550px", md: "550px", sm: "0px", base: "0px" }}
      >
        <HStack w="full">
          <Box w="15px" />
          <Image src={nft.imageURL} alt="nft-image" boxSize="150px" />
          <VStack w="full">
            <HStack w="full">
              <Spacer />
              <VStack>
                <Heading color="white">{nft.name}</Heading>
                <Text
                  color="white"
                  fontWeight="black"
                  fontSize="xl"
                  opacity={0.7}
                >
                  {getCleanAddress(nft.ownerAddress)}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </VStack>
          <Box w="15px" />
        </HStack>

        <HStack w="full">
          <Box w="15px" />
          <VStack w="full">
            <HStack w="full">
              <Box w="5px" />
              <Text fontWeight="bold" color="white">
                ID: {nft.id}
              </Text>
            </HStack>
            <HStack w="full">
              <Box w="5px" />
              <Text fontWeight="bold" color="white">
                {getStateOfNFT(nft)}
              </Text>
            </HStack>
            <HStack w="full">
              <Box w="5px" />
              <Text fontWeight="bold" color="white">
                {nft.references.total} Conexiones
              </Text>
            </HStack>
          </VStack>

          <Spacer />

          <VStack>
            <Events id={nft.id} wallet={nft.ownerAddress} msg="Historial" />
            {owner ? (
              <Button
                color="white"
                fontSize="13px"
                bg="blue.500"
                _hover={{
                  transform: "scale(1.1)",
                  shadow: "1px 1px 10px #ccc",
                }}
                onClick={() => setShowNFTs(true)}
              >
                Elegir NFT
              </Button>
            ) : null}
          </VStack>

          <Box w="15px" />
        </HStack>

        <Divider />

        <HStack w="full" borderRadius={6}>
          <Box w="15px" />
          <Text color="white" fontWeight="bold">
            {nft.clps_amount} CLS
          </Text>
          <Spacer />
          {isOwner() ? (
            <Button variant="actionDapp" onClick={() => setShowClps(true)}>
              Adquir / Vender CLS
            </Button>
          ) : null}
          <Box w="10px" />
          <Button onClick={() => setShowSellAble(true)} variant="actionDapp">
            VENDER ABLE
          </Button>
          <Box w="10px" />
        </HStack>
        <Box h="1px" />
      </VStack>
    </>
  );
};
