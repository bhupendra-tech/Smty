import { Box, Flex } from "@radix-ui/themes";
import Editor from "../components/Editor/editor";

export function Dashboard() {
  return (
    <Flex
      minHeight={"100vh"}
      minWidth={"100vw"}
      justify="between"
      maxHeight={"100vh"}
      maxWidth={"100vw"}
      overflow={"hidden"}
    >
      <Box className="bg-red-950" minWidth={"200px"}>
        SideMenu
      </Box>
      <Box className="flex-1">
        <Editor />
      </Box>
    </Flex>
  );
}
