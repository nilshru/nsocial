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
import useLogin from "../../hooks/useLogin";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const { loading, error, login } = useLogin();

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		let newErrors = {};

		if (!inputs.email) newErrors.email = "Email is required";
		else if (!emailRegex.test(inputs.email)) newErrors.email = "Invalid email format";

		if (!inputs.password) newErrors.password = "Password is required";

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			login(inputs);
		}
	};

	return (
		<VStack spacing={3} align="stretch" w="100%">
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
					<FormErrorMessage fontSize="12px">{errors.email}</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={!!errors.password}>
				<InputGroup>
					<Input
						name="password"
						placeholder="Password"
						fontSize={14}
						border={"1px solid gray"}
						size="sm"
						type={showPassword ? "text" : "password"}
						value={inputs.password}
						onChange={handleChange}
					/>
					<InputRightElement h="full">
						<Button variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <ViewIcon /> : <ViewOffIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
				{errors.password && (
					<FormErrorMessage fontSize="12px">{errors.password}</FormErrorMessage>
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
				Log in
			</Button>
		</VStack>
	);
};

export default Login;
