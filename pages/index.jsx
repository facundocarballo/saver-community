import Head from "next/head";
import React from "react";
import { loadWeb3Data } from "../src/web3/funcs";
import { useProvider } from "../src/context";

// Components
import { VStack, Box } from "@chakra-ui/react";
import { NavBar } from "../src/components/navBar";
import { ShowDapp } from "../src/subPages/showDapp";
import { TheDivider } from "../src/components/theDivider";
import { InfoSaver } from "../src/subPages/infoSaver";
import { InfoStableCoin } from "../src/subPages/infoStableCoin";
import { InfoSaverUSDC } from "../src/subPages/infoSaverUSDC";
import { RoadMap } from "../src/subPages/roadMap";
import { Footer } from "../src/subPages/footer";

const Home = () => {
  // Context
  const {
    setSaverCirculation,
    setSaverHolders,
    setStableCoinDistributed,
    setLastStableCoinDistribute,
    setSaverPrice,
    setSaverMinted,
  } = useProvider();

  // React useEffect
  React.useEffect(() => {
    loadWeb3Data().then((res) => {
      setSaverCirculation(res.tokensCirculation);
      setSaverHolders(res.holders);
      setStableCoinDistributed(res.stableCoinDistribute);
      setLastStableCoinDistribute(res.stableCoinLastDistribute);
      setSaverPrice(res.saverPrice);
      setSaverMinted(res.saverMinted);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Saver Community</title>
        <meta
          name="description"
          content="Aplicacion oficial de Saver Community."
        />
        <meta name="image" content="https://i.ibb.co/z7hxTvw/SAVER-TOKEN.png" />
      </Head>

      <VStack w="full">
        <Box h="20px" />
        <NavBar />
        <ShowDapp />
        <TheDivider h={true} />
        <InfoSaver />
        <TheDivider h={true} />
        <InfoStableCoin />
        <TheDivider h={true} />
        <InfoSaverUSDC />
        <TheDivider h={true} />
        <RoadMap />
        <TheDivider h={true} />
        <Footer />
      </VStack>
    </>
  );
};

export default Home;
