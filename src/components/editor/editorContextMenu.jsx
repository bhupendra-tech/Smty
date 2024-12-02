import { ContextMenu, Text } from "@radix-ui/themes";
import { SUB_TYPES, TYPES } from "../../utils";
export default function EditorContextMenu({handleContextMenuItemClick}) {
  return (
    <ContextMenu.Content>
      <ContextMenu.Item
        onClick={() => {
          handleContextMenuItemClick({
            type: TYPES.PROMPT,
            subType: SUB_TYPES.ASK_AI,
          });
        }}
      >
        Ask AI
      </ContextMenu.Item>
      <ContextMenu.Sub>
        <ContextMenu.SubTrigger>Summarize</ContextMenu.SubTrigger>
        <ContextMenu.SubContent>
          <ContextMenu.Item disabled>
            {" "}
            <Text size={"1"} color="gray">
              Summarize As
            </Text>
          </ContextMenu.Item>
          <ContextMenu.Item
            onClick={() => {
              handleContextMenuItemClick({
                type: TYPES.SUMMARY,
                subType: SUB_TYPES.SUMMARY_LIST,
              });
            }}
          >
            List
          </ContextMenu.Item>
          <ContextMenu.Item
            onClick={() => {
              handleContextMenuItemClick({
                type: TYPES.SUMMARY,
                subType: SUB_TYPES.SUMMARY_TLDR,
              });
            }}
          >
            TL;DR
          </ContextMenu.Item>
          <ContextMenu.Item
            onClick={() => {
              handleContextMenuItemClick({
                type: TYPES.SUMMARY,
                subType: SUB_TYPES.SUMMARY_TEASER,
              });
            }}
          >
            Teaser
          </ContextMenu.Item>
          <ContextMenu.Item
            onClick={() => {
              handleContextMenuItemClick({
                type: TYPES.SUMMARY,
                subType: SUB_TYPES.SUMMARY_HEADLINE,
              });
            }}
          >
            Headline
          </ContextMenu.Item>
        </ContextMenu.SubContent>
      </ContextMenu.Sub>
      <ContextMenu.Item
        onClick={() => {
          handleContextMenuItemClick({
            type: TYPES.PROMPT,
            subType: SUB_TYPES.COMPLETE_IT,
          });
        }}
      >
        Complete It
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          handleContextMenuItemClick({
            type: TYPES.PROMPT,
            subType: SUB_TYPES.ELABORATE,
          });
        }}
      >
        Elaborate
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          handleContextMenuItemClick({
            type: TYPES.PROMPT,
            subType: SUB_TYPES.SIMPLIFY,
          });
        }}
      >
        Simplify
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          handleContextMenuItemClick({
            type: TYPES.PROMPT,
            subType: SUB_TYPES.BRIEF,
          });
        }}
      >
        Brief
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          handleContextMenuItemClick({
            type: TYPES.REWRITER,
            subType: SUB_TYPES.FORMALIZE,
          });
        }}
      >
        Formalize
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          handleContextMenuItemClick({
            type: TYPES.REWRITER,
            subType: SUB_TYPES.CASUAL,
          });
        }}
      >
        Make It Casual
      </ContextMenu.Item>
      <ContextMenu.Item
        onClick={() => {
          handleContextMenuItemClick({
            type: TYPES.PROMPT,
            subType: SUB_TYPES.EXTRACT_KEYWORDS,
          });
        }}
      >
        Extract Keywords
      </ContextMenu.Item>
    </ContextMenu.Content>
  );
}
