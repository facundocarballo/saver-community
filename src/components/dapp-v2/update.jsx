import React from "react";
import {
  Image,
  Text,
  HStack,
  useDisclosure,
  Button,
  Box,
  VStack,
} from "@chakra-ui/react";
import {
  SAVER_TOKEN_CONTRACT_ADDRESS,
  USER_CONTRACT_ADDRESS,
  buildTransaciont,
} from "../../web3/funcs";
import { useProvider } from "../../context";
import { Loading } from "./loading";

export const Update = () => {
  // Attributes
  const updateImage = "https://i.ibb.co/Zg6vF6W/refresh-white.png";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const cancelRef = React.useRef();
  // Context
  const { addressAccount, Able, loadAble, User } = useProvider();

  // Methods
  const handleUpdate = async () => {

    const data = await User.contract.methods
      .Update(addressAccount)
      .encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      USER_CONTRACT_ADDRESS,
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
              await loadAble(Able.contract);
              setLoading(false);
              onClose();
            }

            if (err) {
              clearInterval(interval);
              await loadAble(Able.contract);
              console.log("ERROR: ", err);
              setLoading(false);
              onClose();
            }
          });
        }, 500);
      });
  };

  // Component
  return (
    <VStack>
      <HStack cursor="pointer" onClick={handleUpdate}>
        <Button
          bg="green.600"
          shadow="1px 1px 20px #EDF2F7"
          _hover={{
            shadow: "1px 1px 110px #EDF2F7",
            transform: "scale(1.1)",
          }}
          w="200px"
        >
          <HStack>
            <Image
              src={"https://i.ibb.co/zh9sXfj/refresh-white.png"}
              alt="refresh"
              w="20px"
            />
            <Text color="white">ACTUALIZAR</Text>
          </HStack>
        </Button>
      </HStack>
      {loading ? (
          <HStack>
            <Box w="10px" />
            <Loading />
          </HStack>
        ) : null}
    </VStack>
  );
};
