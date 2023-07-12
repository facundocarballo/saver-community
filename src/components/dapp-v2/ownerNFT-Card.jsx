import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Text,
  Heading,
  Image,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { IMG_NFT_TOKEN } from "../../images";
import {
  buildTransaciont,
  CDA_CONTRACT_ADDRESS,
  MAIN_CURRENCY,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  SINERGY_BRONZE_CONTRACT_ADDRESS,
  STABLE_COIN_CONTRACT_ADDRESS,
  URL_WEB,
} from "../../web3/funcs";
import { Loading } from "./loading";

export const OwnerNFT_Card = ({ nft }) => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const [approveBUSD, setApproveBUSD] = React.useState(false);
  const [approveCDA, setApproveCDA] = React.useState(false);
  const [approveABLE, setApproveABLE] = React.useState(false);

  const toast = useToast();

  const [showEditNFT, setShowEditNFT] = React.useState(false);
  const [name, setName] = React.useState("");
  const [inscription, setInscription] = React.useState("");
  const [valueProposal, setValueProposal] = React.useState("");
  const cancelRef = React.useRef();

  const borderColor = "gray.500";
  // Context
  const {
    addressAccount,
    SinergyBronze,
    handleWeb3,
    CDA,
    Able,
    StableCoin,
    ValueReward,
    ConfidenceReward,
    ConstancyReward,
  } = useProvider();

  // Methods

  const handleCopyToClipboard = async (textToCopy) => {
    await navigator.clipboard.writeText(textToCopy);
    const elem = document.createElement("textarea");
    elem.value = textToCopy;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);

    toast({
      title: "Copiado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditNFT = async () => {
    const data = await SinergyBronze.contract.methods
      .modifyNFT(name, inscription, valueProposal, nft.id)
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      SINERGY_BRONZE_CONTRACT_ADDRESS,
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
            if (rec) {
              clearInterval(interval);
              await handleWeb3();
              setLoading(false);
              setShowEditNFT(false);
            }

            if (err) {
              clearInterval(interval);
              setShowEditNFT(false);
              setLoading(false);
            }
          });
        }, 500);
      });
  };

  const handleApproveBUSD = async () => {
    const amountWEI = web3.utils.toWei("36", "ether");
    const data = await StableCoin.contract.methods
      .approve(SINERGY_BRONZE_CONTRACT_ADDRESS, amountWEI)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      STABLE_COIN_CONTRACT_ADDRESS,
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
            if (rec) {
              clearInterval(interval);
              await handleWeb3();
              setApproveBUSD(true);
              setLoading(false);
            }

            if (err) {
            }
          });
        }, 500);
      });
  };

  const handleApproveCDA = async () => {
    const amountWEI = web3.utils.toWei("3", "ether");
    const data = await CDA.contract.methods
      .approve(SINERGY_BRONZE_CONTRACT_ADDRESS, amountWEI)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      CDA_CONTRACT_ADDRESS,
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
            if (rec) {
              clearInterval(interval);
              await handleWeb3();
              setApproveCDA(true);
              setLoading(false);
            }

            if (err) {
              clearInterval(interval);
            }
          });
        }, 500);
      });
  };

  const handleApproveABLE = async () => {
    const amountWEI = web3.utils.toWei("3", "ether");
    const data = await Able.contract.methods
      .approve(SINERGY_BRONZE_CONTRACT_ADDRESS, amountWEI)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      SAVER_TOKEN_CONTRACT_ADDRESS,
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
            if (rec) {
              clearInterval(interval);
              await handleWeb3();
              setApproveABLE(true);
              setLoading(false);
            }

            if (err) {
              clearInterval(interval);
            }
          });
        }, 500);
      });
  };

  const isURL = (str) => {
    return String(str).startsWith("https://");
  };

  const GetTotalAmountEarned = () => {
    const value = Number(ValueReward.amount_earned);
    const confidence = Number(ConfidenceReward.amount_earned);
    const constancy = Number(ConstancyReward.amount_earned);

    return (value + confidence + constancy).toFixed(2);
  };

  // Component
  return (
    <>
      <AlertDialog
        isOpen={showEditNFT}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowEditNFT(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              EDITA TU NFT
            </AlertDialogHeader>
            <AlertDialogBody>
              <HStack w="full">
                <Box w="10px" />
                <Text>Nombre</Text>
                <Spacer />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  placeholder="Nombre del NFT"
                  w="full"
                />
                <Box w="15px" />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Text>Inscripcion</Text>
                <Spacer />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Input
                  value={inscription}
                  onChange={(e) => setInscription(e.currentTarget.value)}
                  placeholder="Inscripcion del NFT"
                  w="full"
                />
                <Box w="15px" />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Text>Propuesta de valor</Text>
                <Spacer />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Input
                  value={valueProposal}
                  onChange={(e) => setValueProposal(e.currentTarget.value)}
                  placeholder="Propuesta de valor del NFT"
                  w="full"
                />
                <Box w="15px" />
              </HStack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <VStack w="full">
                <HStack w="full">
                  <Text>
                    Editar tu NFT tiene un coste de 36 {MAIN_CURRENCY}
                  </Text>
                  <Spacer />
                </HStack>
                <HStack w="full">
                  <Spacer />
                  {loading ? (
                    <Loading />
                  ) : !approveBUSD ? (
                    <Button variant="actionDapp" onClick={handleApproveBUSD}>
                      APROBAR 36 {MAIN_CURRENCY}
                    </Button>
                  ) : (
                    <Button variant="actionDapp" onClick={handleEditNFT}>
                      EDITAR
                    </Button>
                  )}
                </HStack>
              </VStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Desktop */}
      <VStack
        w="full"
        display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
        bg="black"
        border="4px"
        borderColor={borderColor}
        borderRadius={10}
      >
        <HStack w="full">
          <Box w="5px" />
          <Image src={nft.imageURL} alt="nft-image" w="200px" />
          <VStack>
            <Heading color="white">ID</Heading>
            <Heading color="white">{nft.id}</Heading>
          </VStack>

          <Box w="35px" />
          <Box w="1px" h="200px" bg={borderColor} />

          <VStack w="full">
            <Heading color="blue.400">{nft.name}</Heading>
            <Text color={borderColor}>{nft.inscription}</Text>
            <HStack w="full">
              <Box w="5px" />
              <Heading color="white">Conectado con: {nft.reference}</Heading>
              <Spacer />
              <Heading color="white">Creado el: {nft.dateCreated}</Heading>
              <Box w="5px" />
            </HStack>
            <HStack w="full">
              <Spacer />
              <Link
                isExternal
                href={
                  isURL(nft.valueProposal)
                    ? nft.valueProposal
                    : `${URL_WEB}/dapp/sinergyBronze/buyNFT/${nft.id}`
                }
                color="white"
                fontWeight="bold"
              >
                VER PROPUESTA (URL)
              </Link>
              <Box w="5px" />
            </HStack>
          </VStack>
        </HStack>

        <Box w="full" h="1px" bg={borderColor} />

        <HStack w="full">
          <Box w="5px" />
          <Heading color="white">
            Ganacias de Afiliacion: {nft.activeRewardsClaimed} {MAIN_CURRENCY}
          </Heading>
          <Spacer />
        </HStack>
        <HStack w="full">
          <Box w="5px" />
          <Heading color="white">
            Ganacias de Botes (Valor, Confianza y Constancia):{" "}
            {GetTotalAmountEarned()} {MAIN_CURRENCY}
          </Heading>
        </HStack>
        <HStack w="full">
          <Box w="5px" />
          <Heading color="white">
            NFTs Conectados: {nft.references.total}
          </Heading>
        </HStack>
        <Box h="5px" />
        <Box w="full" h="1px" bg={borderColor} />
        <Box h="5px" />
        <HStack w="full">
          <Spacer />
          <HStack
            cursor="pointer"
            onClick={() =>
              handleCopyToClipboard(
                `${URL_WEB}/dapp/sinergyBronze/buyNFT/${nft.id}`
              )
            }
            _hover={{
              transform: "scale(1.10)",
            }}
          >
            <Text color="white" fontWeight="bold">
              LINK DE REFERENCIA
            </Text>
            <Image
              src="https://i.ibb.co/k954cF5/copy-white.png"
              alt="copy-white"
              boxSize="30px"
            />
          </HStack>
          <Box w="10px" />
          <HStack
            cursor="pointer"
            onClick={() => setShowEditNFT(true)}
            _hover={{
              transform: "scale(1.20)",
            }}
          >
            <Image
              src="https://i.ibb.co/bzwLnhX/edit-white.png"
              alt="edit-white"
              boxSize="30px"
            />
            <Text color="white" fontWeight="bold">
              EDITAR NFT
            </Text>
          </HStack>
          <Box w="10px" />
        </HStack>
        <Box h="5px" />
      </VStack>

      {/* Mobile */}
      <VStack
        w="full"
        display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
        bg="black"
        border="4px"
        borderColor={borderColor}
        borderRadius={10}
      >
        <VStack w="full">
          <Box w="5px" />
          <HStack w="full">
            <Image src={nft.imageURL} alt="nft-image" w="150px" />
            <Spacer />
            <Heading color="white">ID:</Heading>
            <Heading color="white">{nft.id}</Heading>
            <Spacer />
          </HStack>

          <Box w="35px" />
          <Box w="full" h="2px" bg={borderColor} />

          <VStack w="full">
            <Heading color="blue.400">{nft.name}</Heading>
            <Text color={borderColor}>{nft.inscription}</Text>
            <VStack w="full">
              <Box w="5px" />
              <Heading color="white">
                Conectado con: {nft.directReferenceNFT}
              </Heading>
              <Spacer />
              <Heading color="white">Creado el: {nft.dateCreated}</Heading>
              <Box w="5px" />
            </VStack>
            <HStack w="full">
              <Spacer />
              <Link
                isExternal
                href={
                  isURL(nft.valueProposal)
                    ? nft.valueProposal
                    : `${URL_WEB}/dapp/sinergyBronze/buyNFT/${nft.id}`
                }
                color="white"
                fontWeight="bold"
              >
                VER PROPUESTA (URL)
              </Link>
              <Box w="5px" />
            </HStack>
          </VStack>
        </VStack>

        <Box w="full" h="1px" bg={borderColor} />

        <HStack w="full">
          <Box w="5px" />
          <Heading color="white">
            Ganacias de Afiliacion: {nft.activeRewardsClaimed} {MAIN_CURRENCY}
          </Heading>
          <Spacer />
        </HStack>
        <HStack w="full">
          <Box w="5px" />
          <Heading color="white">
            Ganacias de Botes (Valor, Confianza y Constancia):{" "}
            {GetTotalAmountEarned()} {MAIN_CURRENCY}
          </Heading>
        </HStack>
        <HStack w="full">
          <Box w="5px" />
          <Heading color="white">
            NFTs Conectados: {nft.references.total}
          </Heading>
        </HStack>
        <Box h="5px" />
        <Box w="full" h="1px" bg={borderColor} />
        <Box h="5px" />
        <HStack
          w="full"
          display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
        >
          <Spacer />
          <VStack w="full">
            <Text color="white">Link de Referencia</Text>
            <Box h="15px" />
            <Text color="white">
              {URL_WEB}/dapp/sinergyBronze/buyNFT/{nft.id}
            </Text>
          </VStack>
          <Box w="10px" />
          <HStack
            cursor="pointer"
            onClick={() => setShowEditNFT(true)}
            _hover={{
              transform: "scale(1.20)",
            }}
          >
            <Image
              src="https://i.ibb.co/bzwLnhX/edit-white.png"
              alt="edit-white"
              boxSize="30px"
            />
            <Text color="white" fontWeight="bold">
              EDITAR NFT
            </Text>
          </HStack>
          <Box w="10px" />
        </HStack>
        <VStack
          w="full"
          display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
        >
          <Text color="white">Link de Referencia</Text>
          <Box h="15px" />
          <Text color="white">
            {URL_WEB}/dapp/sinergyBronze/buyNFT/{nft.id}
          </Text>
          <Box h="10px" />
          <HStack
            cursor="pointer"
            onClick={() => setShowEditNFT(true)}
            _hover={{
              transform: "scale(1.20)",
            }}
          >
            <Image
              src="https://i.ibb.co/bzwLnhX/edit-white.png"
              alt="edit-white"
              boxSize="30px"
            />
            <Text color="white" fontWeight="bold">
              EDITAR NFT
            </Text>
          </HStack>
          <Box w="10px" />
        </VStack>
        <Box h="5px" />
      </VStack>
    </>
  );
};
