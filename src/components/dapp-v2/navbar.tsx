import React from "react";
import {
  HStack,
  Spacer,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { IMG_ABLE_SAVER_TITLE } from "../../images";

export const NavBar = () => {
  // Attributes
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "black");
  const isDark = colorMode === "dark";
  const { isOpen, onToggle } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const blackWallet = "https://i.ibb.co/jgR5nn6/wallet.png";


  // Context
  const { handleWeb3, account } = useProvider();

  // Methods
  const getCleanAddress = (addres) => {
    const firstPart = addres.substring(0, 5);
    const secondPart = addres.substring(addres.length - 5, addres.length);

    return firstPart + "..." + secondPart;
  };

  const connectWallet = async () => {
    setLoading(true);

    await handleWeb3();

    setLoading(false);
  };

  // Component
  return (
    <HStack w='full' bg='black'>
      <Spacer />
      <Image
      src={IMG_ABLE_SAVER_TITLE}
      alt='ableTitle'
      w='90%'
      display={{lg: 'none', md:'none', sm: 'flex', base: 'flex'}}
      />
      <Image
      src={IMG_ABLE_SAVER_TITLE}
      alt='ableTitle'
      w='55%'
      display={{lg: 'flex', md:'flex', sm: 'none', base: 'none'}}
      />
      <Spacer />
    </HStack>
  );
};
