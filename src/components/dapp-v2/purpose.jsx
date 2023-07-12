import { CloseIcon } from "@chakra-ui/icons";
import {
  VStack,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  Textarea,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useProvider } from "../../context";
import {
  ABLE_CONTRACT_ADDRESS,
  SAVER_TOKEN_CONTRACT_ADDRESS,
  buildTransaciont,
} from "../../web3/funcs";
import { Loading } from "./loading";

export const Purpose = (props) => {
  // Provider
  const { Able, addressAccount, uploadPorpouses } = useProvider();

  // Colors
  const blue = useColorModeValue("blue.300", "blue.400");
  const pink = useColorModeValue("pink.300", "pink.400");

  // Use State
  const [purpose, setPurpose] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showTextArea, setShowTextArea] = React.useState(false);

  // Handlers
  const formatAmount = (amount) => {
    // > 1 Billion
    if (amount / 1000000000 >= 1)
      return `${Number(amount / 1000000000).toFixed(2)}B`;
    // > 1Million
    if (amount / 1000000 >= 1) return `${Number(amount / 1000000).toFixed(2)}M`;
    // > 100K
    if (amount / 100000 >= 1) return `${Number(amount / 1000).toFixed(2)}K`;

    // < 100K
    return `${Number(amount).toFixed(2)}`;
  };

  const showCreateButton = () =>
    showTextArea ||
    (props.isPersonalPurpose && Able.purposes.personal == "") ||
    (!props.isPersonalPurpose && Able.purposes.community == "");

  const canSetPurpose = () => purpose.length <= 200;

  const handlePurpose = async () => {
    const data = props.isPersonalPurpose
      ? await Able.contract.methods.SetPersonalPurpose(purpose).encodeABI()
      : await Able.contract.methods.SetCommunityPurpose(purpose).encodeABI();

    const params = await buildTransaciont(
      addressAccount,
      ABLE_CONTRACT_ADDRESS,
      data
    );

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (loading) {
              window.document.getElementById('loading').innerHTML = "Esperando confirmacion de Red...";
            }
            if (rec) {
              await uploadPorpouses();
              setLoading(false);
              setShowTextArea(false);
              clearInterval(interval);
            }

            if (err) {
              clearInterval(interval);
              console.log("ERROR: ", err);
              setLoading(false);
              setShowTextArea(false);
            }
          });
        }, 500);
      });
  };

  return (
    <VStack w={{ lg: "20%", md: "95%", sm: "95%", base: "95%" }}>
      <Text
        fontWeight="bold"
        fontSize={{ xl: "25px", lg: "20px" }}
        color={blue}
      >
        {props.isPersonalPurpose ? "Propósito Personal" : "Recordatorios"}
      </Text>

      {loading ? (
        <Loading />
      ) : (
        <>
          {props.isPersonalPurpose ? (
            Able.purposes.personal == "" || showTextArea ? (
              <>
                <Textarea
                  w="full"
                  borderColor={blue}
                  value={purpose}
                  onChange={(e) => setPurpose(e.currentTarget.value)}
                  color="white"
                />
                <Text color="white">{`${purpose.length} / 200 caracteres`}</Text>
              </>
            ) : (
              <Text color={pink} fontSize="25px">
                {Able.purposes.personal}
              </Text>
            )
          ) : Able.purposes.community == "" || showTextArea ? (
            <>
              <Textarea
                w="full"
                value={purpose}
                onChange={(e) => setPurpose(e.currentTarget.value)}
                color="white"
              />
              <Text color="white">{`${purpose.length} / 200 caracteres`}</Text>
            </>
          ) : (
            <Text color={pink} fontSize="25px">
              {Able.purposes.community}
            </Text>
          )}

          {props.isPersonalPurpose ? (
            <HStack w="full">
              <Spacer />

              <Button
                onClick={
                  showCreateButton()
                    ? handlePurpose
                    : () => setShowTextArea(true)
                }
                variant="actionDapp"
                isDisabled={!canSetPurpose()}
              >
                {showCreateButton() ? "Crear Propósito" : "Editar"}
              </Button>

              {showTextArea ? (
                <Button
                  onClick={() => setShowTextArea(false)}
                  variant="alertDapp"
                >
                  <CloseIcon />
                </Button>
              ) : null}
            </HStack>
          ) : (
            <HStack w="full">
              <Button
                onClick={
                  showCreateButton()
                    ? handlePurpose
                    : () => setShowTextArea(true)
                }
                variant="actionDapp"
                isDisabled={!canSetPurpose()}
              >
                {showCreateButton()
                  ? props.isPersonalPurpose
                    ? "Crear Propósito"
                    : "Crear Recordatorio"
                  : "Editar"}
              </Button>

              {showTextArea ? (
                <Button
                  onClick={() => setShowTextArea(false)}
                  variant="alertDapp"
                >
                  <CloseIcon />
                </Button>
              ) : null}

              <Spacer />
            </HStack>
          )}
        </>
      )}
    </VStack>
  );
};