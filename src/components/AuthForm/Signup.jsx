import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Alert,
	AlertIcon,
	Button,
	Input,
	InputGroup,
	InputRightElement,
	FormControl,
	FormErrorMessage,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const { loading, error, signup } = useSignUpWithEmailAndPassword();

	const usernameRegex = /^[a-zA-Z0-9_@$]*$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "username") {
			if (!usernameRegex.test(value)) {
				setErrors((prev) => ({
					...prev,
					username: "Only A-Z, a-z, 0-9, _, $, @ are allowed. No spaces or other characters.",
				}));
			} else {
				setErrors((prev) => ({ ...prev, username: "" }));
			}
		}

		// Removed email validation here (only validate on submit)

		setInputs((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		let newErrors = {};

		if (!inputs.email) newErrors.email = "Email is required";
		else if (!emailRegex.test(inputs.email)) newErrors.email = "Invalid email format";

		if (!inputs.username) newErrors.username = "Username is required";
		if (!inputs.fullName) newErrors.fullName = "Full name is required";
		if (!inputs.password) newErrors.password = "Password is required";

		if (!usernameRegex.test(inputs.username)) {
			newErrors.username =
				"Only A-Z, a-z, 0-9, _, $, @ are allowed. No spaces or other characters.";
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			signup(inputs);
		}
	};

	return (
		<VStack spacing={3} align="stretch" w={"100%"}>
			<FormControl isInvalid={!!errors.email}>
				<Input
					name="email"
					placeholder="Email"
					fontSize={14}
					type="email"
					border={"1px solid gray"}
					size="sm"
					value={inputs.email}
					onChange={handleChange}
				/>
				{errors.email && (
					<FormErrorMessage fontSize="12px">
						{errors.email}
					</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={!!errors.username}>
				<Input
					name="username"
					placeholder="Username"
					fontSize={14}
					border={"1px solid gray"}
					type="text"
					size="sm"
					value={inputs.username}
					onChange={handleChange}
				/>
				{errors.username && (
					<FormErrorMessage fontSize="12px">
						{errors.username}
					</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={!!errors.fullName}>
				<Input
					name="fullName"
					placeholder="Full Name"
					fontSize={14}
					border={"1px solid gray"}
					type="text"
					size="sm"
					value={inputs.fullName}
					onChange={handleChange}
				/>
				{errors.fullName && (
					<FormErrorMessage fontSize="12px">
						{errors.fullName}
					</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={!!errors.password}>
				<InputGroup>
					<Input
						name="password"
						placeholder="Password"
						fontSize={14}
						border={"1px solid gray"}
						type={showPassword ? "text" : "password"}
						size="sm"
						value={inputs.password}
						onChange={handleChange}
					/>
					<InputRightElement h="full">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <ViewIcon /> : <ViewOffIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
				{errors.password && (
					<FormErrorMessage fontSize="12px">
						{errors.password}
					</FormErrorMessage>
				)}
			</FormControl>

			{error && (
				<Alert status="error" fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}

			<Button
				w="full"
				colorScheme="blue"
				size="sm"
				fontSize={14}
				isLoading={loading}
				onClick={handleSubmit}
			>
				Sign Up
			</Button>
		</VStack>
	);
};

export default Signup;
