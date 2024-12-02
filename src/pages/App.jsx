import { Flex, Text, Button, Box, Heading } from "@radix-ui/themes";
import NavBar from "../components/navbar";
import { DotFilledIcon } from "@radix-ui/react-icons";
import "./app.css";

export default function App() {
  return (
    <Flex maxWidth="100vw" justify={"center"}>
      <NavBar />
      <Flex
        width={"100vw"}
        height={"100vh"}
        justify={"center"}
        align={"center"}
        direction={"column"}
        gap={"5"}
      >
        <Box className="gradientBlock absolute right-72 top-24"></Box>
        <Box className="gradientBlock2 absolute left-72 top-56"></Box>
        <Heading as="h2" size={"9"} align={"center"} className="max-w-2xl">
          A INTELLIGENT SYSTEM TO EMPOWER LEARNING 
        </Heading>
        <Flex gap={"1"} align={"center"}>
          <Heading size={"2"} color="gray">
            QUICK
          </Heading>
          <DotFilledIcon color="gray" />
          <Heading color="gray" size={"2"}>
            SMART{" "}
          </Heading>
          <DotFilledIcon color="gray" />
          <Heading color="gray" size={"2"}>
            PERSONALIZED LEARNING{" "}
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}
