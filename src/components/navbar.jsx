import { Button, Flex, Box, Card, Heading } from "@radix-ui/themes";
import Logo from "./logo";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Box className="my-2 rounded-md  fixed w-full px-8 py-4 ">
      <Flex justify={"between"} align={"center"}>
        <Logo className={"h-12"} />
        <Flex gap={"3"} align={"center"}>
          <Button
            type="button"
            variant="ghost"
            color="gray"
            className="font-bold"
            onClick={() => {
              navigate("./signin");
            }}
          >
            Sign In
          </Button>
          <Button
            type="button"
            onClick={() => {
              navigate("./signup");
            }}
          >
            Get Started
            <ArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
