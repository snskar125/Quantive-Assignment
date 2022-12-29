import { Center, Heading,VStack, Button,HStack } from "@chakra-ui/react";
import Appbar from "../components/appbar"

export default function Home() {

    return (
        <>
        <Appbar/>
        <Center color="black" minH="60vh">
        <VStack spacing={5}>
            <Heading
            fontSize={{base:30,md:40}}
            px={3}
            textAlign="center"
            fontFamily="'Poppins', sans-serif" >
                Quantive Assignment Submission
            </Heading>
            <HStack spacing={5}>
                <Button size="lg"
                _hover={{bg:"gray.100"}}
                onClick={()=>{window.open("https://quantive.com/","_blank")}}
                border="2px solid black" rounded="full">Quantive</Button>
                <Button size="lg"
                onClick={()=>{window.open("https://snskar125.site/","_blank")}} 
                rounded="full" bg="blue.400" color="white"
                _hover={{bg:"blue.600"}}
                >Sanskar ↗️</Button>
            </HStack>
        </VStack>
        </Center>
        </>
    )
}