import {
  HStack,
  VStack,
  Spacer,
  Box,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface IERC2O {
  image: string;
  symbol: string;
  amount: number;
  firstAmount: number;
}

export const ERC20 = ({ props }: { props: IERC2O }) => {
  const color = useColorModeValue("pink.300", "pink.400");

  const formatAmount = (amount: number): string => {
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

  const getPercent = (): number => {
    if (props.firstAmount == 0) return 0;
    return ((props.amount - props.firstAmount) / props.firstAmount) * 100;
  };

  // return props.symbol == "ABLE" ? (
  //   <VStack zIndex={10}>
  //     <Text color='white' fontSize='40px' >{props.amount}</Text>
  //     <Image src={props.image} alt="erc20IMG" boxSize="40px" />
  //   </VStack>
  // ) : (
  //   <VStack zIndex={10}>
  //     <Image src={props.image} alt="erc20IMG" boxSize="40px" />
  //     <Text color='white' fontSize={Number(props.amount < 1000000 ? '40px' : '20px')}>{props.amount}</Text>
  //   </VStack>
  // );

  return(
      <VStack zIndex={10}>
        <Text color='white' fontSize={{ lg: "24px", md: "22px", sm: "20px", base: "18px" }} >{props.amount}</Text>
        <Image src={props.image} alt="erc20IMG" boxSize="40px" />
        <Text color='white' fontSize={{ lg: "24px", md: "22px", sm: "20px", base: "18px" }} >{props.symbol}</Text>
      </VStack>
    )
};
