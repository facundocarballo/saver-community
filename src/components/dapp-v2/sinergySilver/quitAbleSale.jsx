import React from "react";
import { Button } from "@chakra-ui/react";
import { useProvider } from "../../../context";
import { ABLE_SALE_ADDRESS, buildTransaciont } from "../../../web3/funcs";

export const QuitAbleSale = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Context
  const { AbleSale, addressAccount, SinergySilver, uploadAbleSale } =
    useProvider();
  // Methods
  const handleQuitAbleSale = async () => {
    const data = await AbleSale.contract.methods
      .quit_sell(SinergySilver.favouriteNFT.id)
      .encodeABI();
    const params = await buildTransaciont(
      addressAccount,
      ABLE_SALE_ADDRESS,
      data
    );

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
            window.document.getElementById("loading").innerHTML =
              "Esperando confirmacion de Red...";
            if (err) {
              clearInterval(interval);
              setError(true);
              setLoading(false);
              console.log("ERROR: ", err);
              /// Mostrar en pantalla que ocurrio un error.
            }

            if (rec) {
              clearInterval(interval);
              await uploadAbleSale();
              setLoading(false);
            }
          });
        }, 500);
      });
  };
  // Component
  return (
    <Button variant="actionDapp" onClick={handleQuitAbleSale}>
      SALIR DE VENTA ABLE
    </Button>
  );
};
