import React from "react";
import { HStack, Button, Input, Spinner, VStack } from "@chakra-ui/react";
import { getBasicNFT } from "../../web3/funcs/sinergy/nft";
import { SinergySilverCard } from "../../components/dapp-v2/cards/sinergySilver";
import { getBasicSilverNFT } from "../../web3/funcs/sinergy/silver/nft";
import { SearchNFTCard } from "../../components/dapp-v2/cards/searchNFTCard";
import { useProvider } from "../../context";
import { Loading } from "../../components/dapp-v2/loading";

export const SearchNFT = ({ Sinergy, generation }) => {
  // Attributes
  const [nft, setNft] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleChange = (event) => setSearchValue(event.target.value);

  // Context
  const { SinergyBronzeMigration, MigrationSinergyBronze } = useProvider();

  // Methods
  const handleGetNFT = async () => {
    setLoading(true);
    if (generation == "GOLD") {
    }
    if (generation == "SILVER") {
      const nftData = await getBasicSilverNFT(
        Sinergy.contract,
        Sinergy.mini_game,
        searchValue
      );
      setNft(nftData);
      setLoading(false);

      return;
    }
    // En caso de Bronze...
    const nftData = await getBasicNFT(
      Sinergy.contract,
      searchValue,
      SinergyBronzeMigration,
      MigrationSinergyBronze.contract
    );
    
    setNft(nftData);
    setLoading(false);
  };

  const getSinergyNFTCard = () => {
    if (generation === "GOLD") return null;
    if (generation === "SILVER")
      return <SinergySilverCard nft={nft} owner={false} />;
    return <SearchNFTCard nft={nft} />;
  };

  // Component
  return (
    <VStack>
      <HStack>
        <Input
          value={searchValue}
          onChange={handleChange}
          placeholder="Busca NFTs por su ID"
          w={{ lg: "500px", md: "400px", sm: "300px", base: "250px" }}
          type="number"
          _hover={{
            transform: "scale(1.01)",
            borderColor: "gray.500",
          }}
          color="white"
        />
        <Button
          bg="blue.500"
          borderRadius={6}
          _hover={{
            transform: "scale(1.1)",
            shadow: "1px 1px 120px #ccc",
          }}
          onClick={handleGetNFT}
        >
          BUSCAR
        </Button>
      </HStack>
      {loading ? <Loading /> : null}
      {nft != null ? getSinergyNFTCard() : null}
    </VStack>
  );
};
