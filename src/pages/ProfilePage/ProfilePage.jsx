import {
	Container,
	Flex,
	Link,
	Skeleton,
	SkeletonCircle,
	Text,
	VStack,
	Button,
	useDisclosure,
	useColorModeValue,
} from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useParams, Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import EditProfile from "../../components/Profile/EditProfile";
import useLogout from "../../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";

const ProfilePage = () => {
	const { username } = useParams();
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const authUser = useAuthStore((state) => state.user);
	const { handleLogout, isLoggingOut } = useLogout();
	const bgColor = useColorModeValue("gray.500", "white")
	const color = useColorModeValue("white","black")

	const userNotFound = !isLoading && !userProfile;
	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile?.username;

	if (userNotFound) return <UserNotFound />;

	return (
		<Container maxW='container.lg' py={5}>
	<Flex
	py={4}
	px={{ base: 4, md: 10 }}
	w="full"
	mx="auto"
	flexDirection="column"  
	alignItems={{ base: "center", md: "flex-start" }}  
>


				{!isLoading && userProfile && <ProfileHeader />}
				{isLoading && <ProfileHeaderSkeleton />}

				{visitingOwnProfileAndAuth && (
					<Flex mb={2} gap={20} alignItems="center" justifyContent="center" w="full">
					
						<Button
							bg={bgColor}
							color={color}
							p={4}
							_hover={{ bg: "whiteAlpha.800" }}
							size={{ base: "xs", md: "sm" }}
							onClick={onOpen}
						>
							Edit Profile
						</Button>

						<Button
							onClick={handleLogout}
							isLoading={isLoggingOut}
							p={4}
							leftIcon={<BiLogOut size={18} />}
							size={{ base: "xs", md: "sm" }}
							colorScheme="red"
							display={{ base: "flex", md: "none" }}
						>
							Logout
						</Button>
					</Flex>
				)}
			</Flex>

			<Flex
				px={{ base: 2, sm: 4 }}
				maxW={"full"}
				mx={"auto"}
				borderTop={"1px solid"}
				borderColor={"gray.500"}
				direction={"column"}
			>
				<ProfileTabs />
				<ProfilePosts />
			</Flex>

		
			{isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
		</Container>
	);
};

export default ProfilePage;

const ProfileHeaderSkeleton = () => (
	<Flex
		gap={{ base: 4, sm: 10 }}
		py={10}
		direction={{ base: "row", sm: "row" }}
		justifyContent={"center"}
		alignItems={"center"}
	>
		<SkeletonCircle size='24' />
		<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
			<Skeleton height='12px' width='150px' />
			<Skeleton height='12px' width='100px' />
		</VStack>
	</Flex>
);

const UserNotFound = () => (
	<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
		<Text fontSize={"2xl"}>User Not Found</Text>
		<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
			Go home
		</Link>
	</Flex>
);
