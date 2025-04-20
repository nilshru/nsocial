import { Box, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";
import MobileNav from "../../components/MobileNav/MobileNav";

// instead of adding the Sidebar component to every page, we can add it only once to the PageLayout component and wrap the children with it. This way, we can have a sidebar on every page except the AuthPage.

const PageLayout = ({ children }) => {
	const { pathname } = useLocation();
	const [user, loading] = useAuthState(auth);
	const canRenderSidebar = pathname !== "/auth" && user;
	const canRenderNavbar = !user && !loading && pathname !== "/auth";

	const checkingUserIsAuth = !user && loading;
	if (checkingUserIsAuth) return <PageLayoutSpinner />;
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const bdrColor = useColorModeValue("gray.50", "whiteAlpha.300");

	return (
		<>
		<Flex flexDir={canRenderNavbar ? "column" : "row"} w={"full"}>
	<Box
					display={{ base: "flex", md: "none" }}
					position="fixed"
									
					w="full"
					bg={bgColor}
					
					borderColor= {bdrColor}
					zIndex={1000}
					px={4}
					py={{base:2, md:4}}
					justifyContent="space-between"
					borderBottom="1px solid"
				>
					<MobileNav />
				</Box>
			{/* sidebar on the left */}
			{canRenderSidebar ? (
				<Box w={{ base: "0px", md: "240px" }}>
					<Sidebar />
				</Box>
			) : null}
			{/* Navbar */}
			{canRenderNavbar ? <Navbar /> : null}
			
			
			<Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}  mx={"auto"} bg={bgColor}>
				{children}
			</Box>
		</Flex>
		</>
	);
};

export default PageLayout;

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};
