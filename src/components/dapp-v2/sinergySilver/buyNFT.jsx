import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Text,
  Button,
  Box,
  Image,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { useProvider } from "../../../context";
import {
  buildTransaciont,
  CDA_CONTRACT_ADDRESS,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  SINERGY_SILVER_ADDRESS,
  STABLE_COIN_CONTRACT_ADDRESS,
} from "../../../web3/funcs";
import { IMG_NFT_SINERGY_SILVER } from "../../../images";
import { Loading } from "../loading";

export const BuyNFT = () => {
  const PRICE = 30;
  // Attributes
  const [name, setName] = React.useState("");
  const [inscription, setInscription] = React.useState("");
  const [valueProposal, setValueProposal] = React.useState("");

  const [base, setBase] = React.useState(null);
  const [border, setBorder] = React.useState(null);
  const [center, setCenter] = React.useState(null);
  const [font, setFont] = React.useState(null);
  const [ornament, setOrnament] = React.useState(null);

  const [showForm, setShowForm] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [approveBUSD, setApproveBUSD] = React.useState(false);
  const [approveCDA, setApproveCDA] = React.useState(false);
  const [approveABLE, setApproveABLE] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  React.useEffect(() => {
    getNftProperties();
  }, []);

  // Context
  const {
    SinergySilver,
    addressAccount,
    CDA,
    Able,
    StableCoin,
    uploadBuyNFT_Silver,
    Qualified
  } = useProvider();

  // Methods
  const getNftProperties = () => {
    const ba = Number(Math.trunc(Math.random() * 8));
    const bor = Number(Math.trunc(Math.random() * 8));
    const cen = Number(Math.trunc(Math.random() * 8));
    const fon = Number(Math.trunc(Math.random() * 8));
    const orn = Number(Math.trunc(Math.random() * 8));

    setBase(ba);
    setBorder(bor);
    setCenter(cen);
    setFont(fon);
    setOrnament(orn);
  };

  const handleBuyNFT = async () => {
    const timestamp = Date.now();

    const data = await SinergySilver.contract.methods
      .createNFT(
        name,
        inscription,
        valueProposal,
        SinergySilver.nextNFT.jsonURL,
        SinergySilver.nextNFT.imageURL,
        timestamp
      )
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
            window.document.getElementById('loading').innerHTML = "Esperando confirmacion de Red...";
            if (err) {
              clearInterval(interval);
              setError(true);
              setLoading(false);
              setShowForm(false);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
            
            if (rec) {
              clearInterval(interval);
              await uploadBuyNFT_Silver();
              setLoading(false);
              setInscription("");
              setName("");
              setValueProposal("");
              setShowForm(false);
              setApproveABLE(false);
              setApproveCDA(false);
              setApproveBUSD(false);
              // Mostrar PopUp
              onOpen();
              // Recargar datos de la blockchain (como si fuera que toca el boton de actualizar)
            }
          });
        }, 500);
      });
  };

  const handleApproveBUSD = async () => {
    const amountWEI = web3.utils.toWei(PRICE.toString(), "ether");
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
            window.document.getElementById('loading').innerHTML = "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
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
    const amountWEI = web3.utils.toWei(PRICE.toString(), "ether");
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
            window.document.getElementById('loading').innerHTML = "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
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
    const amountWEI = web3.utils.toWei(PRICE.toString(), "ether");
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
            window.document.getElementById('loading').innerHTML = "Esperando confirmacion de Red...";
            if (rec) {
              clearInterval(interval);
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

  const nft = {
    properties: {
      base: base,
      border: border,
      center: center,
      font: font,
      ornament: ornament,
    },
  };

  // Componet
  return (
    <>
      {/* Alerta Creacion Exitosa o Erronea del NFT */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg='gray.700'>
            <AlertDialogHeader color='white' fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Creacion Exitosa!!"}
            </AlertDialogHeader>
            <AlertDialogBody>
              {error ? <Text color='white'>Error, intentalo nuevamente.</Text> : null}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="pink"
                ref={cancelRef}
                onClick={onClose}
                ml={3}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Formulario de Inscripcion */}
      <AlertDialog
        isOpen={showForm}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowForm(false)}
      >
        <AlertDialogOverlay >
          <AlertDialogContent bg='gray.700'>
            <AlertDialogHeader color='white' fontSize="lg" fontWeight="bold">
              CREACION DE TU NFT
            </AlertDialogHeader>

            <AlertDialogBody>
              {/* <NFT_IMAGE nft={nft} name={inscription} /> */}

              <HStack w="full">
                <Box w="5px" />
                <Text color='white' fontWeight="bold">Nombre</Text>
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  placeholder="Nombre de tu NFT"
                  w="95%"
                  color='white'
                />
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Text color='white' fontWeight="bold">Descripcion</Text>
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Input
                  value={inscription}
                  onChange={(e) => setInscription(e.currentTarget.value)}
                  placeholder="Descripcion de tu NFT"
                  w="95%"
                  color='white'
                />
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Text color='white' fontWeight="bold">Propuesta de valor</Text>
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Input
                  value={valueProposal}
                  onChange={(e) => setValueProposal(e.currentTarget.value)}
                  placeholder="URL que representara a tu propuesta de valor"
                  w="95%"
                  color='white'
                />
                <Spacer />
              </HStack>

              <Box h="5px" />

              <Box w="full" h="3px" bg="white" />

              <Box h="5px" />

              <VStack>
                <Heading fontSize="lg" fontWeight="bold" color="white">
                  Previsualizacion del NFT
                </Heading>
                <Box h="5px" />
                <Image
                  src={SinergySilver.nextNFT.imageURL}
                  alt="nft-image"
                  w="300px"
                />
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              {loading ? (
                <Loading />
              ) : !approveABLE ? (
                <>
                  <Button
                    variant="actionDapp"
                    ref={cancelRef}
                    onClick={handleApproveABLE}
                    ml={3}
                    isDisabled={Number(Able.balance) < PRICE}
                  >
                    Aprobar {PRICE} ABLE
                  </Button>
                  {Number(Able.balance) < PRICE ? (
                    <Text color="red">
                      No tienes suficientes ABLE para adquirir un NFT.
                    </Text>
                  ) : null}
                </>
              ) : !approveCDA ? (
                <>
                  <Button
                    variant="actionDapp"
                    ref={cancelRef}
                    onClick={handleApproveCDA}
                    ml={3}
                    isDisabled={Number(CDA.balance) < PRICE}
                  >
                    Aprobar {PRICE} CDA
                  </Button>
                  {Number(CDA.balance) < PRICE ? (
                    <Text color="red">
                      No tienes suficientes CDA para adquirir un NFT.
                    </Text>
                  ) : null}
                </>
              ) : !approveBUSD ? (
                <>
                  <Button
                    variant="actionDapp"
                    ref={cancelRef}
                    onClick={handleApproveBUSD}
                    ml={3}
                    isDisabled={Number(StableCoin.balance) < PRICE}
                  >
                    Aprobar {PRICE} BUSD
                  </Button>
                  {Number(StableCoin.balance) < PRICE ? (
                    <Text color="red">
                      No tienes suficientes BUSD para adquirir un NFT.
                    </Text>
                  ) : null}
                </>
              ) : (
                <Button
                  variant="actionDapp"
                  ref={cancelRef}
                  onClick={handleBuyNFT}
                  ml={3}
                >
                  CREAR NFT
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack>
        <Box h={{ lg: "35px", md: "35px", sm: "0px", base: "0px" }} />

        <Image src={IMG_NFT_SINERGY_SILVER} alt="nftImage" boxSize="200px" />

        <Box h="10px" />

        <Button variant="actionDapp" onClick={() => setShowForm(true)} isDisabled={!Qualified.info.userQualified}>
          ADQUIRIR NFT
        </Button>
      </VStack>
    </>
  );
};
