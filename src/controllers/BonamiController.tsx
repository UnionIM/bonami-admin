import BonamiService from "../services/BonamiService";

export default class BonamiController {
  static async googleAuth() {
    try {
      return await BonamiService.googleAuth();
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
}
