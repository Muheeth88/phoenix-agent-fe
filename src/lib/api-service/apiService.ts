import { api } from "@/api/axiosInstance";

const fetchUsers = async () => {
	try {
		const response = await api.get("/users");
		return response;
	} catch (error) {
		alert("Error fetching users");
		return [];
	}
};

export { fetchUsers };
