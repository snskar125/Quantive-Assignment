import { Center, VStack, FormControl, Text, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import Appbar from "../components/appbar";

export default function Signup() {
    const [config] = useState({ loading: false })
    const [form, setForm] = useState({ username: "", password: "", cpassword: "" })

    const toast = useToast()

    async function handleSubmit(e) {
        
        e.preventDefault()

        if(form.password !== form.cpassword){
            toast({title:"Passwords do not Match",status:"error",duration:1500})
            return
        }
        try{
        const res = await axios.post("/api/user/signup",form)
        if(res.data.id) toast({title:"User Registered Successfully",status:"success",duration:1500})
        setForm({ username: "", password: "", cpassword: "" })
        }
        catch(e){
            toast({
                title: e.response ? (e.response.data.message ? e.response.data.message : "Something went Wrong") : "Something went Wrong",
                status: "error",
                duration: 1500
            })
        }
    
    }

    return (
        <>
            <Appbar />
            <Center color="gray.700" mt="30px" w="100%" p={5}>
                <VStack spacing={7}>
                    <Text fontWeight={700}
                        fontFamily="'Poppins', sans-serif"
                        fontSize={25}>Create a New Account</Text>
                    <form onSubmit={handleSubmit}>
                        <VStack bg="gray.50" boxShadow="md" p={4} spacing={4}
                            border="2px solid lightblue" mx="auto"
                            rounded={6} w={{ base: "95%", md: "350px" }}>
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input rounded={3} type="text"
                                    value={form.username}
                                    bg="gray.100"
                                    onChange={e => { setForm({ ...form, username: e.target.value }) }}
                                    _placeholder={{ color: "gray.400" }}
                                    borderColor="blue.200" size="lg" placeholder="Username" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input rounded={3} type="password"
                                    value={form.password}
                                    bg="gray.100"
                                    onChange={e => { setForm({ ...form, password: e.target.value }) }}
                                    _placeholder={{ color: "gray.400" }}
                                    borderColor="blue.200" size="lg" placeholder="Password" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input rounded={3} type="password"
                                    value={form.cpassword}
                                    bg="gray.100"
                                    onChange={e => { setForm({ ...form, cpassword: e.target.value }) }}
                                    _placeholder={{ color: "gray.400" }}
                                    borderColor="blue.200" size="lg" placeholder="Confirm Password" />
                            </FormControl>
                            <Button
                                type="submit" bg="blue.300" isLoading={config.loading}
                                color="white" size="lg" w="100%"
                                fontFamily="'Poppins', sans-serif"
                                _hover={{ bg: "blue.400" }} rounded={3}
                            >
                                Signup ➕
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Center>
        </>
    )

}