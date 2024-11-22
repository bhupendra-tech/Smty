import { Flex, Heading, Text } from "@radix-ui/themes";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Flex
      height={"100vh"}
      direction={"column"}
      width={"100vw"}
      justify={"center"}
      align={"center"}
      gap={"2"}
    >
      <Heading as="h1" weight={"medium"}>
        Oops!
      </Heading>
      <Text as="p">Sorry, an unexpected error has occurred.</Text>
      <Text as="p">
        <i>{error.statusText || error.message}</i>
      </Text>
    </Flex>
  );
}
