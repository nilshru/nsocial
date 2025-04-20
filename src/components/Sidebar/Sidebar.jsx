import { Box, Button, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { NSLogO } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";

const Sidebar = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const borderColor = useColorModeValue("blue.500", "gray.500");

	return (
		<>
			{/* Desktop Sidebar (Left) */}
			<Box
				display={{ base: "none", md: "block" }}
				height={"100vh"}
				borderRight={"1px solid"}
				bg={bgColor}
				borderColor={borderColor}
				py={8}
				position={"sticky"}
				top={0}
				left={0}
				px={4}
				w="240px"
			>
				<Flex direction={"column"} gap={10} h="full">
					{/* Logo */}
					<Link as={RouterLink} to={"/"} pl={2}>
						<NSLogO />
					</Link>

					{/* Sidebar Items */}
					<SidebarItems />

					{/* Logout (Desktop) */}


					

					<Box mt="auto" >
						<ThemeToggleButton />

						<Flex
							onClick={handleLogout}
							alignItems={"center"}
							gap={4}
							_hover={{ bg: "whiteAlpha.400" }}
							borderRadius={6}
							p={2}
							cursor="pointer"
						>
							<BiLogOut size={25} color={"red.600"} style={{ color: "#e53e3e" }} />
							<Button
								variant={"ghost"}
								_hover={{ bg: "transparent" }}
								isLoading={isLoggingOut}
							>
								Logout
							</Button>
						</Flex>
					</Box>

				</Flex>
			</Box>

			{/* Mobile Bottom Nav */}
			<Box
				display={{ base: "flex", md: "none" }}
				position="fixed"
				bottom={0}
				left={0}
				w="100%"
				
				bg={bgColor}
				borderTop="1px solid"
				borderColor={borderColor}
				py={2}
				px={4}
				justifyContent="space-between"
				zIndex={10}
			>
				<SidebarItems isMobile />
				{/* Mobile logout icon removed — handled in MobileNav.jsx */}
			</Box>
		</>
	);
};

export default Sidebar;
