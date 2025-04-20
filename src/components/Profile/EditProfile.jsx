import {
	Avatar,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Textarea,
	useColorModeValue, // ✅ Import this
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		bio: "",
	});
	const authUser = useAuthStore((state) => state.user);
	const fileRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { isUpdating, editProfile } = useEditProfile();
	const showToast = useShowToast();

	// Theme-based styles
	const modalBg = useColorModeValue("gray.50", "gray.900");
	const sectionBg = useColorModeValue("gray.50", "gray.900");
	const textColor = useColorModeValue("black", "white");
	const borderColor = useColorModeValue("gray.900", "whiteAlpha.300");

	const handleEditProfile = async () => {
		try {
			await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	useEffect(() => {
		if (isOpen) {
			setInputs({
				fullName: authUser.fullName || "",
				username: authUser.username || "",
				bio: authUser.bio || "",
			});
		}
	}, [isOpen, authUser]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				bg={modalBg}
				boxShadow="xl"
				border="1px solid"
				borderColor={borderColor}
				mx={3}
				color={textColor}
			>
				<ModalHeader>Edit Profile</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex bg={sectionBg}>
						<Stack spacing={4} w="full" maxW="md" p={6} my={0}>
							<FormControl>
								<Stack direction={["column", "row"]} spacing={6}>
									<Center>
										<Avatar
											size="xl"
											src={selectedFile || authUser.profilePicURL}
											border="2px solid"
											borderColor={"blue.500"}// yaha pr mai chah rha ki border color blue ho bt ho nhi rha hai
										/>
									</Center>
									<Center w="full">
										<Button w="full" onClick={() => fileRef.current.click()} bg={"blue.500"} textColor={"white"}>
											Edit Profile Picture
										</Button>
									</Center>
									<Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
								</Stack>
							</FormControl>

							<FormControl>
								<FormLabel fontSize="sm">Full Name</FormLabel>
								<Input
									placeholder="Full Name"
									size="sm"
									required
									border={"1px solid"}
									borderColor={"gray.500"}
									type="text"
									value={inputs.fullName}
									onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
								/>
							</FormControl>

							<FormControl>
								<FormLabel fontSize="sm">Username</FormLabel>
								<Input
									placeholder="Username"
									size="sm"
									required
									border={"1px solid"}
									borderColor={"gray.500"}
									type="text"
									value={inputs.username}
									onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
								/>
							</FormControl>

							<FormControl>
								<FormLabel fontSize="sm">Bio</FormLabel>
								<Textarea
									placeholder="Bio"
									size="sm"
									border={"1px solid"}
									borderColor={"gray.500"}
									value={inputs.bio}
									minHeight={100}
									maxLength={60}
									onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
								/>
								<FormLabel fontSize="xs" color="gray.400" textAlign="right">
									{inputs.bio.length}/60
								</FormLabel>
							</FormControl>

							<Stack spacing={6} direction={["column", "row"]}>
								<Button
									bg="red.400"
									color="white"
									w="full"
									size="sm"
									_hover={{ bg: "red.500" }}
									onClick={onClose}
								>
									Cancel
								</Button>
								<Button
									bg="blue.400"
									color="white"
									size="sm"
									w="full"
									_hover={{ bg: "blue.500" }}
									onClick={handleEditProfile}
									isLoading={isUpdating}
								>
									Submit
								</Button>
							</Stack>
						</Stack>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default EditProfile;
