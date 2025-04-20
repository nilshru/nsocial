import {
	Avatar,
	AvatarGroup,
	Button,
	Flex,
	Text,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";
import FollowersFollowingModal from "../FollowersFollowingModal/FollowersFollowingModal"; // Assuming modal component is in the same directory

const ProfileHeader = () => {
	const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
	const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
	const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

	// Toggle modal for followers
	const onOpenFollowersModal = () => setIsFollowersModalOpen(true);
	const onCloseFollowersModal = () => setIsFollowersModalOpen(false);

	// Toggle modal for following
	const onOpenFollowingModal = () => setIsFollowingModalOpen(true);
	const onCloseFollowingModal = () => setIsFollowingModalOpen(false);

	return (
		<Flex gap={{ base: 4, sm: 10 }} pt={10} pb={2} direction={"row"}>
			<Flex direction={"column"} flex={0} gap={2}>
				<AvatarGroup
					size={{ base: "xl", md: "2xl" }}
					justifySelf={"center"}
					alignSelf={"flex-start"}
					mx={"auto"}
				>
					<Avatar src={userProfile.profilePicURL} alt="Profile Picture" />
				</AvatarGroup>
			</Flex>

			<VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
				<Flex
					gap={4}
					direction={"row"}
					justifyContent={"flex-start"}
					alignItems={"center"}
					w={"full"}
				>
					<Text fontSize={{ base: "sm", sm: "lg", md: "lg" }} fontWeight={"bold"} textColor={useColorModeValue("blue.500", "white")}>
						{userProfile.username}
					</Text>

					{/* Follow/Unfollow Button */}
					{visitingAnotherProfileAndAuth && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"blue.500"}
								color={"white"}
								_hover={{ bg: "blue.600" }}
								size={{ base: "xs", md: "sm" }}
								onClick={handleFollowUser}
								isLoading={isUpdating}
							>
								{isFollowing ? "Unfollow" : "Follow"}
							</Button>
						</Flex>
					)}
				</Flex>

				{/* Stats */}
				<Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
					<Flex
						direction={{ base: "column", sm: "row" }}
						gap={{ base: 0, sm: 2 }}
						align="center"
						fontSize={{ base: "xs", md: "sm" }}
					>
						<Text fontWeight="bold">{userProfile.posts.length}</Text>
						<Text>Posts</Text>
					</Flex>
					<Flex
						direction={{ base: "column", sm: "row" }}
						gap={{ base: 0, sm: 2 }}
						align="center"
						fontSize={{ base: "xs", md: "sm" }}
						cursor="pointer"
						onClick={onOpenFollowersModal}
					>
						<Text fontWeight="bold">{userProfile.followers.length}</Text>
						<Text>Followers</Text>
					</Flex>
					<Flex
						direction={{ base: "column", sm: "row" }}
						gap={{ base: 0, sm: 2 }}
						align="center"
						fontSize={{ base: "xs", md: "sm" }}
						cursor="pointer"
						onClick={onOpenFollowingModal}
					>
						<Text fontWeight="bold">{userProfile.following.length}</Text>
						<Text>Following</Text>
					</Flex>
				</Flex>

				{/* Full name and bio */}
				<Flex alignItems={"center"} gap={4}>
					<Text fontSize={"sm"} fontWeight={"bold"}>
						{userProfile.fullName}
					</Text>
				</Flex>
				<Text fontSize={"sm"}>{userProfile.bio}</Text>
			</VStack>

			{/* Modals for followers and following */}
			<FollowersFollowingModal
				isOpen={isFollowersModalOpen}
				onClose={onCloseFollowersModal}
				title="Followers"
				userIds={userProfile.followers}
			/>
			<FollowersFollowingModal
				isOpen={isFollowingModalOpen}
				onClose={onCloseFollowingModal}
				title="Following"
				userIds={userProfile.following}
			/>
		</Flex>
	);
};

export default ProfileHeader;
