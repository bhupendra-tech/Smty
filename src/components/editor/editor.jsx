import React, { useState, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { USER_EDITOR_DOC_TEMPLATE } from "./editorUtils";
import Toolbar from "./toolbar";
import { Box, ScrollArea } from "@radix-ui/themes";
import Leaf from "./editorLeafElements";
import { renderEditorElement } from "./editorBlockElements";

export default function Editor() {
  const renderElement = useCallback(renderEditorElement, []);
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <Box className="h-screen max-w-fit pt-20" p={"6"}>
      <Slate editor={editor} initialValue={USER_EDITOR_DOC_TEMPLATE}>
        <Toolbar editor={editor} />
        <Box height={"100%"}>
          <ScrollArea
            className="p-2"
            type="auto"
            scrollbars="both"
            style={{ minWidth: "672px", maxWidth: "672px" }}
          >
            <Editable
              className="outline-none"
              placeholder="Type something..."
              renderLeaf={renderLeaf}
              renderElement={renderElement}
            />
          </ScrollArea>
        </Box>
      </Slate>
    </Box>
  );
}
