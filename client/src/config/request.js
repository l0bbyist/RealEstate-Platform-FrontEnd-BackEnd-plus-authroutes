import axios from "axios";

// ✅ Set API base URL
axios.defaults.baseURL = "http://localhost:5000/api";

// ✅ Automatically attach authentication token if available (except for login requests)
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        // 🚀 Avoid adding token for login requests
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("🛠 Adding token to request headers:", token);
        } else {
            console.warn("⚠ No token found OR token not needed for this request.");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Function to send API requests
export const sendRequest = async ({ method = "GET", route, params, body }) => {
    try {
        console.log(`📡 Sending API Request: ${method} ${route}`);

        const response = await axios({
            method,
            url: route,
            data: body,
            params,
        });

        console.log("✅ API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("🚨 API Error:", error.response?.data || error.message);

        // ✅ Return structured error instead of crashing
        return {
            success: false,
            error: error.response?.data?.message || "Something went wrong",
        };
    }
};

export default sendRequest;
