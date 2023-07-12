import React from "react";
import { useProvider } from "../../src/context";
import { Heading, VStack, Box, Divider } from "@chakra-ui/react";
import { LoadInfo } from "../../src/components/dapp-v2/loadInfo";
import { StadisticData } from "../../src/subPages/admin/stadistic-data";
import { ViewSetData } from "../../src/subPages/admin/ViewSetData";
import { IMG_ABLE_TOKEN } from "../../src/images";
import { NavBar } from "../../src/components/admin/navbar";
import { SetVideo } from "../../src/subPages/admin/SetVideo";
import { buildTransaciont } from "../../src/web3/funcs";

const AdminTest = () => {
  // Attributes
  // Context
  const { Test, AdminLoadTest } = useProvider();
  // Methods
  // Component
  return (
    <VStack w="full">
      <Box h="10px" />
      <NavBar />
      <Heading color="white">Admin - Test</Heading>
      <Box h="10px" />
      {Test == null ? (
        <>
          <LoadInfo
            func={AdminLoadTest}
            msg={"Cargar Test para Admin"}
            img={IMG_ABLE_TOKEN}
          />
        </>
      ) : (
        <>
          <Divider />
          <StadisticData
            title="Datos Estadisticos"
            data={Test.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData title="Datos Modificables" data={Test.admin.set_data} />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <SetVideo />
          <Box h="10px" />
        </>
      )}
    </VStack>
  );
};

export default AdminTest;
