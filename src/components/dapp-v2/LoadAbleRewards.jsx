import React from "react";
import { useProvider } from "../../context";
import { Loading } from "./loading";
import { Button } from "@chakra-ui/react";

export const LoadAbleRewards = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  // Context
  const { handleLoadAbleRewards } = useProvider();
  // Methods
  const handleLoader = async () => {
    setLoading(true);
    await handleLoadAbleRewards();
    setLoading(false);
  };
  // Component
  return loading ? (
    <Loading />
  ) : (
    <Button variant="actionDapp" onClick={handleLoader}>
      Cargar Premio Able
    </Button>
  );
};
