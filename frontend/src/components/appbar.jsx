import { HStack, Button, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Appbar() {
    const navigate = useNavigate()

    return (
        <HStack boxShadow="md" p={3} px={5} justify="space-between">
            <Link to="/" className="brand">Quantive</Link>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
                <Button bg="blue.400" color="white"
                    onClick={() => { navigate("/login") }}
                    _hover={{ bg: "blue.600" }}
                    rounded="full" px={6}>Login</Button>
                <Button bg="gray.200" color="black"
                    onClick={() => { navigate("/signup") }}
                    _hover={{ bg: "gray.300" }}
                    rounded="full" px={6}>Signup</Button>
            </HStack>
            <Menu>
                <MenuButton justify="center" rounded={2} color="gray.700" icon={<HamburgerIcon fontSize="20px" />} as={IconButton} bg="gray.200" display={{ md: "none" }}>
                </MenuButton>
                <MenuList p={0} rounded={0} border="2px solid gray">
                    <MenuItem color="gray.900"
                    onClick={() => { navigate("/login") }} bg="gray.100">Login</MenuItem>
                    <MenuItem color="gray.900"
                    onClick={() => { navigate("/signup") }} bg="gray.100">Signup</MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    )
}