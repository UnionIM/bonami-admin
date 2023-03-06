import api from "../API/API";
import { ICategory, IUser } from "../models/bonami-server-response";

export default class BonamiService {
  static async isAuth() {
    return (await api.get("/isAuth")).data;
  }

  static async logOut() {
    return (await api.get("/logout")).data;
  }

  static async getUser() {
    return (await api.get<IUser>("/user")).data;
  }

  static async getCategories() {
    return (await api.get<ICategory[]>("/category")).data;
  }
}
