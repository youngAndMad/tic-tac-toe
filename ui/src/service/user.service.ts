import axios from "axios";
import { User } from "../models/user.model";

class UserService {
  async me(): Promise<User> {
    const meResponse = await axios.get<User>("/api/v1/users/me");
    return meResponse.data;
  }
}
