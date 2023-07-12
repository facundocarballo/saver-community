import React from "react";
import { useProvider } from "../../src/context";
import { LoadInfo } from "../../src/components/dapp-v2/loadInfo";
import { NavBar } from "../../src/components/admin/navbar";
import { StadisticData } from "../../src/subPages/admin/stadistic-data";
import { ViewSetData } from "../../src/subPages/admin/ViewSetData";
import { IMG_NFT_TOKEN } from "../../src/images";
import { Heading, VStack, Box, Divider } from "@chakra-ui/react";

const AdminSinergy = () => {
  // Attributes
  // Context
  const { SinergyBronze, AdminLoadSinergy } = useProvider();
  // Methods
  // Component
  return (
    <VStack w="full">
      <Box h="10px" />
      <NavBar />
      <Heading color="white">Admin - Sinergy</Heading>
      <Box h="10px" />
      {SinergyBronze == null ? (
        <>
          <LoadInfo
            func={AdminLoadSinergy}
            msg={"Cargar Sinergy para Admin"}
            img={IMG_NFT_TOKEN}
          />
        </>
      ) : (
        <>
          <Divider />
          <StadisticData
            title="Datos Estadisticos"
            data={SinergyBronze.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData title="Datos Modificables" data={SinergyBronze.admin.set_data} />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
        </>
      )}
    </VStack>
  );
};

export default AdminSinergy;
