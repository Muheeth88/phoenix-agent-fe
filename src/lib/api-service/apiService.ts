import { api } from "@/api/axiosInstance";

const fetchUsers = async () => {
	try {
		return [];
		// const response = await api.get("/users");
		// return response;
	} catch (error) {
		alert("Error fetching users");
		return [];
	}
};

const healthCheck = async () => {
	try {
		const response = await api.get("/health-check");
		return response;
	} catch (error) {
		alert("Error fetching users");
		return null;
	}
};

export { fetchUsers, healthCheck };
