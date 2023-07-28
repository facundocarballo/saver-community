import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Text,
  Box,
  Spinner,
  Image,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { NftPrivateCard } from "./nftPrivateCard";
import { useProvider } from "../../context";
import {
  buildTransaciont,
  SINERGY_BRONZE_CONTRACT_ADDRESS,
  INITIAL_AMOUNT_NFTS,
  MIGRATION_CONTRACT_ADDRESS
} from "../../web3/funcs";
import { Loading } from "./loading";

const LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const ShowLevelReferenceNFT = ({ nft, level }) => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  // Context
  const {
    uploadReferences,
    addressAccount,
    handleMigrateReferenceLevel,
    MigrationFirstSinergyBronze
  } = useProvider();

  // Methods
  const getNFTsAtLevel = () => {
    if (level == "Primera") {
      return nft.references.firstLevel.nfts;
    }

    if (level == "Segunda") {
      return nft.references.secondLevel.nfts;
    }

    if (level == "Tercera") {
      return nft.references.thirdLevel.nfts;
    }

    if (level == "Cuarta") {
      return nft.references.fourLevel.nfts;
    }

    if (level == "Quinta") {
      return nft.references.fiveLevel.nfts;
    }

    if (level == "Sexta") {
      return nft.references.sixLevel.nfts;
    }

    if (level == "Septima") {
      return nft.references.sevenLevel.nfts;
    }

    if (level == "Octava") {
      return nft.references.eightLevel.nfts;
    }

    if (level == "Novena") {
      return nft.references.nineLevel.nfts;
    }

    return [];
  };

  const getAmountOfConectionsAtLevel = () => {
    if (level == "Primera") {
      return nft.references.firstLevel.amount;
    }

    if (level == "Segunda") {
      return nft.references.secondLevel.amount;
    }

    if (level == "Tercera") {
      return nft.references.thirdLevel.amount;
    }

    if (level == "Cuarta") {
      return nft.references.fourLevel.amount;
    }

    if (level == "Quinta") {
      return nft.references.fiveLevel.amount;
    }

    if (level == "Sexta") {
      return nft.references.sixLevel.amount;
    }

    if (level == "Septima") {
      return nft.references.sevenLevel.amount;
    }

    if (level == "Octava") {
      return nft.references.eightLevel.amount;
    }

    if (level == "Novena") {
      return nft.references.nineLevel.amount;
    }

    return 0;
  };

  const getNumberOfLevel = () => {
    if (level == "Primera") {
      return 1;
    }

    if (level == "Segunda") {
      return 2;
    }

    if (level == "Tercera") {
      return 3;
    }

    if (level == "Cuarta") {
      return 4;
    }

    if (level == "Quinta") {
      return 5;
    }

    if (level == "Sexta") {
      return 6;
    }

    if (level == "Septima") {
      return 7;
    }

    if (level == "Octava") {
      return 8;
    }

    if (level == "Novena") {
      return 9;
    }

    return null;
  };

  const handleGetNFTs = async () => {
    setLoading(true);
    await uploadReferences(getNumberOfLevel());
    setLoading(false);
  };

  const getCorrectDataOfRecoverNFTs = async () => {
    let data = null;
    const Contract = MigrationFirstSinergyBronze.contract;
    switch (level) {
      case "Primera":
        data = await Contract.methods
          .RecoverFirstLevelReferences(nft.id)
          .encodeABI();
        return data;
      case "Segunda":
        data = await Contract.methods
          .RecoverSecondLevelReferences(nft.id)
          .encodeABI();
        return data;
      case "Tercera":
        data = await Contract.methods
          .RecoverThirdLevelReferences(nft.id)
          .encodeABI();
        return data;
      case "Cuarta":
        data = await Contract.methods
          .RecoverFourLevelReferences(nft.id)
          .encodeABI();
        return data;
      case "Quinta":
        data = await Contract.methods
          .RecoverFiveLevelReferences(nft.id)
          .encodeABI();
        return data;
      case "Sexta":
        data = await Contract.methods
          .RecoverSixLevelReferences(nft.id)
          .encodeABI();
        return data;
      case "Septima":
        data = await Contract.methods
          .RecoverSevenLevelReferences(nft.id)
          .encodeABI();
        return data;
      case "Octava":
        data = await Contract.methods
          .RecoverEightLevelReferences(nft.id)
          .encodeABI();
        return data;
      case "Novena":
        data = await Contract.methods
          .RecoverNineLevelReferences(nft.id)
          .encodeABI();
        return data;
    }
  };

  const handleRecoverNFTsByLevel = async () => {
    const data = await getCorrectDataOfRecoverNFTs();
    const params = await buildTransaciont(
      addressAccount,
      MIGRATION_CONTRACT_ADDRESS,
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
              setLoading(false);
              clearInterval(interval);
              await handleMigrateReferenceLevel(level);
              setLoaded(true);
            }

            if (err) {
              clearInterval(interval);

              setLoading(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const showRecoverLevel = () => {
    if (loaded) return false;

    if (nft.id > INITIAL_AMOUNT_NFTS) return false;
    switch (level) {
      case "Primera":
        return (
          !nft.references.firstLevel.recover &&
          nft.references.firstLevel.amount > 0
        );
      case "Segunda":
        return (
          !nft.references.secondLevel.recover &&
          nft.references.secondLevel.amount > 0
        );
      case "Tercera":
        return (
          !nft.references.thirdLevel.recover &&
          nft.references.thirdLevel.amount > 0
        );
      case "Cuarta":
        return (
          !nft.references.fourLevel.recover &&
          nft.references.fourLevel.amount > 0
        );
      case "Quinta":
        return (
          !nft.references.fiveLevel.recover &&
          nft.references.fiveLevel.amount > 0
        );
      case "Sexta":
        return (
          !nft.references.sixLevel.recover && nft.references.sixLevel.amount > 0
        );
      case "Septima":
        return (
          !nft.references.sevenLevel.recover &&
          nft.references.sevenLevel.amount > 0
        );
      case "Octava":
        return (
          !nft.references.eightLevel.recover &&
          nft.references.eightLevel.amount > 0
        );
      case "Novena":
        return (
          !nft.references.nineLevel.recover &&
          nft.references.nineLevel.amount > 0
        );
    }
  };

  // Component
  return (
    <Accordion w="90%" allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <HStack w="full">
              <Box w="10px" />
              <Text color="white">{level} Generacion</Text>
              <Spacer />
              <Text color="white">
                {getAmountOfConectionsAtLevel()} CONEXIONES
              </Text>
              {loading ? (
                <Loading />
              ) : true ? (
                <Button variant="blueDapp" onClick={handleRecoverNFTsByLevel}>
                  Migrar NFTs
                </Button>
              ) : (
                <Button variant="blueDapp" onClick={handleGetNFTs}>
                  + Info
                </Button>
              )}
              <AccordionIcon color="white" />
            </HStack>
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <Grid
            display={{ lg: "grid", md: "grid", sm: "none", base: "none" }}
            templateColumns="repeat(5, 1fr)"
            gap={6}
            scrollBehavior="inside"
          >
            {getAmountOfConectionsAtLevel() > 0 && getNFTsAtLevel() != null
              ? getNFTsAtLevel().map((e, idx) => (
                  <NftPrivateCard key={idx} nft={e} />
                ))
              : null}
          </Grid>

          <VStack
            display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
          >
            {getAmountOfConectionsAtLevel() > 0 && getNFTsAtLevel() != null
              ? getNFTsAtLevel().map((e, idx) => (
                  <NftPrivateCard key={idx} nft={e} />
                ))
              : null}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
