import { Flex, Box, Card } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import MenuList from "./menuList";

export default function SideMenu() {
  return (
    <Box px={"1"} py={"2"}>
      <Flex
        position={"relative"}
        direction={"column"}
        height={"100vh"}
        width={"100%"}
      >
        <Card className="px-0 py-0 cursor-pointer rounded-md text-900 absolute w-full">
          <NavLink
            to={""}
            end
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-[#9ceaff] hover:text-700"
                  : "text-50 hover:text-300"
              } w-full block px-2 py-1 text-sm`
            }
          >
            Dashboard{" "}
          </NavLink>
        </Card>
        <Box height={"100%"} mt={"7"}>
          <MenuList />
        </Box>
      </Flex>
    </Box>
  );
}
