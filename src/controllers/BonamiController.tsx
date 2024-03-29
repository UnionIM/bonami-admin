import BonamiService from "../services/BonamiService";
import { Dayjs } from "dayjs";

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
  static async getItemById(id: string) {
    try {
      if (id) {
        return await BonamiService.getItemById(id);
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  static async getOrderList(
    email: string,
    date_start: Dayjs | null,
    date_end: Dayjs | null,
    sort: { element: string; direction: 1 | -1 },
    page: number,
    per_page: number = 8
  ) {
    try {
      const epochStart = new Date(date_start?.toString() || "").valueOf();
      const epochEnd = new Date(date_end?.toString() || "").valueOf();
      return await BonamiService.getOrderList(
        email,
        epochStart || "",
        epochEnd || "",
        sort,
        page,
        per_page
      );
    } catch (e) {
      throw e;
    }
  }

  static async getOrderById(id: string) {
    try {
      return await BonamiService.getOrderById(id);
    } catch (e) {
      throw e;
    }
  }

  static async getStatistics() {
    try {
      return await BonamiService.getStatistics();
    } catch (e) {
      throw e;
    }
  }

  static async getGraphData() {
    try {
      return await BonamiService.getGraphData();
    } catch (e) {
      throw e;
    }
  }

  static async recalculateProfit() {
    try {
      return await BonamiService.recalculateProfit();
    } catch (e) {
      throw e;
    }
  }
}
