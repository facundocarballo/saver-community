import React from "react";
import { useProvider } from "../../../src/context";
import { Heading, VStack, Box, Divider, Text } from "@chakra-ui/react";
import { LoadInfo } from "../../../src/components/dapp-v2/loadInfo";
import { StadisticData } from "../../../src/subPages/admin/stadistic-data";
import { ViewSetData } from "../../../src/subPages/admin/ViewSetData";
import { IMG_ABLE_TOKEN } from "../../../src/images";
import { NavBar } from "../../../src/components/admin/navbar";

const AdminValueReward = () => {
  // Attributes
  // Context
  const { ValueReward, ValueRewardAdminLoad, AdminLoadValueReward } =
    useProvider();
  // Methods
  // Component
  return (
    <VStack w="full">
      <Box h="10px" />
      <NavBar />
      <Heading color="white">Admin - ValueReward</Heading>
      <Box h="10px" />
      {ValueReward == null ? (
        <>
          <LoadInfo
            func={AdminLoadValueReward}
            msg={"Cargar ValueReward para Admin"}
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
            data={ValueReward.stablecoin.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData
            title="Datos Modificables"
            data={ValueReward.stablecoin.admin.set_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <Heading color="white">Able</Heading>
          <Box h="10px" />
          <StadisticData
            title="Datos Estadisticos"
            data={ValueReward.able.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData
            title="Datos Modificables"
            data={ValueReward.able.admin.set_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
        </>
      )}
    </VStack>
  );
};

export default AdminValueReward;
