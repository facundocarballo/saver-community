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
import { useProvider } from "../../../context";
import { IMG_NFT_TOKEN } from "../../../images";
import {
  buildTransaciont,
  CDA_CONTRACT_ADDRESS,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  SINERGY_SILVER_ADDRESS,
  STABLE_COIN_CONTRACT_ADDRESS,
  URL_WEB,
} from "../../../web3/funcs";
import { Loading } from "../loading";

export const OwnerNFT_Card = ({ nft }) => {
  const PRICE = "30";
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
  const { addressAccount, SinergySilver, handleWeb3, CDA, Able, StableCoin } =
    useProvider();

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
    const amountWEI = web3.utils.toWei(PRICE, "ether");
    const data = await StableCoin.contract.methods
      .approve(SINERGY_SILVER_ADDRESS, amountWEI)
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
    const amountWEI = web3.utils.toWei(PRICE, "ether");
    const data = await CDA.contract.methods
      .approve(SINERGY_SILVER_ADDRESS, amountWEI)
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
    const amountWEI = web3.utils.toWei(PRICE, "ether");
    const data = await Able.contract.methods
      .approve(SINERGY_SILVER_ADDRESS, amountWEI)
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
                    Editar tu NFT tiene un coste de 3 BUSD, 3 CDA y 3 ABLE
                  </Text>
                  <Spacer />
                </HStack>
                <HStack w="full">
                  <Spacer />
                  {loading ? (
                    <Loading />
                  ) : !approveBUSD ? (
                    <Button variant="actionDapp" onClick={handleApproveBUSD}>
                      APROBAR 3 BUSD
                    </Button>
                  ) : !approveABLE ? (
                    <Button variant="actionDapp" onClick={handleApproveABLE}>
                      APROBAR 3 ABLE
                    </Button>
                  ) : !approveCDA ? (
                    <Button variant="actionDapp" onClick={handleApproveCDA}>
                      APROBAR 3 CDA
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
        display={{ lg: "flex", md: "flex", sm: "flex", base: "none" }}
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
              <Heading color="white">
                Conectado con: {nft.directReferenceNFT}
              </Heading>
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
                    : `${URL_WEB}/dapp/buyNFT/${nft.id}`
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
            Ganacias Activas: {nft.activeRewardsClaimed} BUSD
          </Heading>
          <Spacer />
        </HStack>
        <HStack w="full">
          <Box w="5px" />
          <Heading color="white">
            Ganacias Pasivas:{" "}
            {SinergySilver.rewards.passiveReward.actual.claimed} BUSD
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
          <Image
            src="https://i.ibb.co/bzwLnhX/edit-white.png"
            alt="edit-white"
            boxSize="30px"
            cursor="pointer"
            onClick={() => setShowEditNFT(true)}
            _hover={{
              transform: "scale(1.30)",
            }}
          />
          <Box w="10px" />
        </HStack>
        <Box h="5px" />
      </VStack>

      {/* Mobile */}
      <VStack
        w="full"
        display={{ lg: "none", md: "none", sm: "none", base: "flex" }}
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
                    : `${URL_WEB}/dapp/buyNFT/${nft.id}`
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
            Ganacias Activas: {nft.activeRewardsClaimed} BUSD
          </Heading>
          <Spacer />
        </HStack>
        <HStack w="full">
          <Box w="5px" />
          <Heading color="white">
            Ganacias Pasivas:{" "}
            {SinergySilver.rewards.passiveReward.actual.claimed} BUSD
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
          <Image
            src="https://i.ibb.co/bzwLnhX/edit-white.png"
            alt="edit-white"
            boxSize="30px"
            cursor="pointer"
            onClick={() => setShowEditNFT(true)}
            _hover={{
              transform: "scale(1.30)",
            }}
          />
          <Box w="10px" />
        </HStack>
        <Box h="5px" />
      </VStack>
    </>
  );
};
