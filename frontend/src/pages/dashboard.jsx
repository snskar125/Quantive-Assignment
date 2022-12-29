import { Center, Heading, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import DashboardItem from "../components/dashboardItem";
import LoginNav from "../components/loginNav";
import AppContext from "../context/appContext";
import { getDashboardItems } from "../services/dashboardServices";

export default function Dashboard(){
    const {userToken,dispatch,dashboard} = useContext(AppContext)

    const toast = useToast()

    async function loadDashboardItems(){
        if(!userToken) return
        try{
        const items = await getDashboardItems(userToken)
        dispatch({
            type:"LOAD_DASHBOARD",
            payload : items
        })
        }
        catch(e){
            toast({title:"Something went Wrong",status:"error",duration:1500})
        }
    }

    useEffect(()=>{
        loadDashboardItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    
    
    if(!userToken) return (
    <Center minH="70vh" color="black">
    <Heading>No User Logged In</Heading>
    </Center>)

    return (
        <>
        <LoginNav/>
        <Center color="black">
        <VStack spacing={5} w={{base:"95%",md:"1000px"}}>
            <Text fontFamily="poppins" fontWeight="700" fontSize={20} mt={5}>Dashboard</Text>
            <VStack w="100%" spacing={1}>   
            <HStack w="100%" 
            color="white"
            fontWeight="500" px={4} py={2} bg="blue.400" fontFamily="poppins">
            <Text textAlign="start" w="30%">Email Id</Text>
            <Text textAlign="start" w="30%">Sheet Title</Text>
            <Text textAlign="start" w="30%">Tab Title</Text>
            <Text textAlign="center" w="10%">Columns</Text>
            </HStack>
                {
                    dashboard.map((item,index)=>
                    <DashboardItem key={index} 
                    token = {userToken}
                    item={item}/>)
                }
            </VStack>
            </VStack>
        </Center>
        </>
    )
}