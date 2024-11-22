import { Button, Flex } from "@radix-ui/themes";
import Logo from "./logo";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Flex justify={"between"} align={"center"} p={"4"}>
      <Logo className={"h-8"} />
      <Flex gap={"3"}>
        <Button
          type="button"
          variant="surface"
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
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
}
