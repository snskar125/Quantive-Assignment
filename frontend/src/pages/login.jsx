import { Center, VStack,useToast, FormControl, Text, FormLabel, Input, Button, IconButton, HStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios"
import { ViewIcon,ViewOffIcon } from "@chakra-ui/icons"
import AppContext from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/appbar";

export default function Login() {

    const [config, setConfig] = useState({ loading: false, showPass: false })
    const [form, setForm] = useState({ username: "", password: "" })
    const toast = useToast()
    const navigate = useNavigate()
    const {dispatch} = useContext(AppContext)

    async function handleSubmit(e){
        e.preventDefault()
        
        try{
            const res = await axios.post("/api/user/login",form)
            localStorage.setItem("QUANTIVE_TOKEN",res.data.token)
            console.log(res.data.token);
            dispatch({type:"LOAD_TOKEN",payload:res.data.token})
            toast({
                title:"Login Successful",
                status : "success",
                duration : 1500
            })
            setForm({ username: "", password: "" })
            navigate("/dashboard")
        }
        catch (e) {
            toast({
                title: e.response.data.message ? e.response.data.message : "Something went Wrong",
                status: "error",
                duration: 1500
            })
        }
    }

    return (
        <>
        <Appbar/>
        <Center color="gray.700" mt="50px" w="100%" p={5}>
            <VStack spacing={7}>
                <Text fontWeight={700}
                    fontFamily="'Poppins', sans-serif"
                    fontSize={25}>Login to Your Account</Text>
                <form onSubmit={handleSubmit}>
                <VStack bg="gray.50" boxShadow="md" p={4} spacing={4}
                    border="2px solid lightblue"
                    mx="auto"
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
                        <HStack w="100%">
                            <Input rounded={3} type={config.showPass ? "text" : "password"}
                                value={form.password}
                                bg="gray.100"
                                onChange={e => { setForm({ ...form, password: e.target.value }) }}
                                _placeholder={{ color: "gray.400" }}
                                borderColor="blue.200" size="lg" placeholder="Password" />
                            <IconButton bg={config.showPass ? "red.200" : "green.200"} rounded={3}
                                size="lg" icon={config.showPass ? <ViewIcon /> : <ViewOffIcon/>}
                                onClick={() => setConfig({ ...config, showPass: !config.showPass })}
                            />
                        </HStack>
                    </FormControl>
                    <Button
                        type="submit" bg="blue.300" isLoading={config.loading}
                        color="white" size="lg" w="100%"
                        fontFamily="'Poppins', sans-serif"
                        _hover={{ bg: "blue.400" }} rounded={3}
                    >
                        Login ✅
                    </Button>
                </VStack>
                </form>
            </VStack>
        </Center>
        </>
    )

}