import { VStack,HStack,Image,SimpleGrid ,Text,Select,Button,Spinner, useToast} from "@chakra-ui/react"
import { PlusSquareIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"
import { getSheets, getTabs } from "../services/sheetServices"
import { addToDashboard } from "../services/dashboardServices"

export default function SubscriptionBox({subscription,token}){
    
    const [sheetList,setSheetList] = useState([])
    const [tabList,setTabList] = useState([])
    const [loading,setLoading] = useState(false)
    const [sheet,setSheet] = useState({
        sheet : "",
        tab : ""
    })
    const toast = useToast()

    async function handleAdd(){
        try{
        await addToDashboard(sheet.sheet,sheet.tab,subscription.email,token)
        toast({ title: "Added",status:"success",duration:1500 })
        setSheet({sheet:"",tab:""})
        }
        catch(e){
            toast({title:e.response.data.message || "Error" ,status:"error",duration:1500})
        } 
    } 

    const fetchSheetData = async() => {
        setLoading(true)
        try{
        const sheets = await getSheets(token,subscription.email)
        setSheetList(sheets)
        }
        catch (e) {
            toast({ title: "Error", status: "error", duration: 1500 })
        }
        setLoading(false)
    }

    const fetchTabData = async () => {
        setLoading(true)
        try{
        const tabs = await getTabs(token,subscription.email,sheet.sheet)
        setTabList(tabs)
        setSheet({ ...sheet, tab: "" })
        }
        catch(e){
            toast({title:"Error",status:"error",duration:1500})
        }
        setLoading(false)
    }

    useEffect(() => {
        if(sheet.sheet!=="")
        fetchTabData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sheet.sheet])

    useEffect(()=>{
        fetchSheetData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return(
        <VStack spacing={3} w="100%" p={3} pb={loading ? 8 : 3} bg="gray.200" rounded={4}>
            <HStack spacing={5} w="100%">
                <Image src={subscription.picture} rounded="full" width="50px" />
                <Text fontWeight={500}>{subscription.email}</Text>
            </HStack>
            {loading ? <Spinner/> : 
            <SimpleGrid w="100%" spacing={2} columns={{ base: 1, md: 3 }}>
            <Select color="black" value={sheet.sheet}
            rounded={2} disabled={loading}
            onChange={e=>setSheet({...sheet,sheet:e.target.value})}>
                <option value="">-Select Sheet-</option>
                {
                    sheetList.map((sheet,index)=>
                    <option key={index} value={sheet.id}>{sheet.name}</option>)
                }
            </Select>
            <Select  
            rounded={2}value={sheet.tab} 
            disabled={sheet.sheet==="" || loading}
            onChange={e=>setSheet({...sheet,tab:e.target.value})}>
                <option value="">-Select Tab-</option>
                {
                    tabList.map((tab,index)=>
                    <option
                    value={tab.properties.sheetId}
                    key={index}>{tab.properties.title}</option>)
                }
            </Select>
            <Button bg="white" disabled={sheet.tab==="" || sheet.sheet==="" || loading} _hover={{bg:"gray.300"}}
            rounded={2}
            onClick={handleAdd}
            leftIcon={<PlusSquareIcon/>}>Dashboard</Button>
            </SimpleGrid>
            }
        </VStack>
    )
}