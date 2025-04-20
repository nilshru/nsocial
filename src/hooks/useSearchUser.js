import { useState, useEffect } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const showToast = useShowToast();

	// Fetch all users on mount
	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			try {
				const snapshot = await getDocs(collection(firestore, "users"));
				const usersData = snapshot.docs.map((doc) => doc.data());
				setUsers(usersData);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		fetchUsers();
	}, []);

	// Client-side filter
	const filterUsers = (input) => {
		if (!input.trim()) return [];

		return users.filter((user) =>
			user.username.toLowerCase().startsWith(input.toLowerCase()) ||
			user.fullName.toLowerCase().startsWith(input.toLowerCase())
		);
		
	};

	return { isLoading, filterUsers };
};

export default useSearchUser;
