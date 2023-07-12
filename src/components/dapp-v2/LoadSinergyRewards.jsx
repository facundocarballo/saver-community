import React from "react";
import { useProvider } from "../../context";
import { Loading } from "./loading";
import { Button } from "@chakra-ui/react";

export const LoadSinergyRewards = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  // Context
  const { handleLoadSinergyRewards } = useProvider();
  // Methods
  const handleLoader = async () => {
    setLoading(true);
    await handleLoadSinergyRewards();
    setLoading(false);
  };
  // Component
  return loading ? (
    <Loading />
  ) : (
    <Button variant="actionDapp" onClick={handleLoader}>
      Cargar Recompensas
    </Button>
  );
};
