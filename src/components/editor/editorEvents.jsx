import { CustomEditor } from "./editorUtils";
export const handleKeyDown = (event, editor) => {
  if (!event.ctrlKey) {
    return;
  }
  switch (event.key) {
    case "`": {
      event.preventDefault();
      CustomEditor.toggleBlock({ editor, format: "code" });
      break;
    }

    case "b": {
      event.preventDefault();
      CustomEditor.toggleMark({ editor, format: "bold" });
      break;
    }
    case "i": {
      event.preventDefault();
      CustomEditor.toggleMark({ editor, format: "italic" });
      break;
    }
  }
};
