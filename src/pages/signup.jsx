import {
  Flex,
  Card,
  Heading,
  TextField,
  Box,
  Button,
  Text,
} from "@radix-ui/themes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetcher } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher.data?.error === false) {
      navigate("/dashboard");
    }
  }, [fetcher?.data?.error]);
  return (
    <Flex width={"100vw"} height={"100vh"} align={"center"} justify={"center"}>
      <Card>
        <fetcher.Form className="px-5 py-5" method="post">
          <Heading as="h1">Sign up</Heading>
          <Box mt={"5"}>
            <Heading as="h6" size="2" weight={"medium"}>
              Name
            </Heading>
            <TextField.Root
              placeholder="Enter your name"
              className="min-w-64"
              mt={"2"}
              name="name"
              type="text"
              required
            >
              <TextField.Slot></TextField.Slot>
            </TextField.Root>
          </Box>
          <Box mt={"5"}>
            <Heading as="h6" size="2" weight={"medium"}>
              Email
            </Heading>
            <TextField.Root
              placeholder="Enter your email address"
              className="min-w-64"
              mt={"2"}
              name="email"
              type="email"
              required
            >
              <TextField.Slot></TextField.Slot>
            </TextField.Root>
          </Box>
          <Box mt={"5"}>
            <Heading as="span" size="2" weight={"medium"}>
              Password
            </Heading>
            <TextField.Root
              placeholder="Enter your Password"
              className="min-w-80"
              mt={"2"}
              type="password"
              name="password"
              required
            >
              <TextField.Slot></TextField.Slot>
            </TextField.Root>
          </Box>
          {fetcher.data?.error && (
            <Text
              color="red"
              align={"center"}
              className="w-full block"
              mt={"4"}
              size={"2"}
            >
              {fetcher?.data?.errorMsg || "Something went wrong"}
            </Text>
          )}
          <Flex mt={"6"} justify={"end"}>
            <Button
              variant="soft"
              type="button"
              onClick={() => {
                navigate("/signin");
              }}
              disabled={
                fetcher.state === "loading" || fetcher.state === "submitting"
              }
            >
              Sign in
            </Button>
            <Button
              type="submit"
              ml={"3"}
              loading={
                fetcher.state === "loading" || fetcher.state === "submitting"
              }
            >
              Sign up
            </Button>
          </Flex>
        </fetcher.Form>
      </Card>
    </Flex>
  );
}
