import api from "../api/axios";

export const getCurrentUser = async () => {
    const response = await api.get("/auth/current_user");
    return response.data;
};

export const logoutUser = async () => {
    await api.get("/auth/logout");
};