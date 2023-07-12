import React from "react";
import {
  HStack,
  VStack,
  Spacer,
  Image,
  Link,
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
  Divider,
  Input,
} from "@chakra-ui/react";
import { useProvider } from "../../../context";
import { Events } from "../events";
import {
  ABLE_CONTRACT_ADDRESS,
  ABLE_SALE_ADDRESS,
  buildTransaciont,
  CDA_CONTRACT_ADDRESS,
  COMMUNITY_WALLET,
  DEVELOPMENT_WALLET,
  MAIN_CURRENCY,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  SINERGY_BRONZE_CONTRACT_ADDRESS,
  SINERGY_SALE_CONTRACT_ADDRESS,
  TRIPLE_SALE_ADDRESS,
  URL_WEB,
} from "../../../web3/funcs";
import { Loading } from "../loading";
import { IMG_NFT_TOKEN } from "../../../images";
import { BuyNFT } from "../buyNFT";
import { Sells } from "../Sells";
import { ChooseNFT } from "../ChooseNFT";

/*
    ESTRUCTURA DE UN NFT
{
    name: name,
    inscription: inscription,
    valueProposal: valueProposal,
    imageURL: imageURL,
    ownerAddress: ownerAddress,
    directReferenceNFT: directReferenceNFT,
    activeRewardsClaimed: activeRewardsClaimed,
    references: references,
    dateCreated: dateCreated,
    id: tokenID
}
*/

const YOUTUBE_BASIC_URL = "https://youtu.be/";

export const SinergyBronzeCard = ({ nft, owner }) => {
  // Attributes
  const [showNFTs, setShowNFTs] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sellAble, setSellAble] = React.useState(false);
  const [sellTriple, setSellTriple] = React.useState(false);
  const [showFinalMessage, setShowFinalMessage] = React.useState(false);
  const [amountToSell, setAmountToSell] = React.useState("");
  const [finalMessage, setFinalMessage] = React.useState("");
  const [approveAble, setApproveAble] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [nftSelected, setNftSelected] = React.useState(null);

  const [showTermsConditions, setShowTermsConditions] = React.useState(false);

  const cancelRef = React.useRef();
  const toast = useToast();
  const checkImage = "https://i.ibb.co/0JT3GVz/check.png";
  const BASE_URL = "/dapp/sinergyBronze/buyNFT/";

  // Context
  const {
    addressAccount,
    SinergyBronze,
    User,
    Able,
    CDA,
    AbleSale,
    TripleSale,
    uploadAbleSale,
    uploadTripleSale,
  } = useProvider();

  // Methods
  const getCleanAddress = (addres) => {
    const firstPart = addres.substring(0, 5);
    const secondPart = addres.substring(addres.length - 5, addres.length);

    return firstPart + "..." + secondPart;
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
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
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
              setShowFinalMessage(true);
            }
          });
        }, 500);
      });
  };

  const handleSellAble = async () => {
    setShowTermsConditions(false);
    const amount_able_wei = web3.utils.toWei(amountToSell, "ether");
    const data = await AbleSale.contract.methods
      .Sell(amount_able_wei, nft.id)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      SINERGY_SALE_CONTRACT_ADDRESS,
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
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              clearInterval(interval);
              await uploadAbleSale();
              setLoading(false);
              setSellAble(false);
              setApproveAble(false);
              setFinalMessage(`Has publicado ${amountToSell} ABLE`);
              setAmountToSell("");
              setShowFinalMessage(true);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setSellAble(false);
              setApproveAble(false);
              setError(true);
              setFinalMessage(
                `Hubo un error en la transaccion. Por favor, revisa las condiciones y vuelve a intentarlo.`
              );
              setAmountToSell("");
              setShowFinalMessage(true);
            }
          });
        }, 500);
      });
  };

  const handleSellTriple = async () => {
    const amount_able_wei = web3.utils.toWei(amountToSell, "ether");
    const data = await TripleSale.contract.methods
      .sell(amount_able_wei, nft.id)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      TRIPLE_SALE_ADDRESS,
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
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
            if (rec) {
              clearInterval(interval);
              await uploadTripleSale();
              setLoading(false);
              setSellTriple(false);
              setFinalMessage(`Has publicado ${amountToSell} ABLE`);
              setAmountToSell("");
              setShowFinalMessage(true);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setSellTriple(false);
              setError(true);
              setFinalMessage(
                `Hubo un error en la transaccion. Por favor, revisa las condiciones y vuelve a intentarlo.`
              );
              setAmountToSell("");
              setShowFinalMessage(true);
            }
          });
        }, 500);
      });
  };

  const handleWithdrawAble = async () => {
    console.log(AbleSale);
    const data = await AbleSale.contract.methods.QuitSell(nft.id).encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      SINERGY_SALE_CONTRACT_ADDRESS,
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
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              clearInterval(interval);
              setFinalMessage(
                `Has retirado ${nft.selling.able} ABLE de la lista de venta.`
              );
              await uploadAbleSale();
              setLoading(false);
              setShowFinalMessage(true);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
              setFinalMessage(
                `Hubo un error en la transaccion. Por favor, revisa las condiciones y vuelve a intentarlo.`
              );
              setShowFinalMessage(true);
            }
          });
        }, 500);
      });
  };

  const onClose = () => {
    if (sellAble) {
      setSellAble(false);
      return;
    }

    setSellTriple(false);
  };

  const sinergySaleCondition = () => {
    return (
      String(addressAccount).toLowerCase() != COMMUNITY_WALLET.toLowerCase() &&
      String(addressAccount).toLowerCase() !=
        DEVELOPMENT_WALLET.toLowerCase() &&
      SinergyBronze.amount == 0
    );
  };

  const canSellAble = () => {
    if (nft.selling != undefined) {
      if (nft.selling.able > 0) return false;
      return nft.selling.can_selling_by_time;
    }
    return false;
  };

  const is_selling = () => {
    if (nft.selling != undefined) {
      if (nft.selling.able > 0) return true;
    }
    return false;
  };

  const canSellTriple = () => {
    if (nft.selling != undefined) {
      if (nft.selling.triple > 0) return false;
      return true;
    }
    return false;
  };

  const isYouTubeLink = (str) => String(str).includes(YOUTUBE_BASIC_URL);
  const getVideoID = (str) => String(str).substring(YOUTUBE_BASIC_URL.length);
  const isOwner = () =>
    String(addressAccount).toLocaleLowerCase() ==
    String(nft.ownerAddress).toLocaleLowerCase();

  // Component
  return (
    <>
      {/* VENDER ABLE y TRIPLE */}
      {owner ? (
        <AlertDialog
          isOpen={sellAble || sellTriple}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent bg="gray.700">
              <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
                Publica tus ABLE en la Lista de Ventas
              </AlertDialogHeader>
              <AlertDialogBody>
                <Text color="white" fontSize="lg">
                  ATENCION! Puedes publicar ABLE en la Lista de Ventas si
                  cumples con estos 2 requisitos.
                </Text>
                <Box h="10px" />
                <Divider />
                <Box h="10px" />
                <Text color="white" fontSize="md">
                  1) Tener la cuenta calificada.
                </Text>
                <Box h="10px" />
                <Divider />
                <Box h="10px" />
                <Text color="white" fontSize="md">
                  2) Tener al menos esta cantidad de Able:{" "}
                  {AbleSale != null ? AbleSale.min_amount_able_to_sell : 0}
                </Text>
                <Box h="10px" />
                <Divider />
                <Box h="10px" />
                <Text color="white" fontSize="md">
                  Si logró publicar los ABLE en las listas de ventas y en el
                  momento de vender no cumple con éstos dos requisitos, un 50%
                  de lo que le correspondería recibir en DAI, se enviará al bote
                  del regalo por calificación para ser repartido entre los
                  usuarios calificados.
                </Text>
                <Box h="10px" />
                <Divider />
                <Box h="10px" />
                <Input
                  value={amountToSell}
                  onChange={(e) => setAmountToSell(e.currentTarget.value)}
                  placeholder="Cantidad a vender"
                  size="md"
                  color="white"
                />
                <Box h="10px" />
                <Divider />
                <Box h="10px" />
                {loading ? (
                  <Loading />
                ) : (
                  <HStack w="full">
                    <Spacer />

                    {approveAble ? (
                      <Button
                        variant="actionDapp"
                        onClick={
                          sellAble
                            ? () => setShowTermsConditions(true)
                            : handleSellTriple
                        }
                        disabled={sellAble ? !canSellAble() : !canSellTriple()}
                      >
                        VENDER
                      </Button>
                    ) : (
                      <Button
                        variant="actionDapp"
                        onClick={() =>
                          sellAble
                            ? handleApprove_ERC20(
                                amountToSell,
                                Able.contract,
                                ABLE_CONTRACT_ADDRESS,
                                setApproveAble,
                                SINERGY_SALE_CONTRACT_ADDRESS
                              )
                            : handleApprove_ERC20(
                                amountToSell,
                                CDA.contract,
                                CDA_CONTRACT_ADDRESS,
                                setApproveAble,
                                TRIPLE_SALE_ADDRESS
                              )
                        }
                        isDisabled={
                          sellAble ? !canSellAble() : !canSellTriple()
                        }
                      >
                        APROBAR
                      </Button>
                    )}
                  </HStack>
                )}
              </AlertDialogBody>
              <AlertDialogFooter>
                {sellAble ? (
                  canSellAble() ? (
                    <Text color="white">
                      Puedes publicar desde {AbleSale.MIN_AMOUNT_SELL_TOKEN}{" "}
                      ABLE hasta {AbleSale.MAX_AMOUNT_SELL_TOKEN} ABLE.
                    </Text>
                  ) : !User.is_qualified ? (
                    <Text color="red.400">Tu cuenta esta descalificada.</Text>
                  ) : (
                    <Text color="red.400">
                      Tienes solo {Able.balance} ABLE y necesitas tener minimo{" "}
                      {AbleSale.min_amount_able_to_sell} ABLE para poder
                      publicarlos en la Lista de Ventas.
                    </Text>
                  )
                ) : null}
                {!sellAble ? (
                  canSellTriple() ? (
                    <Text color="red">
                      Puedes publicar desde 9 TRIPLE hasta 90 TRIPLE.
                    </Text>
                  ) : (
                    <Text color="red">
                      Este NFT tiene en venta {nft.selling.triple} TRIPLE
                      {nft.selling.triple > 1 ? "s" : ""}
                    </Text>
                  )
                ) : null}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      ) : null}

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

      {/* Terms & Conditions */}
      <AlertDialog
        isOpen={showTermsConditions}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowTermsConditions(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {"Consentimiento"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text>
                Al realizar esta operación, estoy aceptando el convenio aquí
                establecido.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Link
                isExternal
                href="https://saver-community.gitbook.io/es/"
                color="blue.400"
              >
                Ver Convenio
              </Link>
              <Button
                colorScheme="pink"
                ref={cancelRef}
                onClick={handleSellAble}
                ml={3}
              >
                Acepto
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack
        border="2px"
        bg="yellow.400"
        borderRadius={15}
        minW={{ lg: "550px", md: "550px", sm: "0px", base: "0px" }}
      >
        {!isOwner() ? (
          <>
            <Box h="10px" />

            <HStack w="full">
              <Box w="15px" />
              <Image src={IMG_NFT_TOKEN} alt="nft-image" boxSize="150px" />
              <Spacer />
              {owner ? <Text color="white">No tienes ningun NFT.</Text> : null}
              <Spacer />
            </HStack>
            <Box h="10px" />
            <HStack w="full" borderRadius={15}>
              <Spacer />
              <BuyNFT />
              <Spacer />
            </HStack>
          </>
        ) : (
          <>
            {/* Desktop */}
            <VStack
              display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
            >
              <HStack w="full">
                <Box w="15px" />

                <VStack w="full">
                  <HStack w="full">
                    <Box w="10px" />
                    <VStack>
                      <Text fontSize="25px" color="white">
                        {nft.name}
                      </Text>
                      <Text
                        color="white"
                        fontWeight="black"
                        fontSize="xl"
                        opacity={0.7}
                      >
                        {owner ? getCleanAddress(nft.ownerAddress) : null}
                      </Text>
                    </VStack>
                    <Spacer />
                  </HStack>
                </VStack>

                <Spacer />

                <Image
                  src={nft.imageURL}
                  alt="nft-image"
                  w={{
                    lg: "300px",
                    md: "300px",
                    sm: "100px",
                    base: "75px",
                  }}
                />

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
                      Descripcion: {nft.inscription}
                    </Text>
                  </HStack>

                  <HStack w="full">
                    <Box w="5px" />
                    <Text fontWeight="bold" color="white">
                      Conectado con: {nft.reference}
                    </Text>
                  </HStack>
                  <HStack w="full">
                    <Box w="5px" />
                    <Text fontWeight="bold" color="white">
                      {nft.references.total} Conexiones
                    </Text>
                  </HStack>
                  <VStack w="full" bg="green.600" borderRadius={10}>
                    <Box h="1px" />
                    <HStack w="full">
                      <Box w="5px" />
                      <Text color="white" fontWeight="bold">
                        Recompensas de Afiliacion
                      </Text>
                      <Spacer />
                      <Text fontWeight="bold" color="white">
                        {nft.activeRewardsClaimed} {MAIN_CURRENCY}
                      </Text>
                      <Box w="5px" />
                    </HStack>
                    <Divider />
                    <HStack w="full">
                      <Box w="5px" />
                      <Text color="white" fontWeight="bold">
                        Ventas de ABLE
                      </Text>
                      <Spacer />
                      <Text fontWeight="bold" color="white">
                        {nft.stable_coin_earned_by_able_sale} {MAIN_CURRENCY}
                      </Text>
                      <Box w="5px" />
                    </HStack>
                    <Box h="1px" />
                  </VStack>
                  {nft.selling.able > 0 ? (
                    <HStack w="full">
                      <Box w="5px" />
                      <Text fontWeight="bold" color="white">
                        {nft.selling.able} ABLE Listados para vender
                      </Text>
                    </HStack>
                  ) : null}
                  {isYouTubeLink(nft.valueProposal) ? (
                    <iframe
                      width="355"
                      height="215"
                      src={
                        "https://www.youtube.com/embed/" +
                        getVideoID(nft.valueProposal)
                      }
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <HStack w="full">
                      <Box w="5px" />
                      <Text fontWeight="bold" color="white">
                        Propuesta de valor: {nft.valueProposal}
                      </Text>
                    </HStack>
                  )}
                </VStack>

                <Spacer />

                <VStack>
                  <Box h="20px" />
                  {owner ? <Events wallet={nft.ownerAddress} /> : null}
                  {owner ? <ChooseNFT /> : null}
                  {owner ? <Sells /> : null}
                </VStack>

                <Box w="15px" />
              </HStack>

              {owner ? (
                <>
                  <Divider />

                  <HStack
                    w="full"
                    borderRadius={15}
                    display={{
                      lg: "flex",
                      md: "flex",
                      sm: "none",
                      base: "none",
                    }}
                  >
                    <Spacer />
                    <BuyNFT />
                    <Spacer />
                    {is_selling() ? (
                      loading ? (
                        <Loading />
                      ) : (
                        <Button
                          variant="actionDapp"
                          onClick={handleWithdrawAble}
                        >
                          Retirar ABLEs
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="actionDapp"
                        onClick={() => setSellAble(true)}
                      >
                        Vende ABLE
                      </Button>
                    )}
                    <Box w="10px" />
                    <Spacer />
                  </HStack>

                  {sinergySaleCondition() ? (
                    <Text color="red" fontSize="10px" fontWeight="bold">
                      Para vender tus ABLE debes tener al menos un NFT de
                      Sinergy.
                    </Text>
                  ) : null}
                  {!sinergySaleCondition() &&
                  !canSellAble() &&
                  !is_selling() ? (
                    <Text color="red" fontSize="20px" fontWeight="bold">
                      {"Sólo puede publicar una venta por ciclo."}
                    </Text>
                  ) : null}
                </>
              ) : null}
            </VStack>

            {/* Mobile */}
            <VStack
              display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
            >
              <Image src={nft.imageURL} alt="nft-image" w="250px" />
              <Text fontSize="25px" color="white">
                {nft.name}
              </Text>
              <Text
                color="white"
                fontWeight="black"
                fontSize="xl"
                opacity={0.7}
              >
                {owner ? getCleanAddress(nft.ownerAddress) : null}
              </Text>

              <HStack w="full">
                <Box w="5px" />
                <Text fontWeight="bold" color="white">
                  ID: {nft.id}
                </Text>
              </HStack>
              <HStack w="full">
                <Box w="5px" />
                <Text fontWeight="bold" color="white">
                  Descripcion: {nft.inscription}
                </Text>
              </HStack>
              <HStack w="full">
                <Box w="5px" />
                <Text fontWeight="bold" color="white">
                  Conectado con: {nft.reference}
                </Text>
              </HStack>
              <HStack w="full">
                <Box w="5px" />
                <Text fontWeight="bold" color="white">
                  {nft.references.total} Conexiones
                </Text>
              </HStack>
              <HStack w="full">
                <Box w="5px" />
                <Text fontWeight="bold" color="white">
                  {nft.activeRewardsClaimed} {MAIN_CURRENCY}{" "}
                  {Number(nft.activeRewardsClaimed) > 1 ? "s" : ""} en
                  Recompensas Afiliacion
                </Text>
              </HStack>
              <HStack w="full">
                <Box w="5px" />
                <Text fontWeight="bold" color="white">
                  {nft.stable_coin_earned_by_able_sale} {MAIN_CURRENCY}{" "}
                  {Number(nft.stable_coin_earned_by_able_sale) > 1 ? "s" : ""}{" "}
                  en Venta de ABLE
                </Text>
              </HStack>

              {nft.selling.able > 0 ? (
                <HStack w="full">
                  <Box w="5px" />
                  <Text fontWeight="bold" color="white">
                    {nft.selling.able} ABLE{nft.selling.able > 1 ? "s" : ""}{" "}
                    Listados para vender
                  </Text>
                </HStack>
              ) : null}
              {isYouTubeLink(nft.valueProposal) ? (
                <iframe
                  width="355"
                  height="215"
                  src={
                    "https://www.youtube.com/embed/" +
                    getVideoID(nft.valueProposal)
                  }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <HStack w="full">
                  <Box w="5px" />
                  <Text fontWeight="bold" color="white">
                    Propuesta de valor: {nft.valueProposal}
                  </Text>
                </HStack>
              )}

              <Box h="100px" />

              {owner ? <Events wallet={nft.ownerAddress} /> : null}
              {owner ? <ChooseNFT /> : null}
              {owner ? <Sells /> : null}

              {owner ? (
                <>
                  <Divider />

                  <VStack
                    w="full"
                    borderRadius={15}
                    display={{
                      lg: "none",
                      md: "none",
                      sm: "flex",
                      base: "flex",
                    }}
                  >
                    <HStack w="full">
                      <Spacer />
                      {is_selling() ? (
                        <Button
                          variant="actionDapp"
                          onClick={handleWithdrawAble}
                        >
                          Retirar ABLEs
                        </Button>
                      ) : (
                        <Button
                          variant="actionDapp"
                          onClick={() => setSellAble(true)}
                        >
                          Vende ABLE
                        </Button>
                      )}
                      <Box w="10px" />
                      <Spacer />
                    </HStack>
                    <BuyNFT />
                  </VStack>

                  {sinergySaleCondition() ? (
                    <Text color="red" fontSize="10px" fontWeight="bold">
                      Para vender tus ABLE debes tener al menos un NFT de
                      Sinergy.
                    </Text>
                  ) : null}
                  {!sinergySaleCondition() &&
                  !canSellAble() &&
                  !is_selling() ? (
                    <Text color="red" fontSize="15px" fontWeight="bold">
                      {"Sólo puede publicar una venta por ciclo."}
                    </Text>
                  ) : null}
                </>
              ) : null}
            </VStack>
          </>
        )}
        <Box h="2px" />
      </VStack>
    </>
  );
};
