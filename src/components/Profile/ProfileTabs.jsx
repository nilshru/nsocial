import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";

const ProfileTabs = () => {
	const bdrColor = useColorModeValue("gray.300", "whiteAlpha.300");
	return (
		<Flex
			
			justifyContent={"center"}
			gap={{ base: 4, sm: 10 }}
			textTransform={"uppercase"}
			fontWeight={"bold"}
		>
			<Flex borderTop={"1px solid"} bdrColor={bdrColor} justifyContent={"center"} alignItems={"center"} p='3' gap={1} cursor={"pointer"} >
				<Box fontSize={20} color={useColorModeValue("blue.500", "white")}>
					<BsGrid3X3  />
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }} color={useColorModeValue("blue.500", "white")}>
					Posts
				</Text>
			</Flex>

			<Flex alignItems={"center"} p='3' gap={1} cursor={"pointer"}>
				<Box fontSize={20} color={useColorModeValue("blue.500", "white")}>
					<BsBookmark />
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }} color={useColorModeValue("blue.500", "white")}>
					Saved
				</Text>
			</Flex>

			<Flex alignItems={"center"} p='3' gap={1} cursor={"pointer"}>
				<Box fontSize={20} color={useColorModeValue("blue.500", "white")}>
					<BsSuitHeart fontWeight={"bold"} />
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }} color={useColorModeValue("blue.500", "white")}>
					Likes
				</Text>
			</Flex>
		</Flex>
	);
};

export default ProfileTabs;
