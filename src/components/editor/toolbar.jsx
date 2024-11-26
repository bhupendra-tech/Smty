import { ALIGNMENT_TYPES, CustomEditor } from "./editorUtils";
import { fontSizeList } from "./editorUtils";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  CodeIcon,
  QuoteIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
  ListBulletIcon,
  StrikethroughIcon,
} from "@radix-ui/react-icons";
import { OrderedListIcon } from "../../assets/orderedListIcon";
import {
  Flex,
  IconButton,
  Separator,
  Text,
  Tooltip,
  DropdownMenu,
  Button,
  Box,
  Card,
} from "@radix-ui/themes";
import { useState } from "react";
function Toolbar({ editor }) {
  return (
    <Card className="fixed top-6 z-10">
      <Flex align={"center"} gap={"3"} className="bg-transparent">
        <MarkButton editor={editor} format="bold" icon={<FontBoldIcon />} />
        <MarkButton editor={editor} format="italic" icon={<FontItalicIcon />} />
        <MarkButton
          editor={editor}
          format="underline"
          icon={<UnderlineIcon />}
        />
        <MarkButton
          editor={editor}
          format="strike"
          icon={<StrikethroughIcon />}
        />
        <Separator orientation="vertical" className="bg-700" />
        <MarkButton
          editor={editor}
          format="superScript"
          icon={
            <Text size={"1"}>
              X<sup className="ml-[1px]">2</sup>
            </Text>
          }
        />
        <MarkButton
          editor={editor}
          format="subScript"
          icon={
            <Text size={"1"}>
              X<sub className="ml-[1px]">2</sub>
            </Text>
          }
        />
        <Separator orientation="vertical" className="bg-700" size={"1"} />
        <TextSizeButton editor={editor} />

        <BlockButton editor={editor} format={"code"} icon={<CodeIcon />} />
        <BlockButton
          editor={editor}
          format={"blockQuote"}
          icon={<QuoteIcon />}
        />
        <Separator orientation="vertical" className="bg-700" size={"1"} />
        <BlockButton
          editor={editor}
          format={"numberedList"}
          icon={<OrderedListIcon />}
        />
        <BlockButton
          editor={editor}
          format={"bulletedList"}
          icon={<ListBulletIcon />}
        />
        <Separator orientation="vertical" className="bg-700" size={"1"} />
        <BlockButton
          editor={editor}
          alignType={ALIGNMENT_TYPES.LEFT}
          icon={<TextAlignLeftIcon />}
          format={"Alignment"}
        />
        <BlockButton
          editor={editor}
          alignType={ALIGNMENT_TYPES.CENTER}
          icon={<TextAlignCenterIcon />}
          format={"Alignment"}
        />
        <BlockButton
          editor={editor}
          alignType={ALIGNMENT_TYPES.RIGHT}
          icon={<TextAlignRightIcon />}
          format={"Alignment"}
        />
        <BlockButton
          editor={editor}
          alignType={ALIGNMENT_TYPES.JUSTIFY}
          icon={<TextAlignJustifyIcon />}
          format={"Alignment"}
        />
      </Flex>
    </Card>
  );
}
export default Toolbar;

const MarkButton = ({ editor, format, icon }) => {
  return (
    <Tooltip content={format}>
      <IconButton
        variant="ghost"
        color="gray"
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleMark({ editor, format });
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
const BlockButton = ({ editor, format, icon, alignType = "" }) => {
  return (
    <Tooltip content={format === "Alignment" ? `align ${alignType}` : format}>
      <IconButton
        variant="ghost"
        color="gray"
        onMouseDown={(event) => {
          event.preventDefault();
          if (format === "numberedList" || format === "bulletedList") {
            CustomEditor.toggleList({ editor, format });
          } else {
            CustomEditor.toggleBlock({
              editor,
              format,
              alignType,
              imageSrc: "",
            });
          }
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

const TextSizeButton = ({ editor }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" size={"1"} color="gray">
          <Text size={"1"} mr={"1"}>
            {fontSizeList?.[selectedItem]?.icon}
          </Text>
          {fontSizeList?.[selectedItem]?.name}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {fontSizeList.map((item, index) => {
          const { icon, name } = item;
          return (
            <DropdownMenu.Item
              onClick={() => {
                setSelectedItem(index);
                CustomEditor.toggleBlock({ editor, format: name });
              }}
              key={`${index}-text-size--drop-down-menu-item`}
            >
              <Box mr={"1"}>{icon}</Box>
              {name}
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
// we click on a button in toolbar
// then the method associated with that click is called
// we send the editor object and format
// the format serves a value that will be used to return the block or leaf ex : format for bold is "bold" this gets passed through the leaf if it was code then the render block element would have take care of this
