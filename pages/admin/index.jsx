import React from "react";
import {
  VStack,
  Box,
  Grid,
  Button,
  Heading,
  Divider,
} from "@chakra-ui/react";
import NextLink from "next/link";

const BASE_URL = "/admin/";

const Admin = () => {
  // Attributes
  const modules = [
    {
      title: "Able",
      href: BASE_URL + "able",
    },
    {
      title: "Sinergy",
      href: BASE_URL + "sinergy",
    },
    {
      title: "Sinergy Sale",
      href: BASE_URL + "SinergySale",
    },
    {
      title: "Test",
      href: BASE_URL + "test",
    },
    {
      title: "User",
      href: BASE_URL + "user",
    },
    {
      title: "Owners",
      href: BASE_URL + "owners",
    },
    {
      title: "Value Reward",
      href: BASE_URL + "reward/value",
    },
    {
      title: "Constancy Reward",
      href: BASE_URL + "reward/constancy",
    },
    {
      title: "Confidence Reward",
      href: BASE_URL + "reward/confidence",
    },
    {
      title: "Base Reward",
      href: BASE_URL + "reward/base",
    },
    {
      title: "Clock",
      href: BASE_URL + "clock",
    },
  ];
  // Context
  // Methods
  // Component
  return (
    <VStack w="full" bg="black">
      <Box h="10px" />
      <Heading color='white'>Admin - Saver Community</Heading>
      <Box h="10px" />
      <Divider />
      <Box h="100px" />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {modules.map((page, idx) => (
          <NextLink key={idx} href={page.href}>
            <Button variant="callToAction">{page.title}</Button>
          </NextLink>
        ))}
      </Grid>
    </VStack>
  );
};

export default Admin;
