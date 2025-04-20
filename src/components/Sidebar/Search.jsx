import {
	Box,
	Tooltip,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useState, useEffect } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
import { useNavigate } from "react-router-dom";

const Search = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [searchInput, setSearchInput] = useState("");
	const { isLoading, filterUsers } = useSearchUser();
	const navigate = useNavigate();

	const suggestions = filterUsers(searchInput);

	const modalBg = useColorModeValue("white", "gray.900");
	const inputBg = useColorModeValue("gray.100", "gray.800");
	const textColor = useColorModeValue("black", "white");
	const borderColor = useColorModeValue("gray.300", "whiteAlpha.300");

	useEffect(() => {
		if (!isOpen) {
			setSearchInput("");
		}
	}, [isOpen]);

	const handleUserClick = (username) => {
		onClose(); 

		setTimeout(() => {
			navigate(`/${username}`);
		}, 300); 
	};

	return (
		<>
			<Tooltip hasArrow placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
				<Flex
					alignItems="center"
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<SearchLogo />
					<Box display={{ base: "none", md: "block" }}>Search</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
				<ModalOverlay />
				<ModalContent bg={modalBg} color={textColor} border="1px solid black" maxW="400px" mt={{base:"60%",sm:"40%",md:"20%"}}>
					<ModalHeader>Search user</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Username or Full Name</FormLabel>
							<Input
								placeholder="Type to search..."
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								bg={inputBg}
								border="1px solid"
								borderColor={borderColor}
								color={textColor}
								_focusVisible={{ borderColor: "blue.400" }}
							/>
						</FormControl>

						{isLoading && <Box mt={4}>Loading...</Box>}

						<Box my={4}>
							{searchInput && suggestions.length === 0 && (
								<Box color="gray.500">No users found</Box>
							)}
							{suggestions.map((user) => (
								<SuggestedUser key={user.username} user={user} onClick={() => handleUserClick(user.username)} />
							))}
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Search;
