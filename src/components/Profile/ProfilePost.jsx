import {
	Avatar,
	Button,
	Divider,
	Flex,
	GridItem,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";

const ProfilePost = ({ post }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
	const borderColor = useColorModeValue("gray.300", "whiteAlpha.300");
	const bgColor = useColorModeValue("whiteAlpha.700", "blackAlpha.700");

	const handleDeletePost = async () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		if (isDeleting) return;

		try {
			const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			showToast("Success", "Post deleted successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<GridItem
				w={"full"}
				h={{ base: "150px", sm: "100%" }}
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				border={"1px solid"}
				borderColor={borderColor}
				position={"relative"}
				aspectRatio={1 / 1}
				onClick={onOpen}
			>
				<Flex
					opacity={0}
					_hover={{ opacity: 1 }}
					position={"absolute"}
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={bgColor}
					transition={"all 0.3s ease"}
					zIndex={1}
					justifyContent={"center"}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={{ base: 4, sm: 50 }}
					w={"full"}
					h={{ base: "150px", sm: "100%" }}>
						<Flex>
							<AiFillHeart size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.likes.length}
							</Text>
						</Flex>

						<Flex>
							<FaComment size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.comments.length}
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Image src={post.imageURL} alt="profile post" w={"100%"} h={"100%"} objectFit={"cover"} />
			</GridItem>

			<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "full", md: "4xl" }} motionPreset="slideInBottom">
				<ModalOverlay
					bg="blackAlpha.600"
					backdropFilter="blur(8px)"
				/>
				<ModalContent
					my="50px"
					bg={useColorModeValue("whiteAlpha.900", "gray.900")}
					borderRadius="md"
					boxShadow="xl"
				>
					<ModalCloseButton color={useColorModeValue("black", "white")} display={{ base: "block", md: "none" }} />
					<ModalBody p={0}>
						<Flex
							direction={{ base: "column", md: "row" }}
							overflow="hidden"
						>
							{/* Image Section */}
							<Flex
								flex={1.5}
								justifyContent="center"
								alignItems="center"
								bg={useColorModeValue("gray.100", "gray.900")}
								p={2}
							>
								<Image
									src={post.imageURL}
									alt="Post"
									h={{ base: "40vh", md: "80vh" }}
									objectFit="contain"
									borderRadius="md"
									loading="lazy"
									p={{ base: 2, md: 4 }}
								/>
							</Flex>

							{/* Post Details Section */}
							<Flex
								flex={1}
								flexDir="column"
								p={4}
								bg={useColorModeValue("white", "gray.800")}
							>
								<Flex alignItems="center" justifyContent="space-between">
									<Flex alignItems="center" gap={4}>
										<Avatar
											src={userProfile.profilePicURL}
											size="sm"
											name="User Profile"
										/>
										<Text fontWeight="bold" fontSize={12}>
											{userProfile.username}
										</Text>
									</Flex>

									{authUser?.uid === userProfile.uid && (
										<Button
											size="sm"
											bg="transparent"
											_hover={{ bg: "whiteAlpha.300", color: "red.500" }}
											borderRadius={4}
											p={1}
											onClick={handleDeletePost}
											isLoading={isDeleting}
										>
											<MdDelete size={20} cursor="pointer" />
										</Button>
									)}
								</Flex>

								<Divider my={3} />

								<VStack
									w="full"
									alignItems="start"
									maxH={{ base: "25vh", md: "50vh" }}
									overflowY="auto"
									spacing={2}
								>
									{post.caption && <Caption post={post} />}
									{/* Add unique key prop here */}
									{post.comments.map((comment) => (
										<Comment key={comment.id} comment={comment} />
									))}
								</VStack>

								<Divider my={3} />
								<PostFooter isProfilePage={true} post={post} />
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfilePost;
