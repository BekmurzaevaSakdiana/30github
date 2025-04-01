import axiosInstance from "@/app/axios/axios";
import { BaseResponseI, CardData } from "@/types/modules";

export class ProductsUtils {
  static async getProducts(): Promise<BaseResponseI<CardData[]> | undefined> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        "/products/"
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      return undefined; 
    }
  }

  static async getIsNewPoducts(): Promise<BaseResponseI<CardData[]> | undefined> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        "/products/?is_new=true"
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      return undefined;
    }
  }

  static async getIsPopularProducts(): Promise<BaseResponseI<CardData[]> | undefined> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        "/products/?is_popular=true"
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      return undefined;
    }
  }

  static async getHasDiscountProducts(): Promise<BaseResponseI<CardData[]> | undefined> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        "/products/?has_discount=true"
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      return undefined;
    }
  }

  static async getByIdProduct(id: number): Promise<CardData | undefined> {
    try {
      const response = await axiosInstance.get<CardData>(
        `/products/${id}`
      );
      return  response.data || undefined;
    } catch (error: any) {
      console.error("Failed to fetch product by ID:", error);
      return undefined; // возвращаем undefined в случае ошибки
    }
  }

  static async getProductByBrand(id: number): Promise<BaseResponseI<CardData[]> | undefined> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        `/products/?brand=${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch product by ID:", error);
      return undefined;
    }
  }

  static async getFilteredProducts(
    searchParams: any
  ): Promise<BaseResponseI<CardData[]> | undefined> {
    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      console.clear()

      console.log('searx', queryParams);
      console.clear()
      
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        `/products/?${queryParams}&limit=2`
      );
      console.log(response);
      
      console.log("Ответ от сервера:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch product by ID:", error);
      return error;
    }
  }
}
