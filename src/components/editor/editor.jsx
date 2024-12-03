import React, { useState, useCallback, useEffect } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { getSelectedText, USER_EDITOR_DOC_TEMPLATE } from "./editorUtils";
import Toolbar from "./toolbar";
import { Box, ContextMenu, ScrollArea, Spinner, Text } from "@radix-ui/themes";
import Leaf from "./editorLeafElements";
import { renderEditorElement } from "./editorBlockElements";
import { useLocation } from "react-router-dom";
import { getUserEditorDoc, updateUserEditorDoc } from "../../utils";
import EditorContextMenu from "./editorContextMenu";
import ResponseDialog from "../responeDialog";
import { getResponseFromChatBot } from "../../utils/chatBotUtils";

export default function Editor() {
  const location = useLocation();
  const [editor] = useState(() => withReact(createEditor()));
  const defaultResponseObj = {
    openResponseModal: false,
    response: "",
    loading: false,
    error: false,
  };
  const [responseObj, setResponseObj] = useState(defaultResponseObj);
  const [editorObj, setEditorObj] = useState({
    loading: true,
    error: false,
    saveStatus: "initial",
  });
  const getUserEditorDocument = async () => {
    const res = await getUserEditorDoc({
      userEditorDocId: location?.state?.userEditorDocId,
    });
    if (!res.error?.error) {
      return res?.userEditorDoc;
    } else {
      return USER_EDITOR_DOC_TEMPLATE;
    }
  };
  const getSetUserEditorDoc = async () => {
    const currentUserEditorDocId = location?.state?.userEditorDocId;
    if (!currentUserEditorDocId) {
      setEditorObj({ ...editorObj, error: true, loading: false });
    }
    const content = localStorage.getItem("content");
    if (content !== null) {
      const { userEditorDocId, data } = JSON.parse(content);
      if (userEditorDocId === currentUserEditorDocId) {
        editor.children = data;
        setEditorObj({ ...editorObj, loading: false });
      } else {
        const data = await getUserEditorDocument({ currentUserEditorDocId });
        editor.children = data;
        setEditorObj({ ...editorObj, loading: false });
      }
    } else {
      const data = await getUserEditorDocument({ currentUserEditorDocId });
      editor.children = data;
      setEditorObj({ ...editorObj, loading: false });
    }
  };
  const handleSaveClick = async () => {
    localStorage.setItem(
      "content",
      JSON.stringify({
        userEditorDocId: location?.state?.userEditorDocId,
        data: editor.children,
      })
    );
    const result = await updateUserEditorDoc({
      userEditorDocId: location?.state?.userEditorDocId,
      data: editor.children,
    });
    console.log(result);
    if (!result?.error?.error) {
      setEditorObj({ ...editorObj, saveStatus: "saved" });
    } else {
      setEditorObj({ ...editorObj, saveStatus: "unsaved" });
    }
  };
  useEffect(() => {
    getSetUserEditorDoc();
  }, [location?.state?.userEditorDocId]);
  const renderElement = useCallback(renderEditorElement, []);
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);
  const handleContextMenuItemClick = async ({ type, subType }) => {
    setResponseObj((prevResponseObj) => ({
      ...prevResponseObj,
      loading: true,
      openResponseModal: true,
    }));
    const text = getSelectedText(editor);
    if (text === "") {
      setResponseObj({
        ...responseObj,
        loading: false,
        openResponseModal: true,
        response: "Unable to answer query",
      });
    } else {
      const res = await getResponseFromChatBot({ type, subType, text });
      if (res?.error) {
        setResponseObj({
          ...responseObj,
          error: true,
          loading: false,
          openResponseModal: true,
        });
      } else {
        setResponseObj({
          ...responseObj,
          response: res,
          loading: false,
          openResponseModal: true,
        });
      }
    }
  };
  return (
    <Box className="h-screen max-w-full pt-20" p={"6"}>
      <Slate editor={editor} initialValue={USER_EDITOR_DOC_TEMPLATE}>
        <Toolbar
          editor={editor}
          handleSaveClick={handleSaveClick}
          saveStatus={editorObj.saveStatus}
        />
        <Box height={"100%"}>
          <ScrollArea
            className="p-2"
            type="auto"
            scrollbars="both"
            style={{ width: "672px", maxWidth: "672px" }}
          >
            {editorObj.loading ? (
              <Spinner />
            ) : editorObj.error ? (
              <Text size={"1"} color="red">
                Something went wrong
              </Text>
            ) : (
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <Editable
                    className="outline-none"
                    placeholder="Type something..."
                    renderLeaf={renderLeaf}
                    renderElement={renderElement}
                  />
                </ContextMenu.Trigger>
                <EditorContextMenu
                  handleContextMenuItemClick={handleContextMenuItemClick}
                />
              </ContextMenu.Root>
            )}
          </ScrollArea>
        </Box>
      </Slate>
      <ResponseDialog
        responseObj={responseObj}
        setResponseObj={setResponseObj}
        editor={editor}
      />
    </Box>
  );
}
