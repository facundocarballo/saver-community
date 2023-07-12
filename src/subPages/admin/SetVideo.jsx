import React from "react";
import {
  HStack,
  VStack,
  Heading,
  Button,
  Box,
  Text,
  Input,
  Spacer,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { Loading } from "../../components/dapp-v2/loading";
import { useProvider } from "../../context";
import { TEST_CONTRACT_ADDRESS } from "../../web3/funcs";
import { SaverTest } from "../../components/dapp-v2/saverTest";
import { buildTransaciont } from "../../web3/funcs";

const YOUTUBE_BASIC_URL = "https://youtu.be/";

export const SetVideo = () => {
  // Attributes
  const [videoURL, setVideoURL] = React.useState("");

  // Question 1
  const [firstTitle, setFirstTitle] = React.useState("");
  const [firstRealAnswer, setFirstRealAnswer] = React.useState("");
  const [firstFakeAnwser1, setFirstFakeAnswer1] = React.useState("");
  const [firstFakeAnwser2, setFirstFakeAnswer2] = React.useState("");
  const [firstQuestionAble, setFirstQuestionAble] = React.useState(true);

  // Question 2
  const [secondTitle, setSecondTitle] = React.useState("");
  const [secondRealAnswer, setSecondRealAnswer] = React.useState("");
  const [secondFakeAnwser1, setSecondFakeAnswer1] = React.useState("");
  const [secondFakeAnwser2, setSecondFakeAnswer2] = React.useState("");
  const [secondQuestionAble, setSecondQuestionAble] = React.useState(false);

  // Question 3
  const [thirdTitle, setThirdTitle] = React.useState("");
  const [thirdRealAnswer, setThirdRealAnswer] = React.useState("");
  const [thirdFakeAnwser1, setThirdFakeAnswer1] = React.useState("");
  const [thirdFakeAnwser2, setThirdFakeAnswer2] = React.useState("");
  const [thirdQuestionAble, setThirdQuestionAble] = React.useState(false);

  const [loadingQuestion1, setLoadingQuestion1] = React.useState(false);
  const [loadingQuestion2, setLoadingQuestion2] = React.useState(false);
  const [loadingQuestion3, setLoadingQuestion3] = React.useState(false);

  const [videoError, setVideoError] = React.useState(false);

  // Alert Dialogs
  const [openTest, setOpenTest] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  // Context
  const { Test, addressAccount, setTest } = useProvider();
  // Methods
  const getVideoID = () => videoURL.substring(YOUTUBE_BASIC_URL.length);

  const isButtonAble = () =>
    videoURL != "" &&
    videoURL.includes(YOUTUBE_BASIC_URL) &&
    firstTitle != "" &&
    secondTitle != "" &&
    thirdTitle != "" &&
    firstRealAnswer != "" &&
    secondRealAnswer != "" &&
    thirdRealAnswer != "" &&
    firstFakeAnwser1 != "" &&
    secondFakeAnwser1 != "" &&
    thirdFakeAnwser1 != "" &&
    firstFakeAnwser2 != "" &&
    secondFakeAnwser2 != "" &&
    thirdFakeAnwser2 != "";

  const cleanAll = () => {
    setVideoURL("");
    setFirstTitle("");
    setFirstRealAnswer("");
    setFirstFakeAnswer1("");
    setFirstFakeAnswer2("");
    setFirstQuestionAble("");
    setSecondTitle("");
    setSecondRealAnswer("");
    setSecondFakeAnswer1("");
    setSecondFakeAnswer2("");
    setSecondQuestionAble("");
    setThirdTitle("");
    setThirdRealAnswer("");
    setThirdFakeAnswer1("");
    setThirdFakeAnswer2("");
    setThirdQuestionAble("");
  };

  const handleQuestion1 = async () => {
    const videoID = getVideoID();
    const data = await Test.contract.methods
      .UploadVideoAndFirstQuestion(
        videoID,
        firstTitle,
        firstRealAnswer,
        firstFakeAnwser1,
        firstFakeAnwser2
      )
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      TEST_CONTRACT_ADDRESS,
      data
    );
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoadingQuestion1(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              setLoadingQuestion1(false);
              setSecondQuestionAble(true);
              setFirstQuestionAble(false);
              // Mostrar PopUp
              onOpen();
            }

            if (err) {
              clearInterval(interval);
              setLoadingQuestion1(false);
              setVideoError(true);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
              onOpen();
            }
          });
        }, 500);
      });
  };

  const handleQuestion2 = async () => {
    const data = await Test.contract.methods
      .UploadSecondQuestion(
        secondTitle,
        secondRealAnswer,
        secondFakeAnwser1,
        secondFakeAnwser2
      )
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      TEST_CONTRACT_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoadingQuestion2(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              setLoadingQuestion2(false);
              setSecondQuestionAble(false);
              setThirdQuestionAble(true);
              // Mostrar PopUp
              onOpen();
            }

            if (err) {
              clearInterval(interval);
              setLoadingQuestion2(false);
              setVideoError(true);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
              onOpen();
            }
          });
        }, 500);
      });
  };

  const handleQuestion3 = async () => {
    const data = await Test.contract.methods
      .UploadThirdQuestion(
        thirdTitle,
        thirdRealAnswer,
        thirdFakeAnwser1,
        thirdFakeAnwser2
      )
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      TEST_CONTRACT_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoadingQuestion3(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              setLoadingQuestion3(false);
              setThirdQuestionAble(false);
              cleanAll();
              Test.id_actual++;
              setTest(Test);
              // Mostrar PopUp
              onOpen();
            }

            if (err) {
              clearInterval(interval);
              setLoadingQuestion3(false);
              setVideoError(true);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
              onOpen();
            }
          });
        }, 500);
      });
  };

  // Component
  return (
    <>
      {/* Video Publicado */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {videoError ? "ERROR" : "CARGA EXITOSA"}
            </AlertDialogHeader>
            <AlertDialogBody>
              {videoError ? <Text>Error, intentalo nuevamente.</Text> : null}
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

      {/* Ver video test */}
      <AlertDialog
        isOpen={openTest}
        leastDestructiveRef={cancelRef}
        onClose={() => setOpenTest(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ABLE TEST
            </AlertDialogHeader>
            <AlertDialogBody>
              <SaverTest
                question1={{
                  title: firstTitle,
                  answer1: firstRealAnswer,
                  answer2: firstFakeAnwser1,
                  answer3: firstFakeAnwser2,
                }}
                question2={{
                  title: secondTitle,
                  answer1: secondRealAnswer,
                  answer2: secondFakeAnwser1,
                  answer3: secondFakeAnwser2,
                }}
                question3={{
                  title: thirdTitle,
                  answer1: thirdRealAnswer,
                  answer2: thirdFakeAnwser1,
                  answer3: thirdFakeAnwser2,
                }}
              />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <HStack w="full">
        <Spacer />
        <Heading color="white">Agregar Video (ID: {Test.id_actual})</Heading>
        <Spacer />
      </HStack>

      <Input
        value={videoURL}
        onChange={(e) => setVideoURL(e.currentTarget.value)}
        placeholder="Video videoURL"
        w={{ lg: "50%", md: "70%", sm: "95%", base: "96%" }}
        color="white"
      />

      {/* Desktop */}
      <HStack
        w="full"
        display={{ lg: "flex", md: "none", sm: "none", base: "none" }}
      >
        <Box w="10px" />

        <VStack w="full">
          <Text color="white" fontSize="20px" fontWeight="bold">
            Pregunta 1
          </Text>

          <Input
            value={firstTitle}
            onChange={(e) => setFirstTitle(e.currentTarget.value)}
            placeholder="Pregunta"
            color="white"
          />
          <Input
            value={firstRealAnswer}
            onChange={(e) => setFirstRealAnswer(e.currentTarget.value)}
            placeholder="Respuesta Correcta"
            color="white"
          />
          <Input
            value={firstFakeAnwser1}
            onChange={(e) => setFirstFakeAnswer1(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 1"
            color="white"
          />
          <Input
            value={firstFakeAnwser2}
            onChange={(e) => setFirstFakeAnswer2(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 2"
            color="white"
          />

          {loadingQuestion1 ? (
            <Loading />
          ) : (
            <Button
              disabled={!firstQuestionAble}
              variant="actionDapp"
              onClick={handleQuestion1}
            >
              Agregar Pregunta 1
            </Button>
          )}
        </VStack>

        <Spacer />

        <VStack w="full">
          <Text color="white" fontSize="20px" fontWeight="bold">
            Pregunta 2
          </Text>

          <Input
            value={secondTitle}
            onChange={(e) => setSecondTitle(e.currentTarget.value)}
            placeholder="Pregunta"
            color="white"
          />
          <Input
            value={secondRealAnswer}
            onChange={(e) => setSecondRealAnswer(e.currentTarget.value)}
            placeholder="Respuesta Correcta"
            color="white"
          />
          <Input
            value={secondFakeAnwser1}
            onChange={(e) => setSecondFakeAnswer1(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 1"
            color="white"
          />
          <Input
            value={secondFakeAnwser2}
            onChange={(e) => setSecondFakeAnswer2(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 2"
            color="white"
          />

          {loadingQuestion2 ? (
            <Loading />
          ) : (
            <Button
              disabled={!secondQuestionAble}
              variant="actionDapp"
              onClick={handleQuestion2}
            >
              Agregar Pregunta 2
            </Button>
          )}
        </VStack>

        <Spacer />

        <VStack w="full">
          <Text color="white" fontSize="20px" fontWeight="bold">
            Pregunta 3
          </Text>
          <Input
            value={thirdTitle}
            onChange={(e) => setThirdTitle(e.currentTarget.value)}
            placeholder="Pregunta"
            color="white"
          />
          <Input
            value={thirdRealAnswer}
            onChange={(e) => setThirdRealAnswer(e.currentTarget.value)}
            placeholder="Respuesta Correcta"
            color="white"
          />
          <Input
            value={thirdFakeAnwser1}
            onChange={(e) => setThirdFakeAnswer1(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 1"
            color="white"
          />
          <Input
            value={thirdFakeAnwser2}
            onChange={(e) => setThirdFakeAnswer2(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 2"
            color="white"
          />
          {loadingQuestion3 ? (
            <Loading />
          ) : (
            <Button
              disabled={!thirdQuestionAble}
              variant="actionDapp"
              onClick={handleQuestion3}
            >
              Agregar Pregunta 3
            </Button>
          )}
        </VStack>

        <Spacer />

        <Box w="10px" />
      </HStack>

      {/* Mobile */}
      <VStack
        w="full"
        display={{ lg: "none", md: "flex", sm: "flex", base: "flex" }}
      >
        <VStack w="full">
          <Text color="white" fontSize="20px" fontWeight="bold">
            Pregunta 1
          </Text>

          <Input
            value={firstTitle}
            onChange={(e) => setFirstTitle(e.currentTarget.value)}
            placeholder="Pregunta"
            color="white"
          />
          <Input
            value={firstRealAnswer}
            onChange={(e) => setFirstRealAnswer(e.currentTarget.value)}
            placeholder="Respuesta Correcta"
            color="white"
          />
          <Input
            value={firstFakeAnwser1}
            onChange={(e) => setFirstFakeAnswer1(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 1"
            color="white"
          />
          <Input
            value={firstFakeAnwser2}
            onChange={(e) => setFirstFakeAnswer2(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 2"
            color="white"
          />

          {loadingQuestion1 ? (
            <Loading />
          ) : (
            <Button
              disabled={!firstQuestionAble}
              variant="actionDapp"
              onClick={handleQuestion1}
            >
              Agregar Pregunta 1
            </Button>
          )}
        </VStack>

        <Spacer />

        <VStack w="full">
          <Text fontSize="20px" fontWeight="bold" color="white">
            Pregunta 2
          </Text>

          <Input
            value={secondTitle}
            onChange={(e) => setSecondTitle(e.currentTarget.value)}
            placeholder="Pregunta"
            color="white"
          />
          <Input
            value={secondRealAnswer}
            onChange={(e) => setSecondRealAnswer(e.currentTarget.value)}
            placeholder="Respuesta Correcta"
            color="white"
          />
          <Input
            value={secondFakeAnwser1}
            onChange={(e) => setSecondFakeAnswer1(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 1"
            color="white"
          />
          <Input
            value={secondFakeAnwser2}
            onChange={(e) => setSecondFakeAnswer2(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 2"
            color="white"
          />

          {loadingQuestion2 ? (
            <Loading />
          ) : (
            <Button
              disabled={!secondQuestionAble}
              variant="actionDapp"
              onClick={handleQuestion2}
            >
              Agregar Pregunta 2
            </Button>
          )}
        </VStack>

        <Spacer />

        <VStack w="full">
          <Text fontSize="20px" fontWeight="bold" color="white">
            Pregunta 3
          </Text>
          <Input
            value={thirdTitle}
            onChange={(e) => setThirdTitle(e.currentTarget.value)}
            placeholder="Pregunta"
            color="white"
          />
          <Input
            value={thirdRealAnswer}
            onChange={(e) => setThirdRealAnswer(e.currentTarget.value)}
            placeholder="Respuesta Correcta"
            color="white"
          />
          <Input
            value={thirdFakeAnwser1}
            onChange={(e) => setThirdFakeAnswer1(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 1"
            color="white"
          />
          <Input
            value={thirdFakeAnwser2}
            onChange={(e) => setThirdFakeAnswer2(e.currentTarget.value)}
            placeholder="Respuesta Incorrecta 2"
            color="white"
          />
          {loadingQuestion3 ? (
            <Loading />
          ) : (
            <Button
              disabled={!thirdQuestionAble}
              variant="actionDapp"
              onClick={handleQuestion3}
            >
              Agregar Pregunta 3
            </Button>
          )}
        </VStack>
      </VStack>

      {isButtonAble() ? (
        <VStack>
          <Heading color="white">Previsualizacion</Heading>
          <iframe
            width="555"
            height="315"
            src={"https://www.youtube.com/embed/" + getVideoID(videoURL)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Button onClick={() => setOpenTest(true)}>Contestar Test</Button>
        </VStack>
      ) : null}
    </>
  );
};
