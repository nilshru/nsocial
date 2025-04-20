import { Img, Flex, Tooltip, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";


const MobileNav = () => {
	const navigate = useNavigate();


	return (
		<>
			{/* Home Icon */}
			<Img
				src={"/icon.png"}
				onClick={() => navigate("/")}
				ml={2}
				mt={{base: "1px", md:"8px"}}
				pt={1}
				cursor={"pointer"}
				w={"30px"}
				h={"30px"}
				alt={"NS LOGO"}
			/>

			<ThemeToggleButton/>
			{/* {authUser && (
				<Tooltip label="Logout" hasArrow placement="top">
					<Flex
						onClick={handleLogout}
						cursor="pointer"
						align="center"
						justify="center"
						p={2}
						borderRadius={6}
						_hover={{ bg: "whiteAlpha.400" }}
					>
						{isLoggingOut ? <Spinner size="sm" /> : <BiLogOut size={24} />}
					</Flex>
				</Tooltip>
			)} */}
		</>
	);
};

export default MobileNav;
