import axiosInstance from "@/app/axios/axios";
import { BaseItemType, BaseResponseI, Category } from "@/types/modules";

export class CategoryUtils {
  static async getCategory() {
    try {
      const response = await axiosInstance.get<BaseResponseI<Category[]>>(
        "/categories/"
      );
      return response.data;
    } catch (error: any) {
      console.error("Ошибка загрузки категорий:", error);
      return null;
    }
  }

  static async getCategoryById(id:string) {
    try {
      const response = await axiosInstance.get<Category>(
        `/categories/${id}/`
      );
      return response.data;
    } catch (error: any) {
      console.error("Ошибка загрузки категорий:", error);
      return null;
    }
  }

}
