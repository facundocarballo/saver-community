import React from "react";
import {
  Image,
  VStack,
  Button,
  Box,
} from "@chakra-ui/react";
import { Loading } from "./loading";

export const LoadInfo = ({func, msg, img}) => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  // Methods
  const connectWallet = async () => {
    setLoading(true);

    await func();
    
    setLoading(false);
  };
  // Components
  return (
    <VStack bg='black'>
      <Image src={img} alt="nft-token" boxSize="250px" />
      <Box h="10px" />
      {loading ? (
        <Loading />
      ) : (
        <Button variant="actionDapp" onClick={connectWallet}>
          {msg}
        </Button>
      )}
    </VStack>
  );
};
