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

  static async getItemList(
    search: string,
    category: string,
    page: number,
    per_page: number = 12
  ) {
    try {
      return await BonamiService.getItemList(search, category, page, per_page);
    } catch (e) {
      throw e;
    }
  }

  static async getOrderList(
    email: string,
    date_start: string,
    date_end: string,
    page: number,
    per_page: number = 12
  ) {
    try {
      return await BonamiService.getOrderList(
        email,
        date_start,
        date_end,
        page,
        per_page
      );
    } catch (e) {
      throw e;
    }
  }
}
