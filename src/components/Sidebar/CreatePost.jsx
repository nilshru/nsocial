import {
	Box,
	Button,
	CloseButton,
	Flex,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Tooltip,
	useColorModeValue,
	useDisclosure,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { CreatePostLogo } from "../../assets/constants";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [caption, setCaption] = useState("");
	const imageRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const showToast = useShowToast();
	const { isLoading, handleCreatePost } = useCreatePost();

	// Theme-aware colors
	const modalBg = useColorModeValue("white", "gray.900");
	const inputBg = useColorModeValue("gray.100", "gray.800");
	const textColor = useColorModeValue("black", "white");
	const borderColor = useColorModeValue("gray.300", "whiteAlpha.300");
	const buttonBg = useColorModeValue("blue.500", "blue.500");
	const buttonHover = useColorModeValue("blue.600", "blue.600");

	const handlePostCreation = async () => {
		try {
			await handleCreatePost(selectedFile, caption);
			onClose();
			setCaption("");
			setSelectedFile(null);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Tooltip
				hasArrow
				placement="right"
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
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
					<CreatePostLogo />
					<Box display={{ base: "none", md: "block" }}>Create</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
				<ModalOverlay />
				<ModalContent bg={modalBg} color={textColor} border="1px solid black" maxW="400px" >
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl mb={4}>
							<FormLabel>Caption</FormLabel>
							<Textarea
								placeholder="Write something..."
								value={caption}
								onChange={(e) => {
									const newCaption = e.target.value;
									if (newCaption.length <= 60) { // Limit to 60 characters
										setCaption(newCaption);
									}
								}}
								bg={inputBg}
								border="1px solid"
								borderColor={borderColor}
								color={textColor}
								_focusVisible={{ borderColor: "blue.400" }}
								resize="none" 
								minH="120px" 
								maxH="300px" 
								overflow="auto" 
							/>
						</FormControl>

						<FormLabel fontSize="xs" color="gray.400" textAlign="right">
							{caption.length}/60 characters
						</FormLabel>


						<FormControl>
							<FormLabel>Upload Image</FormLabel>
							<Input type="file" hidden ref={imageRef} onChange={handleImageChange} />
							<BsFillImageFill
								onClick={() => imageRef.current.click()}
								style={{ marginLeft: "5px", cursor: "pointer" }}
								size={24}
							/>
						</FormControl>

						{selectedFile && (
							<Flex mt={5} w="full" position="relative" justifyContent="center">
								<Image src={selectedFile} alt="Selected" borderRadius={6} />
								<CloseButton
									position="absolute"
									top={2}
									right={2}
									onClick={() => setSelectedFile(null)}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button
							onClick={handlePostCreation}
							isLoading={isLoading}
							bg={buttonBg}
							color="white"
							_hover={{ bg: buttonHover }}
							size="sm"
						>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;

function useCreatePost() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

	const handleCreatePost = async (selectedFile, caption) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);
		const newPost = {
			caption: caption,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newPost.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });
			if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}
