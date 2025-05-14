import React from "react";
import { Stack, Button, IconButton, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import Search from "./Search";
import { BellIcon, AddIcon } from "@chakra-ui/icons";

export default function UserActions({ isLoggedIn, setIsLoggedIn }) {
    return (
        <Stack flex={{ base: 1, md: 2 }} justify={"flex-end"} direction={"row"} spacing={6} align="center">
            <Search display={{ base: "none", md: "flex" }} /> {/* Ocultar en mobile */}


            <>


                <IconButton
                    size={"md"}
                    icon={<BellIcon />}
                    aria-label={"Notificaciones"}
                    variant="ghost"
                    display={{ base: "none", md: "inline-flex" }}
                />
            </>

        </Stack>
    );
}