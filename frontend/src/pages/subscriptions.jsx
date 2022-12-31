import { Center, SimpleGrid, Text, Button, VStack, Heading, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc"
import { useGoogleLogin } from "@react-oauth/google"
import LoginNav from "../components/loginNav";
import AppContext from "../context/appContext";
import { getSubscriptions, addNewSubscription } from "../services/subscriptionServices";
import SubscriptionBox from "../components/subscriptionBox";

export default function Subscriptions() {

    const toast = useToast()
    const { dispatch, subscriptions, userToken } = useContext(AppContext)

    function loadSubscriptions() {
        if (!userToken) return
        getSubscriptions(userToken)
            .then(subscriptions => {
                dispatch({ type: "LOAD_SUBSCRIPTIONS", payload: subscriptions })
            })
            .catch(e => toast({ title: e.response.data.message, duration: 1500, status: "error" }))
    }

    async function handleAdd(data) {
        console.log(data)
        try {
            await addNewSubscription(data, userToken)
            toast({ title: "Subscription Added", duration: 1500, status: "success" })
            loadSubscriptions()
        } catch (e) {
            console.log(e)
            toast({ title: e.response.data.message, duration: 1500, status: "error" })
        }
    }

    const addSubscription = useGoogleLogin({
        onSuccess: handleAdd,
        flow: "auth-code",
        scope: "https://www.googleapis.com/auth/drive",
        onError: err => console.log(err),
    })

    useEffect(() => {
        loadSubscriptions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!userToken) return (
        <Center minH="70vh" color="black">
            <Heading>No User Logged-IN</Heading>
        </Center>
    )

    return (
        <>
            <LoginNav />
            <Center color="black">
                <VStack mt={5} spacing={5} w={{ base: "90%", md: "700px" }}>
                    <Text fontSize={20} fontWeight={700} fontFamily="poppins">Subscriptions</Text>
                    <SimpleGrid bg="blue.200" rounded={4} p={2} px={2} ps={{ md: 3 }} alignItems="center" spacing={5} columns={{ base: 1, md: 2 }}>
                        <Text fontWeight={700} textAlign="center" fontFamily="poppins">Add a New Subscription</Text>
                        <Button color="black"
                            bg="white" rounded={2}
                            _hover={{ bg: "blue.100" }}
                            rightIcon={<FcGoogle />} onClick={addSubscription}>
                            Sign-in with Google
                        </Button>
                    </SimpleGrid>
                    {
                        subscriptions.map((subscription, index) =>
                            <SubscriptionBox key={index} token={userToken} subscription={subscription} />)
                    }
                </VStack>
            </Center>
        </>
    )
}