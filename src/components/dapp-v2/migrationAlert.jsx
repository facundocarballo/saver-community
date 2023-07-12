import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
  Heading,
  HStack,
  Divider,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useProvider } from "../../context";
import {
  ABLE_CONTRACT_ADDRESS,
  buildTransaciont,
  MIGRATION_SINERGY_BRONZE_CONTRACT_ADDRESS,
} from "../../web3/funcs";
import { Loading } from "./loading";
import { getMigrationData } from "../../web3/funcs/migration";

export const MigrationAlert = () => {
  // Attributes
  const cancelRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  // Context
  const {
    Able,
    SinergyBronze,
    addressAccount,
    uploadSinergyMigrate,
    uploadAbleMigrate,
    migrationData,
    MigrationSinergyBronze,
    SinergyBronzeMigration,
    setMigrationData,
    AbleMigration,
    AbleFirstMigration,
    Triple,
  } = useProvider();
  // Methods
  const handleMigrateAbleSaver = async () => {
    const data = await Able.contract.methods.Migrate().encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      ABLE_CONTRACT_ADDRESS,
      data
    );

    setLoading(true);

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);

        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              clearInterval(interval);
              await uploadAbleMigrate();
              setLoading(false);
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  const handleMigrateSinergy = async () => {
    const data = await MigrationSinergyBronze.contract.methods
      .Migrate()
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      MIGRATION_SINERGY_BRONZE_CONTRACT_ADDRESS,
      data
    );

    setLoading(true);

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);

        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById("loading").innerHTML =
                "Esperando confirmacion de Red...";
            }

            if (rec) {
              clearInterval(interval);
              await uploadSinergyMigrate();
              const data = await getMigrationData(
                Able.contract,
                AbleFirstMigration.contract,
                AbleMigration.contract,
                MigrationSinergyBronze.contract,
                SinergyBronzeMigration.contract,
                Triple.contract,
                addressAccount
              );
              setMigrationData(data);
              setLoading(false);
            }

            if (err) {
              clearInterval(interval);

              setLoading(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }
          });
        }, 500);
      });
  };

  // Component
  if (Able == null && SinergyBronze == null) return null;
  if (migrationData == null) return null;
  return (
    <AlertDialog
      isOpen={isOpen && (Able.haveToRecover || SinergyBronze.haveToRecover)}
      leastDestructiveRef={cancelRef}
      onClose={() => setIsOpen(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="gray.800">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Migracion
          </AlertDialogHeader>

          <AlertDialogBody>
            <Heading color="white" fontSize="2xl">
              ABLE
            </Heading>
            <Box h="10px" />
            <Divider />
            <Box h="10px" />
            <HStack w="full">
              <Text color="white">Puntos {"(CDA Interno)"}</Text>
              <Spacer />
              <Text color="white">
                {migrationData != undefined
                  ? Number(migrationData.able.triple_int).toFixed(2)
                  : 0}
              </Text>
              <Box w="15px" />
            </HStack>
            <HStack w="full">
              <Text color="white">ABLE</Text>
              <Spacer />
              <Text color="white">
                {migrationData != null
                  ? Number(migrationData.able.able).toFixed(2)
                  : 0}
              </Text>
              <Box w="15px" />
            </HStack>
            <HStack w="full">
              <Text color="white">CDA Externo</Text>
              <Spacer />
              <Text color="white">
                {migrationData != null
                  ? Number(migrationData.able.triple_ext).toFixed(2)
                  : 0}
              </Text>
              <Box w="15px" />
            </HStack>
            <Box h="10px" />
            <Divider />
            <Box h="10px" />
            <HStack w="full">
              <Text color="white">TOTAL</Text>
              <Spacer />
              <Text color="white">
                {migrationData != null
                  ? Number(Number(migrationData.able.able_total)).toFixed(2)
                  : 0}{" "}
                ABLE
              </Text>
              <Box w="15px" />
            </HStack>
            <Box h="12px" />
            <Heading color="white" fontSize="2xl">
              Sinergy
            </Heading>
            <Box h="10px" />
            <Divider />
            <Box h="10px" />
            <HStack w="full">
              <Text color="white">NFTs</Text>
              <Spacer />
              <Text color="white">
                {migrationData != null ? migrationData.sinergy.amount : 0}
              </Text>
              <Box w="15px" />
            </HStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Button
                  disabled={Able.is_recover}
                  variant="callToAction"
                  onClick={handleMigrateAbleSaver}
                  color="black"
                >
                  Migrar Able
                </Button>
                <Box w="10px" />
                <Button
                  disabled={!SinergyBronze.haveToRecover}
                  variant="callToAction"
                  onClick={handleMigrateSinergy}
                  color="black"
                >
                  {Number(migrationData.sinergy.amount) ==
                  Number(migrationData.sinergy.amount_to_migrate)
                    ? "Migrar Sinergy"
                    : `Migrar ${migrationData.sinergy.amount_to_migrate} NFTs`}
                </Button>
                {Number(migrationData.sinergy.amount) !=
                Number(migrationData.sinergy.amount_to_migrate) ? (
                  <>
                    <Box w="10px" />
                    <Text color="white" fontWeight="bold">
                      {migrationData.sinergy.intent_number} de{" "}
                      {migrationData.sinergy.amount_of_intents}
                    </Text>
                  </>
                ) : null}
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
