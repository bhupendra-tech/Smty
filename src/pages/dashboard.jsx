import { Box, Flex } from "@radix-ui/themes";

export function Dashboard() {
  return (
    <Flex minHeight={"100vh"} minWidth={"100vw"} justify="between">
      <Box className="bg-red-950" minWidth={"200px"}>
        SideMenu
      </Box>
      <Box className="flex-1 bg-pink-300">Content</Box>
    </Flex>
  );
}
