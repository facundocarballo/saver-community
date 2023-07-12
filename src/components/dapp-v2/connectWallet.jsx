import React from "react";
import { Image, VStack, Box, HStack, Spacer, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useProvider } from "../../context";
import {
  IMG_ABLE_SAVER_TITLE,
  IMG_PERGAMINO_ABLE,
  IMG_PERGAMINO_OFFER_SINERGY,
  IMG_PERGAMINO_SAVER_COMMUNITY_HORIZONTAL,
  IMG_PERGAMINO_SAVER_COMMUNITY_VERTICAL,
  IMG_SAVER_COMMUNITY_TITLE_HORIZONTAL,
  IMG_SAVER_COMMUNTIY_TITLE_VERTICAL,
  IMG_SINERGY_TITLE,
} from "../../images";
import { Loading } from "./loading";

export const ConnectWallet = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const { loadAble } = useProvider();
  // Methods
  const connectWallet = async () => {
    setLoading(true);

    await loadAble();

    setLoading(false);
  };

  // Components
  return (
    <>
      {/* Desktop */}
      <VStack
        w="full"
        display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
      >
        <Image
          src={IMG_SAVER_COMMUNITY_TITLE_HORIZONTAL}
          alt="saver-communtiy-title"
          w={{ xl: "60%", lg: "full" }}
        />

        <Link
          href="https://saver-community.gitbook.io/es/"
          isExternal
          w={{ xl: "60%", lg: "full" }}
        >
          <Image
            src={IMG_PERGAMINO_SAVER_COMMUNITY_HORIZONTAL}
            alt="pergamino-saver-community"
            w='full'
          />
        </Link>

        <Box h="20px" />
        <HStack w="full">
          <Spacer />
          <VStack w={{ xl: "30%", lg: "40%", md: "40%" }}>
            <Image src={IMG_ABLE_SAVER_TITLE} alt="able-saver-title" w="100%" />
            <Image
              _hover={{
                transform: "scale(1.1)",
                shadow: "1px 1px 12px #abc",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={connectWallet}
              src={IMG_PERGAMINO_ABLE}
              alt="pergamino-able-saver"
              w="100%"
            />
            <Box h="10px" />
          </VStack>
          <Spacer />
          {loading ? <Loading /> : null}
          <Spacer />
          <VStack w={{ xl: "30%", lg: "40%", md: "40%" }}>
            <Image src={IMG_SINERGY_TITLE} alt="offer-sinergy-title" w="100%" />
            <NextLink href="/dapp/sinergyBronze">
              <Image
                _hover={{
                  transform: "scale(1.1)",
                  shadow: "1px 1px 12px #abc",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                src={IMG_PERGAMINO_OFFER_SINERGY}
                alt="pergamino-offer-sinergy"
                w="100%"
              />
            </NextLink>
          </VStack>
          <Spacer />
        </HStack>
      </VStack>

      {/* Mobile */}
      <VStack
        w="full"
        display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
      >
        <Image
          src={IMG_SAVER_COMMUNTIY_TITLE_VERTICAL}
          alt="saver-communtiy-title"
          w="90%"
        />

        <Image
          src={IMG_PERGAMINO_SAVER_COMMUNITY_VERTICAL}
          alt="pergamino-saver-community"
          w="80%"
        />

        <Box h="20px" />
        <VStack w="full">
          <Spacer />
          <Image src={IMG_ABLE_SAVER_TITLE} alt="able-saver-title" w="80%" />
          <Image
            _hover={{
              transform: "scale(1.1)",
              shadow: "1px 1px 12px #abc",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={connectWallet}
            src={IMG_PERGAMINO_ABLE}
            alt="pergamino-offer-sinergy"
            w="80%"
          />
          <Box h="10px" />
          {loading ? <Loading /> : null}
          <Image src={IMG_SINERGY_TITLE} alt="offer-sinergy-title" w="100%" />
          <NextLink href="/dapp/sinergyBronze">
            <Image
              _hover={{
                transform: "scale(1.1)",
                shadow: "1px 1px 12px #abc",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              src={IMG_PERGAMINO_OFFER_SINERGY}
              alt="pergamino-offer-sinergy"
              w="80%"
            />
          </NextLink>
          <Spacer />
        </VStack>
      </VStack>
    </>
  );
};
