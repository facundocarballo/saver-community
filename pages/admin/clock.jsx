import React from "react";
import { useProvider } from "../../src/context";
import { Heading, VStack, Box, Divider } from "@chakra-ui/react";
import { LoadInfo } from "../../src/components/dapp-v2/loadInfo";
import { StadisticData } from "../../src/subPages/admin/stadistic-data";
import { ViewSetData } from "../../src/subPages/admin/ViewSetData";
import { IMG_ABLE_TOKEN } from "../../src/images";
import { NavBar } from "../../src/components/admin/navbar";

const AdminAble = () => {
  // Attributes
  // Context
  const { Clock, AdminLoadClock } = useProvider();
  // Methods
  // Component
  return (
    <VStack w="full">
      <Box h="10px" />
      <NavBar />
      <Heading color="white">Admin - Clock</Heading>
      <Box h="10px" />
      {Clock == null ? (
        <>
          <LoadInfo
            func={AdminLoadClock}
            msg={"Cargar Clock para Admin"}
            img={IMG_ABLE_TOKEN}
          />
        </>
      ) : (
        <>
          <Divider />
          <StadisticData
            title="Datos Estadisticos"
            data={Clock.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData title="Datos Modificables" data={Clock.admin.set_data} />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
        </>
      )}
    </VStack>
  );
};

export default AdminAble;
