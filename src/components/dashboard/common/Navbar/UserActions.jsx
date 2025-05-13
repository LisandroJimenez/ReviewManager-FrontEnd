import React from "react";
import { Stack, Button, IconButton, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar } from "@chakra-ui/react";
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
                <Menu display={{ base: "none", md: "inline-flex" }}> {/* Ocultar en mobile */}
                    <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                        <Avatar size={"sm"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Mi Perfil</MenuItem>
                        <MenuItem>Mis Posts</MenuItem>
                        <MenuItem>Favoritos</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => setIsLoggedIn(false)}>Cerrar Sesión</MenuItem>
                    </MenuList>
                </Menu>
            </>

        </Stack>
    );
}