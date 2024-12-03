import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkSlate from "remark-slate";

const markdownToSlate = async (markdown) => {
  const slateContent = await unified()
    .use(remarkParse)
    .use(remarkSlate)
    .process(markdown);
  return slateContent.result;
};

import { Editor, Transforms, Element, Text, Path, Range } from "slate";
export const USER_EDITOR_DOC_TEMPLATE = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export const DEFAULT_TOOLBAR_CONFIG = [
  {
    textColor: "text-800",
  },
  {
    textBackground: "bg-100",
  },
  {
    paragraphFontSize: "text-sm",
  },
];

export const ALIGNMENT_TYPES = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
  JUSTIFY: "justify",
};
function getNodeWithCaret(editor) {
  const { selection } = editor;

  if (!selection) {
    return null; // No selection, no node with caret
  }

  const [anchorNode] = Editor.node(editor, selection.anchor.path);

  if (Element.isElement(anchorNode)) {
    return anchorNode; // Caret is within an element
  } else {
    return Editor.parent(editor, selection.anchor.path); // Caret is within a text node
  }
}
export async function replaceSelectedText({
  editor,
  newText,
  replace = false,
}) {
  const newNodes = await markdownToSlate(newText);
  console.log(newNodes);
  // Transforms.delete(editor, {
  //   match: (n) => !Editor.isEditor(n),
  // });
  // Transforms.insertNodes(editor, newNodes);
  if (replace) {
    Transforms.delete(editor, {
      match: (n) => !Editor.isEditor(n),
    });
    Transforms.insertNodes(editor, newNodes);
  } else {
    Transforms.insertNodes(editor, newNodes, { at: [editor.children.length] });
  }
}
export function getSelectedText(editor) {
  let para = "";
  const { selection } = editor;
  const { anchor, focus } = selection;
  let startIndexOfText, endIndexOfText;
  if (Range.isForward(selection)) {
    startIndexOfText = anchor?.offset;
    endIndexOfText = focus?.offset;
  } else {
    startIndexOfText = focus?.offset;
    endIndexOfText = anchor?.offset;
  }
  let indexBeforeLastString = 0;
  for (const [node] of Editor.nodes(editor, {
    match: (n) => Text.isText(n),
  })) {
    indexBeforeLastString = para.length;
    para += node?.text + "\n" || "";
  }
  if (Path.equals(anchor?.path, focus?.path)) {
    para = para.substring(startIndexOfText, endIndexOfText);
  } else {
    para = para.substring(
      startIndexOfText,
      indexBeforeLastString + endIndexOfText
    );
  }
  return para.trim();
}
export const CustomEditor = {
  isMarkActive({ editor, format }) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },
  isBlockActive({ editor, format }) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });
    return !!match;
  },
  toggleMark({ editor, format }) {
    const isActive = CustomEditor.isMarkActive({ editor, format });
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },
  toggleBlock({ editor, format, alignType }) {
    const currentNodeAlignType = getNodeWithCaret(editor)?.[0]?.alignType;
    const isActive = CustomEditor.isBlockActive({ editor, format });
    Transforms.setNodes(
      editor,
      {
        type:
          isActive &&
          (!currentNodeAlignType === alignType || currentNodeAlignType === "")
            ? null
            : format,
        alignType,
      },
      { match: (n) => Editor.isBlock(editor, n) && Element.isElement(n) }
    );
  },

  toggleList({ editor, format }) {
    const isActive = CustomEditor.isListActive({ editor, format });
    if (isActive) {
      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
        split: true,
      });
      Transforms.setNodes(
        editor,
        {
          type: null,
        },
        {
          match: (n) =>
            Editor.isBlock(editor, n) &&
            Element.isElement(n) &&
            !Editor.isEditor(n),
        }
      );
    } else {
      Transforms.setNodes(
        editor,
        {
          type: "listItem",
        },
        {
          match: (n) =>
            Editor.isBlock(editor, n) &&
            Element.isElement(n) &&
            !Editor.isEditor(n),
        }
      );
      Transforms.wrapNodes(editor, { type: format, children: [] });
    }
  },

  isListActive: ({ editor, format }) => {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    });
    return !!match;
  },
};

export const fontSizeList = [
  {
    icon: "T",
    name: "Text",
  },
  {
    icon: "CC",
    name: "Caption",
    format: "caption",
  },
  {
    icon: "H1",
    name: "Heading 1",
    format: "h1",
  },
  {
    icon: "H2",
    name: "Heading 2",
    format: "h2",
  },
  {
    icon: "H3",
    name: "Heading 3",
    format: "h3",
  },
  {
    icon: "H4",
    name: "Heading 4",
    format: "h4",
  },
  {
    icon: "H5",
    name: "Heading 5",
    format: "h5",
  },
  {
    icon: "H6",
    name: "Heading 6",
    format: "h6",
  },
];

// slate automatically determines which node or nodes to change this works in following work
// first it gets the match nodes than it applies change to only match nodes that are selected
