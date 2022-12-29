import { Center, Text } from "@chakra-ui/react";

export default function Header() {
    return (
        <Center bg="blue.500" p={2}>
            <Text px={3} fontWeight={500}
             color="white">
                Quantive Assignment submitted by <a target="_blank" rel="noreferrer" href="https://snskar125.site/">Sanskar Sharma ↗️</a>
            </Text>
        </Center>
    )
}