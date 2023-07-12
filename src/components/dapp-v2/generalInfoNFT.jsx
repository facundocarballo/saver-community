import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Text,
  Box,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import { GeneralInfoNFTCard } from "./generalInfoNFTCard";

export const GeneralInfoNFT = ({ nft }) => {
  // Attributes

  // Context
  const { SinergyBronze } = useProvider();

  // Methods

  // Component
  return (

        <VStack>
          <GeneralInfoNFTCard
            title="GANANCIAS ACTIVAS"
            value={`${nft.activeRewardsClaimed} BUSD`}
          />

          <GeneralInfoNFTCard
            title="GANANCIAS PASIVAS"
            value={`${SinergyBronze.rewards.passiveReward.actual.claimed} BUSD`}
          />

          <GeneralInfoNFTCard
            title="CONEXIONES TOTALES"
            value={`${nft.references.total}`}
          />
        </VStack>

  );
};
