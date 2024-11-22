import { Flex, Card, Heading, TextField, Box, Button } from "@radix-ui/themes";
import { Form, useNavigation, useNavigate } from "react-router-dom";

export const submitSignInFormAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);
  return redirect("/dashboard");
};
export default function SignIn() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  return (
    <Flex width={"100vw"} height={"100vh"} align={"center"} justify={"center"}>
      <Card>
        <Form className="px-5 py-5" method="post">
          <Heading as="h1">Sign in</Heading>
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
          <Flex mt={"6"} justify={"end"}>
            <Button
              variant="soft"
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create an account
            </Button>
            <Button
              type="submit"
              ml={"3"}
              loading={navigation.state !== "idle"}
            >
              Sign in
            </Button>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
}
