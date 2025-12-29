import { useUserStore } from "@/store/userStore";
import axios from "axios";
import type {
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosResponse,
	AxiosError,
} from "axios";

// 1. Create the instance with types
const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // ✅ ensures refreshToken cookie is sent
});

// --- Refresh handling state ---
let isRefreshing = false;
let failedQueue: {
	resolve: (value?: unknown) => void;
	reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

// 2. Request Interceptor
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = useUserStore.getState().accessToken;
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => Promise.reject(error),
);

// 3. Response Interceptor with refresh logic
apiClient.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// Queue requests while refresh is happening
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						if (token && originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`;
						}
						return apiClient(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				// Call refresh endpoint (cookie-based)
				const response = await axios.post(
					`${import.meta.env.VITE_API_URL}/refresh-token`,
					{},
					{ withCredentials: true },
				);

				const newToken = response.data.accessToken;
				useUserStore.getState().setAccessToken(newToken);

				processQueue(null, newToken);
				isRefreshing = false;

				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newToken}`;
				}
				return apiClient(originalRequest);
			} catch (err) {
				processQueue(err, null);
				isRefreshing = false;
				// Optionally clear store and redirect to login
				useUserStore.getState().setAccessToken(null);
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	},
);

// 4. Type-Safe Wrapper Methods
const api = {
	get: <T>(url: string, config = {}) => apiClient.get<T>(url, config),
	post: <T>(url: string, data?: any, config = {}) =>
		apiClient.post<T>(url, data, config),
	put: <T>(url: string, data?: any, config = {}) =>
		apiClient.put<T>(url, data, config),
	patch: <T>(url: string, data?: any, config = {}) =>
		apiClient.patch<T>(url, data, config),
	delete: <T>(url: string, config = {}) => apiClient.delete<T>(url, config),
};

export { api };
