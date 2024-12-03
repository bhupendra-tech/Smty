import Markdown from "https://esm.sh/react-markdown@9";

import { CopyIcon, PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { SYSTEM_PROMPTS, TYPE_TEXT_COLOR, TYPES, ROLES } from "../utils";
import copy from "copy-to-clipboard";

const createPromptSession = async () => {
  const { available } = await ai.languageModel.capabilities();
  if (available !== "no") {
    const session = await ai.languageModel.create({
      systemPrompts: SYSTEM_PROMPTS.PROMPT,
    });
    return session;
  }
  return null;
};
export default function ChatBox() {
  const defaultInputObj = {
    msg: "",
    role: ROLES.USER,
    meta: {
      type: TYPES.PROMPT,
    },
    responseLoading: false,
    errorMsg: null,
    responseHtml: "",
  };
  const [resetSession, setResetSession] = useState(false);
  const [chatConversation, setChatConversation] = useState([]);
  const [inputObj, setInputObj] = useState(defaultInputObj);
  const [promptModelSession, setPromptModelSession] = useState(null);

  const getPromptModelResponse = async () => {
    try {
      if (promptModelSession === null) {
        setInputObj({
          ...inputObj,
          errorMsg: "Model not available or working",
        });
        setChatConversation([
          ...chatConversation,
          {
            ...inputObj,
            errorMsg: "Model not available or working",
          },
        ]);
        return;
      }
      setInputObj(() => ({
        ...inputObj,
        responseLoading: true,
      }));
      const response = await promptModelSession.prompt(inputObj.msg.trim());
      const tempInputObj = {
        ...inputObj,
        msg: response,
        role: ROLES.MODEL,
        meta: {
          type: TYPES.RESPONSE,
        },
      };
      setChatConversation([...chatConversation, inputObj, tempInputObj]);
      setInputObj(defaultInputObj);
    } catch (error) {
      setInputObj({ ...inputObj, errorMsg: "Something went wrong" });
    }
  };
  useEffect(() => {
    async function createSession() {
      const session = await createPromptSession();
      if (session === null) {
        setPromptModelSession(null);
      } else setPromptModelSession(session);
    }
    createSession();
  }, [resetSession]);
  return (
    <Card className="h-full relative w-full px-0 py-0">
      <Flex justify={"end"} mb={"0"} p={"1"}>
        <Tooltip content="chatbot will forgot this conversation">
          <Button
            variant="outline"
            color="red"
            size={"1"}
            onClick={() => {
              setResetSession(!resetSession);
              setChatConversation([]);
              setInputObj(defaultInputObj);
            }}
          >
            <ReloadIcon />
            Reset Session
          </Button>
        </Tooltip>
      </Flex>
      <ScrollArea
        height={"100%"}
        type="auto"
        scrollbars="vertical"
        className="pr-2 pl-2 pb-20 pt-3"
      >
        {chatConversation?.length === 0 ? (
          <Flex justify={"center"} align={"center"} height={"100%"}>
            <Heading as="h2" size={"8"} color="gray" weight={"medium"}>
              Ask something
            </Heading>
          </Flex>
        ) : (
          chatConversation.map((item, index) => {
            const { role, msg, meta, errorMsg } = item;
            return (
              <Card
                key={`${index}-chat-element`}
                className={`${
                  errorMsg !== null
                    ? "bg-[#ff6863] text-gray-900"
                    : role === "user"
                    ? "bg-transparent"
                    : "bg-900"
                } p-2 my-3`}
              >
                <Flex justify={"end"} gapX={"2"} align={"center"}>
                  <Text
                    size={"1"}
                    className="block"
                    align={"right"}
                    color={TYPE_TEXT_COLOR[meta?.type]}
                  >
                    {meta?.type}
                  </Text>
                  <IconButton
                    variant="surface"
                    color="gray"
                    size={"1"}
                    onClick={() => copy(msg)}
                  >
                    <CopyIcon />
                  </IconButton>
                </Flex>
                <Box>
                  {errorMsg !== null ? (
                    <Text size={"3"}>errorMsg</Text>
                  ) : (
                    <Markdown>{msg}</Markdown>
                  )}
                </Box>
              </Card>
            );
          })
        )}
      </ScrollArea>
      <Box position={"absolute"} bottom={"0"} width={"100%"}>
        <Box className="bg-900 p-2">
          <TextField.Root
            placeholder="Ask something..."
            value={inputObj.msg}
            onChange={(e) => {
              setInputObj({ ...inputObj, msg: e.currentTarget.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getPromptModelResponse();
              }
            }}
          >
            <TextField.Slot side="right">
              <IconButton
                variant="ghost"
                loading={inputObj.responseLoading}
                onClick={() => {
                  getPromptModelResponse();
                }}
              >
                <PaperPlaneIcon />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </Box>
      </Box>
    </Card>
  );
}
