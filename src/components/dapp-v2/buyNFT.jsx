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
  Link,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import {
  ABLE_CONTRACT_ADDRESS,
  buildTransaciont,
  MAIN_CURRENCY,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  SINERGY_BRONZE_CONTRACT_ADDRESS,
  STABLE_COIN_CONTRACT_ADDRESS,
} from "../../web3/funcs";
import { Loading } from "./loading";

export const BuyNFT = () => {
  // Attributes
  const [name, setName] = React.useState("");
  const [inscription, setInscription] = React.useState("");
  const [valueProposal, setValueProposal] = React.useState("");

  const [showForm, setShowForm] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [approveBUSD, setApproveBUSD] = React.useState(false);
  const [approveABLE, setApproveABLE] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [showTermsConditions, setShowTermsConditions] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // Context
  const {
    SinergyBronze,
    addressAccount,
    Able,
    StableCoin,
    uploadBuyNFT_Bronze,
  } = useProvider();

  // Methods
  const handleBuyNFT = async () => {
    setShowTermsConditions(false);
    const timestamp = Date.now();

    const data = await SinergyBronze.contract.methods
      .CreateNFT(
        name,
        inscription,
        valueProposal,
        SinergyBronze.nextNFT.jsonURL,
        SinergyBronze.nextNFT.imageURL,
        0, // Zero means that the contract will get a random ref.
        timestamp
      )
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
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              clearInterval(interval);
              await uploadBuyNFT_Bronze();
              setLoading(false);
              setInscription("");
              setName("");
              setValueProposal("");
              setShowForm(false);
              setApproveABLE(false);
              setApproveBUSD(false);
              // Mostrar PopUp
              onOpen();
              // Recargar datos de la blockchain (como si fuera que toca el boton de actualizar)
            }

            if (err) {
              clearInterval(interval);
              setError(true);
              setLoading(false);
              setShowForm(false);
              onOpen();
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const handleApproveStablecoin = async () => {
    const amountWEI = web3.utils.toWei(SinergyBronze.dai_price, "ether");
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
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }
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

  const handleApproveABLE = async () => {
    const amountWEI = web3.utils.toWei(SinergyBronze.able_price, "ether");
    const data = await Able.contract.methods
      .approve(SINERGY_BRONZE_CONTRACT_ADDRESS, amountWEI)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      ABLE_CONTRACT_ADDRESS,
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
          <AlertDialogContent bg="gray.800">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              {error ? "ERROR" : "Creacion Exitosa!!"}
            </AlertDialogHeader>
            <AlertDialogBody>
              {error ? (
                <Text color="white">Error, intentalo nuevamente.</Text>
              ) : null}
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
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.800">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              CREACION DE TU NFT
            </AlertDialogHeader>

            <AlertDialogBody>
              {/* <NFT_IMAGE nft={nft} name={inscription} /> */}

              <HStack w="full">
                <Box w="5px" />
                <Text color="white" fontWeight="bold">
                  Nombre
                </Text>
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Input
                  color="white"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  placeholder="Nombre de tu NFT"
                  w="95%"
                />
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Text color="white" fontWeight="bold">
                  Descripcion
                </Text>
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Input
                  color="white"
                  value={inscription}
                  onChange={(e) => setInscription(e.currentTarget.value)}
                  placeholder="Descripcion de tu NFT"
                  w="95%"
                />
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Text color="white" fontWeight="bold">
                  Propuesta de valor
                </Text>
                <Spacer />
              </HStack>

              <HStack w="full">
                <Box w="5px" />
                <Input
                  color="white"
                  value={valueProposal}
                  onChange={(e) => setValueProposal(e.currentTarget.value)}
                  placeholder="URL que representara a tu propuesta de valor"
                  w="95%"
                />
                <Spacer />
              </HStack>

              <Box h="5px" />

              <Box w="full" h="3px" bg="white" />

              <Box h="5px" />

              <VStack>
                <Heading color="white" fontSize="lg" fontWeight="bold">
                  Previsualizacion del NFT
                </Heading>
                <Box h="5px" />
                <Image
                  src={SinergyBronze.nextNFT.imageURL}
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
                    isDisabled={
                      Number(Able.balance) < Number(SinergyBronze.able_price)
                    }
                  >
                    Aprobar {Number(SinergyBronze.able_price).toFixed(2)} ABLE
                  </Button>
                  {Number(Able.balance) < Number(SinergyBronze.able_price) ? (
                    <Text color="red" fontSize="15px" fontWeight="bold">
                      ABLE INSUFICIENTE
                    </Text>
                  ) : null}
                </>
              ) : !approveBUSD ? (
                <>
                  <Button
                    variant="actionDapp"
                    ref={cancelRef}
                    onClick={handleApproveStablecoin}
                    ml={3}
                    isDisabled={
                      Number(StableCoin.balance) <
                      Number(SinergyBronze.dai_price)
                    }
                  >
                    Aprobar {Number(SinergyBronze.dai_price).toFixed(2)}{" "}
                    {MAIN_CURRENCY}
                  </Button>
                  <Box w="10px" />
                  {Number(StableCoin.balance) <
                  Number(SinergyBronze.dai_price) ? (
                    <Text color="red" fontSize="15px" fontWeight="bold">
                      {MAIN_CURRENCY} INSUFICIENTE
                    </Text>
                  ) : null}
                </>
              ) : (
                <Button
                  variant="actionDapp"
                  ref={cancelRef}
                  onClick={() => setShowTermsConditions(true)}
                  ml={3}
                >
                  CREAR NFT
                </Button>
              )}
            </AlertDialogFooter>
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
          <AlertDialogContent bg="gray.800">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {"Consentimiento"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text color="white">
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
                onClick={handleBuyNFT}
                ml={3}
              >
                Acepto
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Button variant="actionDapp" onClick={() => setShowForm(true)}>
        ADQUIRIR NFT
      </Button>
    </>
  );
};
