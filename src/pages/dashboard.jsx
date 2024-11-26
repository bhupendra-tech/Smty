import { Box, Card, Flex, IconButton } from "@radix-ui/themes";
import Editor from "../components/Editor/editor";
import SideMenu from "../components/sideMenu";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

export function Dashboard() {
  const [isMenuClose, setIsMenuClose] = useState(false);
  return (
    <Flex
      minHeight={"100vh"}
      minWidth={"100vw"}
      justify="between"
      maxHeight={"100vh"}
      maxWidth={"100vw"}
      overflow={"hidden"}
    >
      <IconButton
        size={"1"}
        className={`absolute top-4 ${isMenuClose ? "left-1" : "left-[235px]"} z-10`}
        color="gray"
        variant="ghost"
        onClick={() => {
          setIsMenuClose(!isMenuClose);
        }}
      >
        {isMenuClose ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
      </IconButton>
      <Card className={`${isMenuClose ? "hidden" : ""} min-w-60 px-1 py-1`}>
        <SideMenu />
      </Card>
      <Box className="flex-1">
        <Outlet />
      </Box>
    </Flex>
  );
}
