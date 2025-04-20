import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";
import MobileNav from "../../components/MobileNav/MobileNav";

const AuthPage = () => {
	return (<>
	<Flex justifyContent={"space-between"} borderBottom={"1px solid"} borderColor={"gray.500"} py={2} px={4} >

			<MobileNav/>
	</Flex>
	
		<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
			<Container maxW={"container.md"} padding={0}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					
					<VStack spacing={4} align={"stretch"}>
						<AuthForm />
						
						
					</VStack>
				</Flex>
			</Container>
		</Flex>
	</>
	);
};

export default AuthPage;
