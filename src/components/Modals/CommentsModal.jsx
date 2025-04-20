import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
	Text,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef, useState } from "react";

const CommentsModal = ({ isOpen, onClose, post }) => {
	const { handlePostComment, isCommenting } = usePostComment();
	const commentsContainerRef = useRef(null);

	const bgColor = useColorModeValue("gray.50", "gray.900");
	const borderColor = useColorModeValue("gray.500", "whiteAlpha.300");

	const [comment, setComment] = useState("");
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const inputText = e.target.value;
		if (inputText.length <= 50) {
			setComment(inputText);
			setError(""); // clear error if back within limit
		} else {
			setError("Cannot write more than 50 characters.");
		}
	};

	const handleSubmitComment = async (e) => {
		e.preventDefault();
		if (!comment.trim() || comment.length > 50) return;
		await handlePostComment(post.id, comment.trim());
		setComment("");
		setError("");
	};

	useEffect(() => {
		const scrollToBottom = () => {
			commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
		};
		if (isOpen) {
			setTimeout(() => {
				scrollToBottom();
			}, 100);
		}
	}, [isOpen, post.comments.length]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={bgColor} border='1px solid' borderColor={borderColor} maxW='400px'>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex
						mb={4}
						gap={4}
						flexDir='column'
						maxH='250px'
						overflowY='auto'
						ref={commentsContainerRef}
					>
						{post.comments.map((comment, idx) => (
							<Comment key={idx} comment={comment} />
						))}
					</Flex>

					<form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
						<Input
							placeholder='Comment (max 50 characters)'
							size='sm'
							borderColor={error ? "red.500" : "gray.500"}
							value={comment}
							onChange={handleChange}
						/>
						<Flex justifyContent='space-between' alignItems='center' mt={1}>
							<Text fontSize='xs' color={error ? "red.500" : "gray.500"}>
								{error ? error : `${comment.length} / 50 characters`}
							</Text>
						</Flex>

						<Flex w='full' justifyContent='flex-end'>
							<Button
								type='submit'
								ml='auto'
								size='sm'
								bg='blue.500'
								my={4}
								color='white'
								isLoading={isCommenting}
								isDisabled={comment.length > 50}
							>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CommentsModal;
