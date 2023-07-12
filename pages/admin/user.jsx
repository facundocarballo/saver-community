import React from "react";
import { useProvider } from "../../src/context";
import { Heading, VStack, Box, Divider } from "@chakra-ui/react";
import { LoadInfo } from "../../src/components/dapp-v2/loadInfo";
import { StadisticData } from "../../src/subPages/admin/stadistic-data";
import { ViewSetData } from "../../src/subPages/admin/ViewSetData";
import { IMG_ABLE_TOKEN } from "../../src/images";
import { NavBar } from "../../src/components/admin/navbar";

const AdminUser = () => {
  // Attributes
  // Context
  const { User, AdminLoadUser } = useProvider();
  // Methods
  // Component
  return (
    <VStack w="full">
      <Box h="10px" />
      <NavBar />
      <Heading color="white">Admin - User</Heading>
      <Box h="10px" />
      {User == null ? (
        <>
          <LoadInfo
            func={AdminLoadUser}
            msg={"Cargar User para Admin"}
            img={IMG_ABLE_TOKEN}
          />
        </>
      ) : (
        <>
          <Divider />
          <StadisticData
            title="Datos Estadisticos"
            data={User.admin.stadistic_data}
          />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
          <ViewSetData title="Datos Modificables" data={User.admin.set_data} />
          <Box h="10px" />
          <Divider />
          <Box h="10px" />
        </>
      )}
    </VStack>
  );
};

export default AdminUser;
