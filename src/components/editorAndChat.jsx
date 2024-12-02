import { Box, Flex, IconButton } from "@radix-ui/themes";
import Editor from "./Editor/editor";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import ChatBox from "./chatBox";
export default function EditorAndChatComponent() {
  const [isMenuClose, setIsMenuClose] = useState(false);
  return (
    <Box className="w-full">
      <Flex>
        <Box flexGrow={"1"} className="max-w-4xl">
          <Editor />
        </Box>
        <Box position={"relative"} className="w-full max-w-sm">
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
          <Box className={`${isMenuClose ? "hidden" : ""}  h-screen w-full `}>
            <ChatBox />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
