import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const [error, setError] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { handleLikePost, isLiked, likes } = useLikePost(post);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleChange = (e) => {
		const input = e.target.value;
		if (input.length <= 50) {
			setComment(input);
			setError("");
		} else {
			setError("Cannot write more than 50 characters.");
		}
	};

	const handleSubmitComment = async () => {
		if (!comment.trim() || comment.length > 50) return;
		await handlePostComment(post.id, comment.trim());
		setComment("");
		setError("");
	};

	return (
		<Box mb={10} marginTop={"auto"} w={{ base: "full", md: "400px", lg: "full" }}>
			<Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
				<Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
					{!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
				</Box>

				<Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
					<CommentLogo />
				</Box>
			</Flex>
			<Text fontWeight={600} fontSize={"sm"}>
				{likes} likes
			</Text>

			{isProfilePage && (
				<Text fontSize='12' color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}

			{!isProfilePage && (
				<>
					<Text fontSize='sm' fontWeight={700}>
						{creatorProfile?.username}{" "}
						<Text as='span' fontWeight={400}>
							{post.caption}
						</Text>
					</Text>
					{post.comments.length > 0 && (
						<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
							View all {post.comments.length} comments
						</Text>
					)}
					{isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />}
				</>
			)}

			{authUser && (
				<>
					<Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
						<InputGroup>
							<Input
								variant={"flushed"}
								placeholder={"Add a comment..."}
								fontSize={14}
								onChange={handleChange}
								value={comment}
								borderColor={error ? "red.500" : "gray.500"}
								ref={commentRef}
							/>
							<InputRightElement>
								<Button
									fontSize={14}
									color={"blue.500"}
									fontWeight={600}
									cursor={"pointer"}
									_hover={{ color: "white" }}
									bg={"transparent"}
									onClick={handleSubmitComment}
									isLoading={isCommenting}
									
								>
									Post
								</Button>
							</InputRightElement>
						</InputGroup>
					</Flex>
					<Flex justifyContent='space-between' mt={1}>
						<Text fontSize='xs' color={error ? "red.500" : "gray.500"}>
							{error ? error : ""}
						</Text>
					</Flex>
				</>
			)}
		</Box>
	);
};

export default PostFooter;
