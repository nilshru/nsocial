import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Input,
	Flex,
	Avatar,
	Text,
	Spinner,
	Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const FollowersFollowingModal = ({ isOpen, onClose, title, userIds }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	// useNavigate hook to navigate to other pages
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const fetchedUsers = [];
				for (const uid of userIds) {
					const docSnap = await getDoc(doc(firestore, "users", uid));

					if (docSnap.exists()) {
						// Ensure that the user UID is included in the data
						fetchedUsers.push({ uid: docSnap.id, ...docSnap.data() });
					}
				}
				setUsers(fetchedUsers);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
			setLoading(false);
		};

		if (isOpen && userIds?.length > 0) fetchUsers();
		else setUsers([]);
	}, [isOpen, userIds]);

	// Filter users based on search term (case insensitive)
	const filteredUsers = users.filter((user) =>
		user.username.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Function to navigate to the selected user's profile page
	const handleNavigateToProfile = (username) => {
		navigate(`/${username}`); // Adjust the URL as per your routing structure
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="md">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{/* Search bar for filtering followers or following */}
					<Input
						placeholder={`Search ${title.toLowerCase()}...`}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						mb={4}
					/>

					{/* Loading Spinner */}
					{loading ? (
						<Flex justify="center" py={4}>
							<Spinner size="lg" />
						</Flex>
					) : filteredUsers.length > 0 ? (
						// Display filtered list of users
						filteredUsers.map((user) => (
							<Flex
								key={user.uid}
								align="center"
								gap={4}
								py={2}
								cursor="pointer"
								onClick={() => handleNavigateToProfile(user.username)}
							>
								<Avatar size="sm" src={user.profilePicURL} />
								<Flex direction="column">
									<Text>{user.username}</Text>
									<Box fontSize="sm" color="gray.500">
										{user.followers ? `${user.followers.length} followers` : "0 followers"}
									</Box>
								</Flex>
							</Flex>
						))
					) : (
						<Text textAlign="center">No users found.</Text>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default FollowersFollowingModal;
