import axiosInstance from "@/app/axios/axios";
import { InitialObject, ResponseType } from "@/types/modules";
import { id } from "intl-tel-input/i18n";

interface Brand {
  id: number;
  name: string;
  description: string;
  logo: string;
}

export class BrandUtils {
  static async getBrands() {
    // запрашивает список всех брендов.
    try {
      const response = await axiosInstance.get("/brand/");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
    }
  }

  static async searchBrandsByName(params: InitialObject | URLSearchParams) {
    try {
      // axios автоматически передает параметры в URL
      const response = await axiosInstance.get(`/brand/`, {
        params: params,
      });
      return response.data;
    } catch (error: any) {
      console.error("Ошибка при поиске брендов:", error);
    }
  }

  static async searchBrands(params?: Record<string, string>) {
    // искать бренды с использованием дополнительных параметров.
    try {
      const response = await axiosInstance.get("/brand/", { params });
      return response.data;
    } catch (error: any) {
      console.error("Ошибка при поиске брендов:", error);
    }
  }

  static async getBrandsByProduct(productId: string) {
    // получить бренды, связанные с продуктом по его ID.
    try {
      const response = await axiosInstance.get<ResponseType<Brand[]>>(
        `/products/brands/`
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch brands for product:", error);
    }
  }

  static async getBrandsByCategory(category: string) {
    //  получить бренды, относящиеся к определенной категории.
    try {
      const response = await axiosInstance.get<ResponseType<Brand[]>>(
        `/brand/?category=${category} `
      );

      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch brands for category:", error);
    }
  }
}
