import React from "react";
import {
  Circle,
  Text,
  Image,
  VStack,
  Box,
  HStack,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import {
  IMG_NFT_SINERGY_SILVER,
  IMG_PIG_SINERGY_SILVER,
} from "../../../images";
import { motion, useTime, useTransform, useMotionValue } from "framer-motion";

export const MoveBall = () => {
  // Attributes
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const time = useTime();
  const rotate = useTransform(
    time,
    [0, 4000], // For every 4 seconds...
    [0, 360], // ...rotate 360deg
    { clamp: false }
  );

  // Context

  // Methods
  // Component
  return (
    <>
      {/* Desktop */}
      <VStack
        w="full"
        display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
      >
        <Image
          src={IMG_PIG_SINERGY_SILVER}
          alt="img-pig-sinergy-silver"
          boxSize="600px"
        />

        {/* Monedita arriba */}
        <VStack position="absolute" zIndex={3}>
          <Box h="245px" />
          <motion.div style={{ rotate: rotate }}>
            <Image
              src={IMG_NFT_SINERGY_SILVER}
              alt="img-sinergy-silver"
              boxSize="80px"
            />
          </motion.div>
        </VStack>

        <VStack position="absolute" zIndex={3}>
          <Box h="215px" />
          <Text fontSize="25px" fontWeight="black" color="black">
            13
          </Text>
        </VStack>

        {/* Monedita abajo izquierda*/}
        <HStack w="full" position="absolute" zIndex={3}>
          <Box
            w={{
              "2xl": "860px",
              xl: "660px",
              lg: "530px",
              md: "380px",
              sm: "260px",
              base: "200px",
            }}
          />
          <VStack>
            <Box h="340px" />
            <motion.div style={{ rotate: rotate }}>
              <Image
                src={IMG_NFT_SINERGY_SILVER}
                alt="img-sinergy-silver"
                boxSize="80px"
              />
            </motion.div>
          </VStack>
          <Spacer />
        </HStack>

        <HStack w="full" position="absolute" zIndex={3}>
          <Box
            w={{
              "2xl": "880px",
              xl: "684px",
              lg: "555px",
              md: "405px",
              sm: "390px",
              base: "200px",
            }}
          />
          <VStack>
            <Box h="415px" />
            <Text fontSize="25px" fontWeight="black" color="black">
              12
            </Text>
          </VStack>
          <Spacer />
        </HStack>

        {/* Monedita abajo a la derecha */}
        <HStack w="full" position="absolute" zIndex={3}>
          <Box
            w={{
              "2xl": "950px",
              xl: "760px",
              lg: "620px",
              md: "480px",
              sm: "390px",
              base: "200px",
            }}
          />
          <VStack>
            <Box h="340px" />
            <motion.div style={{ rotate: rotate }}>
              <Image
                src={IMG_NFT_SINERGY_SILVER}
                alt="img-sinergy-silver"
                boxSize="80px"
              />
            </motion.div>
          </VStack>
          <Spacer />
        </HStack>

        <HStack w="full" position="absolute" zIndex={3}>
          <Box
            w={{
              '2xl': '977px',
              xl: "783px",
              lg: "645px",
              md: "505px",
              sm: "300px",
              base: "200px",
            }}
          />
          <VStack>
            <Box h="415px" />
            <Text fontSize="25px" fontWeight="black" color="black">
              14
            </Text>
          </VStack>
          <Spacer />
        </HStack>
      </VStack>

      {/* Mobile */}
      <VStack
        w="full"
        display={{ lg: "none", md: "none", sm: "flex", base: "flex" }}
      >
        <Image
          src={IMG_PIG_SINERGY_SILVER}
          alt="img-pig-sinergy-silver"
          boxSize="600px"
        />

        {/* Monedita arriba */}
        <VStack position="absolute" zIndex={3}>
          <Box h="245px" />
          <motion.div style={{ rotate: rotate }}>
            <Image
              src={IMG_NFT_SINERGY_SILVER}
              alt="img-sinergy-silver"
              boxSize="80px"
            />
          </motion.div>
        </VStack>

        <VStack position="absolute" zIndex={3}>
          <Box h="215px" />
          <Text fontSize="25px" fontWeight="black" color="black">
            13
          </Text>
        </VStack>

        {/* Monedita abajo izquierda*/}
        <HStack w="full" position="absolute" zIndex={3}>
          <Box w={{ sm: "170px", base: "100px" }} />
          <VStack>
            <Box h="340px" />
            <motion.div style={{ rotate: rotate }}>
              <Image
                src={IMG_NFT_SINERGY_SILVER}
                alt="img-sinergy-silver"
                boxSize="80px"
              />
            </motion.div>
          </VStack>
          <Spacer />
        </HStack>

        <HStack w="full" position="absolute" zIndex={3}>
          <Box w={{ sm: "190px", base: "120px" }} />
          <VStack>
            <Box h="415px" />
            <Text fontSize="25px" fontWeight="black" color="black">
              12
            </Text>
          </VStack>
          <Spacer />
        </HStack>

        {/* Monedita abajo a la derecha */}
        <HStack w="full" position="absolute" zIndex={3}>
          <Box w={{ sm: "280px", base: "180px" }} />
          <VStack>
            <Box h="340px" />
            <motion.div style={{ rotate: rotate }}>
              <Image
                src={IMG_NFT_SINERGY_SILVER}
                alt="img-sinergy-silver"
                boxSize="80px"
              />
            </motion.div>
          </VStack>
          <Spacer />
        </HStack>

        <HStack w="full" position="absolute" zIndex={3}>
          <Box w={{ sm: "305px", base: "205px" }} />
          <VStack>
            <Box h="415px" />
            <Text fontSize="25px" fontWeight="black" color="black">
              14
            </Text>
          </VStack>
          <Spacer />
        </HStack>
      </VStack>
    </>
  );
};
