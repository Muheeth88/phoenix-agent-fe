import { fetchUsers, healthCheck } from "@/lib/api-service/apiService";
import { queryKeys } from "@/lib/constants";
import { queryOptions } from "@tanstack/react-query";

const useGetUsers = () => {
	return queryOptions({
		queryKey: [queryKeys.USERS],
		queryFn: fetchUsers,
	});
};
export { useGetUsers };

const useHealthCheck = () => {
	return queryOptions({
		queryKey: [queryKeys.HEALTH_CHECK],
		queryFn: healthCheck,
	});
};
export { useHealthCheck };
