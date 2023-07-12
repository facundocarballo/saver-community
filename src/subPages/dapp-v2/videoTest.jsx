import React from "react";
import {
  HStack,
  VStack,
  Spacer,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Link,
  Box,
} from "@chakra-ui/react";
import { SaverTest } from "../../components/dapp-v2/saverTest";
import { useProvider } from "../../context";
import { Loading } from "../../components/dapp-v2/loading";

export const VideoTest = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => {
    Test.video = null;
    setTest(Test);
    setIsOpen(false);
  };

  const cancelRef = React.useRef();

  // Context
  const { loadVideoTestInfo, Test, setTest } = useProvider();

  // Methods
  const handleShowVideoTest = async () => {
    setLoading(true);
    await loadVideoTestInfo();
    onOpen();
    setLoading(false);
  };

  const GetQuestionObj = (obj) => {
    const random = Math.floor(Math.random() * 5);
    switch (random) {
      case 0:
        return {
          title: obj.question,
          answer1: obj.answer,
          answer2: obj.fake_answer_1,
          answer3: obj.fake_answer_2,
        };
      case 1:
        return {
          title: obj.question,
          answer1: obj.fake_answer_1,
          answer2: obj.answer,
          answer3: obj.fake_answer_2,
        };
      case 2:
        return {
          title: obj.question,
          answer1: obj.fake_answer_1,
          answer2: obj.fake_answer_2,
          answer3: obj.answer,
        };
      case 3:
        return {
          title: obj.question,
          answer1: obj.answer,
          answer2: obj.fake_answer_2,
          answer3: obj.fake_answer_1,
        };
      case 4:
        case 3:
          return {
            title: obj.question,
            answer1: obj.fake_answer_2,
            answer2: obj.answer,
            answer3: obj.fake_answer_1,
          };
      default:
        break;
    }

    
  };

  // Component
  return (
    <>
      {Test.video == null ? (
        <HStack w="full">
          <Spacer />
          <VStack
            w="full"
            display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
          >
            <iframe
              width="555"
              height="315"
              src={"https://www.youtube.com/embed/" + Test.youtube_id}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {loading ? (
              <Loading />
            ) : (
              <Button variant="actionDapp" onClick={handleShowVideoTest}>
                Constestar Test
              </Button>
            )}
          </VStack>

          <VStack
            w="full"
            display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
          >
            <Box h="10px" />
            <iframe
              width="90%"
              height="315"
              src={"https://www.youtube.com/embed/" + Test.youtube_id}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {loading ? (
              <Loading />
            ) : (
              <Button variant="actionDapp" onClick={handleShowVideoTest}>
                Constestar Test
              </Button>
            )}
          </VStack>
          <Spacer />
        </HStack>
      ) : (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          size="4xl"
        >
          <AlertDialogOverlay>
            <AlertDialogContent bg="gray.800">
              <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
                Saver Test
              </AlertDialogHeader>

              <AlertDialogBody>
                <SaverTest
                  question1={GetQuestionObj(Test.video.first_question)}
                  question2={GetQuestionObj(Test.video.second_question)}
                  question3={GetQuestionObj(Test.video.third_question)}
                />
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  colorScheme="pink"
                  ref={cancelRef}
                  onClick={onClose}
                  ml={3}
                >
                  Ok
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
};
