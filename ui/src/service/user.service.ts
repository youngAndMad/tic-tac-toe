import axios from "axios";
import { User, UsersCount } from "../models/user.model";

class UserService {
  async me(): Promise<User> {
    const meResponse = await axios.get<User>("/api/v1/users/me");
    return meResponse.data;
  }

  async uploadAvatar(file: File): Promise<unknown> {
    const formData = new FormData();
    formData.append("image", file);
    const uploadImageResponse = await axios.post<unknown>(
      "/api/v1/users/avatar",
      formData
    );
    return uploadImageResponse.data;
  }

  async downloadAvatar(userId: string): Promise<Blob> {
    const response = await axios.get<Blob>(`/api/v1/users/avatar/${userId}`, {
      responseType: "blob",
    });
    return response.data;
  }

  async onlineUsersCount(): Promise<UsersCount> {
    const meResponse = await axios.get<UsersCount>("/api/v1/users/online");
    return meResponse.data;
  }
}

export const userService = new UserService();
