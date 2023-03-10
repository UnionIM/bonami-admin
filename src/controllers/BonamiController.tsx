import BonamiService from "../services/BonamiService";

export default class BonamiController {
  static async isAuth() {
    try {
      return await BonamiService.isAuth();
    } catch (e) {
      throw e;
    }
  }

  static async logOut() {
    try {
      return await BonamiService.logOut();
    } catch (e) {
      throw e;
    }
  }

  static async getUser() {
    try {
      return await BonamiService.getUser();
    } catch (e) {
      throw e;
    }
  }

  static async getCategories() {
    try {
      return await BonamiService.getCategories();
    } catch (e) {
      throw e;
    }
  }

  static async getItemList() {
    try {
      return await BonamiService.getItemList();
    } catch (e) {
      throw e;
    }
  }
}
