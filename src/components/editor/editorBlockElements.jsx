import { Code, Blockquote, Text, Heading } from "@radix-ui/themes";
import { ALIGNMENT_TYPES } from "./editorUtils";

const CodeElement = (props) => {
  return <Code {...props.attributes}>{props.children}</Code>;
};
const BlockQuoteElement = (props) => {
  return <Blockquote {...props.attributes}>{props.children}</Blockquote>;
};
const NumberedListElement = (props) => {
  return (
    <ol {...props.attributes} className="list-decimal">
      {props.children}
    </ol>
  );
};
const BulletedListElement = (props) => {
  return (
    <ul {...props.attributes} className="list-disc">
      {props.children}
    </ul>
  );
};
const ListItemElement = (props) => {
  return <li {...props.attributes}>{props.children}</li>;
};
const AlignmentElement = (props) => {
  return (
    <Text
      {...props.attributes}
      align={props.element.alignType || ALIGNMENT_TYPES.LEFT}
      as="p"
    >
      {props.children}
    </Text>
  );
};
const H1Element = (props) => {
  return (
    <Heading size={"9"} as="h1" {...props.attributes}>
      {props.children}
    </Heading>
  );
};
const H2Element = (props) => {
  return (
    <Heading size={"8"} as="h2" {...props.attributes}>
      {props.children}
    </Heading>
  );
};
const H3Element = (props) => {
  return (
    <Heading size={"7"} as="h3" {...props.attributes}>
      {props.children}
    </Heading>
  );
};
const H4Element = (props) => {
  return (
    <Heading size={"6"} as="h4" {...props.attributes}>
      {props.children}
    </Heading>
  );
};
const H5Element = (props) => {
  return (
    <Heading size={"5"} as="h5" {...props.attributes}>
      {props.children}
    </Heading>
  );
};
const H6Element = (props) => {
  return (
    <Heading size={"4"} as="h6" {...props.attributes}>
      {props.children}
    </Heading>
  );
};
const CaptionElement = (props) => {
  return (
    <Text as="p" size={"1"} {...props.attributes}>
      {props.children}
    </Text>
  );
};

const DefaultElement = (props) => {
  return (
    <Text {...props.attributes} as="p" size={"3"}>
      {props.children}
    </Text>
  );
};

export const renderEditorElement = (props) => {
  switch (props.element.type) {
    case "code":
      return <CodeElement {...props} />;
    case "blockQuote":
      return <BlockQuoteElement {...props} />;
    case "numberedList":
      return <NumberedListElement {...props} />;
    case "bulletedList":
      return <BulletedListElement {...props} />;
    case "listItem":
      return <ListItemElement {...props} />;
    case "Heading 1":
      return <H1Element {...props} />;
    case "Heading 2":
      return <H2Element {...props} />;
    case "Heading 3":
      return <H3Element {...props} />;
    case "Heading 4":
      return <H4Element {...props} />;
    case "Heading 5":
      return <H5Element {...props} />;
    case "Heading 6":
      return <H6Element {...props} />;
    case "Alignment":
      return <AlignmentElement {...props} />;
    case "Caption":
      return <CaptionElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};
