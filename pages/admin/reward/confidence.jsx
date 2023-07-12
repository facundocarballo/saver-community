import React from "react";
import { useProvider } from '../../../src/context';
import { Heading, VStack, Box, Divider } from "@chakra-ui/react";
import { LoadInfo } from "../../../src/components/dapp-v2/loadInfo";
import { StadisticData } from "../../../src/subPages/admin/stadistic-data";
import { ViewSetData } from "../../../src/subPages/admin/ViewSetData";
import { IMG_ABLE_TOKEN } from "../../../src/images";
import { NavBar } from "../../../src/components/admin/navbar";
const AdminConfidenceReward = () => {
  // Attributes
  // Context
  const { ConfidenceReward, AdminLoadConfidenceReward } = useProvider();
  // Methods
  // Component
  return (
    <VStack w="full">
      <Box h="10px" />
      <NavBar />
      <Heading color="white">Admin - ConfidenceReward</Heading>
      <Box h="10px" />
      {ConfidenceReward == null ? (
        <>
          <LoadInfo
            func={AdminLoadConfidenceReward}
            msg={"Cargar ConfidenceReward para Admin"}
            img={IMG_ABLE_TOKEN}
          />
        </>
      ) : (
        <>
          <Divider />
          <Heading color="white">Stablecoin</Heading>
          <Box h="10px" />
          <StadisticData
            title="Datos Estadisticos"
            data={ConfidenceReward.stablecoin.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData
            title="Datos Modificables"
            data={ConfidenceReward.stablecoin.admin.set_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <Heading color="white">Able</Heading>
          <Box h="10px" />
          <StadisticData
            title="Datos Estadisticos"
            data={ConfidenceReward.able.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData
            title="Datos Modificables"
            data={ConfidenceReward.able.admin.set_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
        </>
      )}
    </VStack>
  );
};

export default AdminConfidenceReward;
