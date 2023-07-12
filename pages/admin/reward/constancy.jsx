import React from "react";
import { useProvider } from '../../../src/context';
import { Heading, VStack, Box, Divider } from "@chakra-ui/react";
import { LoadInfo } from "../../../src/components/dapp-v2/loadInfo";
import { StadisticData } from "../../../src/subPages/admin/stadistic-data";
import { ViewSetData } from "../../../src/subPages/admin/ViewSetData";
import { IMG_ABLE_TOKEN } from "../../../src/images";
import { NavBar } from "../../../src/components/admin/navbar";

const AdminConstancyReward = () => {
  // Attributes
  // Context
  const { ConstancyReward, AdminLoadConstancyReward } = useProvider();
  // Methods
  // Component
  return (
    <VStack w="full">
      <Box h="10px" />
      <NavBar />
      <Heading color="white">Admin - ConstancyReward</Heading>
      <Box h="10px" />
      {ConstancyReward == null ? (
        <>
          <LoadInfo
            func={AdminLoadConstancyReward}
            msg={"Cargar ConstancyReward para Admin"}
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
            data={ConstancyReward.stablecoin.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData
            title="Datos Modificables"
            data={ConstancyReward.stablecoin.admin.set_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <Heading color="white">Able</Heading>
          <Box h="10px" />
          <StadisticData
            title="Datos Estadisticos"
            data={ConstancyReward.able.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData
            title="Datos Modificables"
            data={ConstancyReward.able.admin.set_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
        </>
      )}
    </VStack>
  );
};

export default AdminConstancyReward;
