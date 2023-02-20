import api from "../API/API";
import { IUser } from "../models/bonami";

export default class BonamiService {
  static async googleAuth() {
    return await api.get("/google");
  }

  static async getUser() {
    return (await api.get<IUser>("/user")).data;
  }
}
