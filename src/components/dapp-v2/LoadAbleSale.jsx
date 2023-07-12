import React from "react";
import { useProvider } from "../../context";
import { Loading } from "./loading";
import { Button } from "@chakra-ui/react";

export const LoadAbleSale = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  // Context
  const { handleLoadAbleSale } = useProvider();
  // Methods
  const handleLoader = async () => {
    setLoading(true);
    await handleLoadAbleSale();
    setLoading(false);
  };
  // Component
  return loading ? (
    <Loading />
  ) : (
    <Button variant="actionDapp" onClick={handleLoader}>
      Cargar Able Sale
    </Button>
  );
};
