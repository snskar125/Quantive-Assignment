import { HStack,Text,Spinner, Center, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardServices";

export default function DashboardItem({item,token}){
    const [data,setData] = useState({title:"",columns:""})
    const [loading,setLoading] = useState(false)

    const toast = useToast()

    useEffect(()=>{
        setLoading(true)
        getDashboardStats(token,item.email,item.sheetId,item.tabId)
        .then(res=>setData(res))
        .catch(e=>toast({title:"Something went Wrong",status:"error",duration:1500}))
        .then(()=>setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(loading) return(
        <Center p={4} w="100%" bg="gray.100"><Spinner/></Center>
    )

    return (
        <HStack w="100%" p={3} fontWeight={500} textAlign='center' justify="space-between" bg="gray.100" px={5}>
        <Text w="30%" textAlign="start" fontSize={17}>{data.email}</Text>
        <Text w="30%" textAlign="start" fontSize={17}>{data.sheetTitle}</Text>
        <Text w="30%" textAlign="start" fontSize={17}>{data.tabTitle}</Text>
        <Text w="10%" fontSize={20}>{data.columns}</Text>        
        </HStack>
    )
}