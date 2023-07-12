import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useProvider } from "../../../../../src/context";
import { getOwnerOfNFT } from "../../../../../src/web3/funcs/sinergy/nft";
import { NFT_OWNER } from "../../../../../src/subPages/dapp-v2/nft/silver/nftOwner";
import { NFT_PUBLIC } from "../../../../../src/subPages/dapp-v2/nft/silver/nftPublic";
import { IMG_ABLE_SAVER_LOGO } from "../../../../../src/images";
import { LoadInfo } from '../../../../../src/components/dapp-v2/loadInfo';

export default function NFT_PAGE() {
  // Attributes
  const router = useRouter();
  const tokenID = router.query.id;

  const [isOwner, setIsOwner] = React.useState(false);
  const [runEffect, setRunEffect] = React.useState(false);

  // Context
  const { addressAccount, SinergySilver, loadAdmin } = useProvider();

  // Methods
  React.useEffect(() => {
    if (addressAccount != null && !runEffect) {
      setRunEffect(true);
      getOwnerOfNFT(SinergySilver.contract, tokenID).then((address) => {
        if (String(address).toLowerCase() == String(addressAccount).toLowerCase()) {
          setIsOwner(true);
        }
      });
    }
  }); // [addressAccount, runEffect, SinergySilver.contract, tokenID]

  // Component
  return (
    <>
      <Head>
        <title>Saver Sinergy - NFT</title>
        <meta name="description" content="Pagina de tu NFT" />
        <meta name="image" content={IMG_ABLE_SAVER_LOGO} />
      </Head>

      {addressAccount == null ? (
        <VStack bg="black">
          <Box h="25px" />
          <LoadInfo func={loadAdmin} msg="Conectar Billetera"/>
          <Box h="50px" />
        </VStack>
      ) : isOwner ? (
        <NFT_OWNER id={tokenID} />
      ) : (
        <NFT_PUBLIC id={tokenID} />
      )}
    </>
  );
}
