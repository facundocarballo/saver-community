import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Text,
  Button,
  Divider,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import {
  buildTransaciont,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  TEST_CONTRACT_ADDRESS,
} from "../../web3/funcs";
import { useProvider } from "../../context";
import { Loading } from "./loading";

export const SaverTest = ({ question1, question2, question3 }) => {
  // Attributes
  const [firstAnswer, setFirstAnswer] = React.useState(null);
  const [secondAnswer, setSecondAnswer] = React.useState(null);
  const [thirdAnswer, setThirdAnswer] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [response, setResponse] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const selectColor = "green";
  const optionColor = "gray";

  // Context
  const { Able, addressAccount, uploadVideoTest, Test } = useProvider();

  // Methods
  const getFirstAnswer = () => {
    if (firstAnswer == 0) return question1.answer1;
    if (firstAnswer == 1) return question1.answer2;
    if (firstAnswer == 2) return question1.answer3;

    return null;
  };
  const getSecondAnswer = () => {
    if (secondAnswer == 0) return question2.answer1;
    if (secondAnswer == 1) return question2.answer2;
    if (secondAnswer == 2) return question2.answer3;

    return null;
  };

  const getThirdAnswer = () => {
    if (thirdAnswer == 0) return question3.answer1;
    if (thirdAnswer == 1) return question3.answer2;
    if (thirdAnswer == 2) return question3.answer3;

    return null;
  };

  const handleAnswer = async () => {
    const data = await Test.contract.methods
      .AnswerVideo(
        getFirstAnswer(),
        getSecondAnswer(),
        getThirdAnswer(),
        Test.id
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
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              clearInterval(interval);
              if (
                getFirstAnswer() == Test.video.first_question.answer &&
                getSecondAnswer() == Test.video.second_question.answer &&
                getThirdAnswer() == Test.video.third_question.answer
              ) {
                setResponse(true);
              }
              // Mostrar PopUp
              onOpen();
              await uploadVideoTest();
              setLoading(false);
              
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              setError(true);
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
      {/* Alert Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.800">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              {error
                ? "ERROR"
                : response
                ? "ENHORABUENA!"
                : "RESPUESTAS INCORRECTAS"}
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="white">
                {response ? "Has respondido correctamente el Able Test." : null}
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Saver Test */}
      <VStack w="full" bg="gray.800">
        <HStack w="full">
          <Spacer />
          <Text color="white" fontSize="24px" fontWeight="bold">
            {question1.title}
          </Text>
          <Spacer />
        </HStack>

        <HStack display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}>
          <Spacer />
          <Button
            onClick={() => setFirstAnswer(0)}
            colorScheme={firstAnswer == 0 ? selectColor : optionColor}
          >
            {question1.answer1}
          </Button>
          <Spacer />
          <Button
            onClick={() => setFirstAnswer(1)}
            colorScheme={firstAnswer == 1 ? selectColor : optionColor}
          >
            {question1.answer2}
          </Button>
          <Spacer />
          <Button
            onClick={() => setFirstAnswer(2)}
            colorScheme={firstAnswer == 2 ? selectColor : optionColor}
          >
            {question1.answer3}
          </Button>
          <Spacer />
        </HStack>

        <VStack display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}>
          <Button
            onClick={() => setFirstAnswer(0)}
            colorScheme={firstAnswer == 0 ? selectColor : optionColor}
          >
            {question1.answer1}
          </Button>
          <Button
            onClick={() => setFirstAnswer(1)}
            colorScheme={firstAnswer == 1 ? selectColor : optionColor}
          >
            {question1.answer2}
          </Button>
          <Button
            onClick={() => setFirstAnswer(2)}
            colorScheme={firstAnswer == 2 ? selectColor : optionColor}
          >
            {question1.answer3}
          </Button>
        </VStack>

        <Box h="3px" />
        <Divider />
        <Box h="3px" />

        <HStack w="full">
          <Spacer />
          <Text color="white" fontSize="24px" fontWeight="bold">
            {question2.title}
          </Text>
          <Spacer />
        </HStack>

        <HStack display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}>
          <Spacer />
          <Button
            onClick={() => setSecondAnswer(0)}
            colorScheme={secondAnswer == 0 ? selectColor : optionColor}
          >
            {question2.answer1}
          </Button>
          <Spacer />
          <Button
            onClick={() => setSecondAnswer(1)}
            colorScheme={secondAnswer == 1 ? selectColor : optionColor}
          >
            {question2.answer2}
          </Button>
          <Spacer />
          <Button
            onClick={() => setSecondAnswer(2)}
            colorScheme={secondAnswer == 2 ? selectColor : optionColor}
          >
            {question2.answer3}
          </Button>
          <Spacer />
        </HStack>

        <VStack display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}>
          <Button
            onClick={() => setSecondAnswer(0)}
            colorScheme={secondAnswer == 0 ? selectColor : optionColor}
          >
            {question2.answer1}
          </Button>
          <Button
            onClick={() => setSecondAnswer(1)}
            colorScheme={secondAnswer == 1 ? selectColor : optionColor}
          >
            {question2.answer2}
          </Button>
          <Button
            onClick={() => setSecondAnswer(2)}
            colorScheme={secondAnswer == 2 ? selectColor : optionColor}
          >
            {question2.answer3}
          </Button>
        </VStack>

        <Box h="3px" />
        <Divider />
        <Box h="3px" />

        <HStack w="full">
          <Spacer />
          <Text color="white" fontSize="24px" fontWeight="bold">
            {question3.title}
          </Text>
          <Spacer />
        </HStack>

        <HStack display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}>
          <Spacer />
          <Button
            onClick={() => setThirdAnswer(0)}
            colorScheme={thirdAnswer == 0 ? selectColor : optionColor}
          >
            {question3.answer1}
          </Button>
          <Spacer />
          <Button
            onClick={() => setThirdAnswer(1)}
            colorScheme={thirdAnswer == 1 ? selectColor : optionColor}
          >
            {question3.answer2}
          </Button>
          <Spacer />
          <Button
            onClick={() => setThirdAnswer(2)}
            colorScheme={thirdAnswer == 2 ? selectColor : optionColor}
          >
            {question3.answer3}
          </Button>
          <Spacer />
        </HStack>

        <VStack display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}>
          <Button
            onClick={() => setThirdAnswer(0)}
            colorScheme={thirdAnswer == 0 ? selectColor : optionColor}
          >
            {question3.answer1}
          </Button>
          <Button
            onClick={() => setThirdAnswer(1)}
            colorScheme={thirdAnswer == 1 ? selectColor : optionColor}
          >
            {question3.answer2}
          </Button>
          <Button
            onClick={() => setThirdAnswer(2)}
            colorScheme={thirdAnswer == 2 ? selectColor : optionColor}
          >
            {question3.answer3}
          </Button>
        </VStack>

        <Box h="15px" />

        <HStack w="full">
          <Spacer />
          {loading ? (
            <Loading />
          ) : (
            <Button
              disabled={
                firstAnswer == null ||
                secondAnswer == null ||
                thirdAnswer == null
              }
              variant="actionDapp"
              onClick={handleAnswer}
            >
              CONTESTAR
            </Button>
          )}
        </HStack>
      </VStack>
    </>
  );
};
