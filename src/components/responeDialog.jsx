import {
  Box,
  Dialog,
  Spinner,
  Button,
  Flex,
  Text,
  ScrollArea,
} from "@radix-ui/themes";
import { replaceSelectedText } from "./Editor/editorUtils";
export default function ResponseDialog({
  responseObj,
  setResponseObj,
  editor,
}) {
  return (
    <Dialog.Root open={responseObj?.openResponseModal}>
      <Dialog.Content className="max-w-96">
        <Dialog.Title>Response</Dialog.Title>
        {responseObj?.loading ? (
          <Spinner />
        ) : responseObj?.error ? (
          "Something Went Wrong"
        ) : (
          <ScrollArea
            scrollbars="vertical"
            type="auto"
            style={{ height: "30vh" }}
          >
            <Text size={"2"}>{responseObj?.response}</Text>
          </ScrollArea>
        )}
        <Flex gap="3" mt="4" justify="end">
          <Button
            variant="soft"
            color="gray"
            onClick={() => {
              setResponseObj({
                ...responseObj,
                openResponseModal: false,
                error: false,
                loading: false,
              });
            }}
          >
            Close
          </Button>
          {!responseObj?.error && (
            <Button
              onClick={() => {
                replaceSelectedText({ editor, newText: responseObj.response });
                setResponseObj({ ...responseObj, openResponseModal: false });
              }}
            >
              Paste in editor
            </Button>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
