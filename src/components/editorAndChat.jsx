import { Box, Flex, IconButton } from "@radix-ui/themes";
import Editor from "./Editor/editor";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

export default function EditorAndChatComponent() {
  const [isMenuClose, setIsMenuClose] = useState(false);
  return (
    <Box className="w-full overflow-x-scroll">
      <Flex>
        <Box flexGrow={"1"}>
          <Editor />
        </Box>
        <Box position={"relative"}>
          <IconButton
            size={"1"}
            className={`absolute top-4 ${
              isMenuClose ? "right-1" : "-left-2"
            } z-10`}
            color="gray"
            variant="ghost"
            onClick={() => {
              setIsMenuClose(!isMenuClose);
            }}
          >
            {isMenuClose ? <DoubleArrowLeftIcon /> : <DoubleArrowRightIcon />}
          </IconButton>
          <Box
            className={`${
              isMenuClose ? "hidden" : ""
            } bg-red-900 h-screen w-[18rem]`}
          >
            sdf
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
