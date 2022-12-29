import { HStack, Button, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"
import { HamburgerIcon } from "@chakra-ui/icons";

export default function LoginNav() {
    const navigate = useNavigate()

    function logout(){
        localStorage.removeItem("QUANTIVE_TOKEN")
        navigate("/")
    }

    return (
        <HStack boxShadow="md" p={3} px={5} justify="space-between">
            <Link className="brand">Quantive</Link>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
                <Button bg="gray.50" color="black"
                    onClick={() => { navigate("/dashboard") }}
                    border="2px solid black"
                    _hover={{ bg: "gray.300" }}
                    rounded="full" px={6}>Dashboard</Button>
                <Button bg="gray.50" color="black"
                    onClick={() => { navigate("/subscriptions") }}
                    border="2px solid black"
                    _hover={{ bg: "gray.300" }}
                    rounded="full" px={6}>Subscriptions</Button>
            </HStack>
            <Button bg="red.500"
            color="white"
            onClick={logout}
            _hover={{bg:"red.600"}}
            rounded={3} display={{base:"none",md:"block"}}>Log-Out</Button>
            <Menu>
                <MenuButton justify="center" rounded={2} color="gray.700" icon={<HamburgerIcon fontSize="20px" />} as={IconButton} bg="gray.200" display={{ md: "none" }}>
                </MenuButton>
                <MenuList p={0} rounded={0} border="2px solid gray">
                    <MenuItem color="gray.900"
                        onClick={() => { navigate("/dashboard") }} bg="gray.100">Dashboard</MenuItem>
                    <MenuItem color="gray.900"
                        onClick={() => { navigate("/subscriptions") }} bg="gray.100">Subscriptions</MenuItem>
                    <MenuItem color="gray.900"
                        onClick={logout} bg="gray.100">Log-Out</MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    )
}