import { BaseResponseI, CardData } from "@/components/Cards";
import axiosInstance from "@/app/axios/axios";

export class ProductsUtils {
  static async getProducts(): Promise<BaseResponseI<CardData[]>> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        "/products/"
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
    }
  }
  static async getIsNewPoducts(): Promise<BaseResponseI<CardData[]>> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        "/products/?is_new=true"
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
    }
  }

  static async getIsPopularProducts(): Promise<BaseResponseI<CardData[]>> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        "/products/?is_popular=true"
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
    }
  }

  static async getHasDiscountProducts(): Promise<BaseResponseI<CardData[]>> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        "/products/?has_discount=true"
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
    }
  }

  static async getByIdProduct(id: number): Promise<BaseResponseI<CardData[]>> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        `/products/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch product by ID:", error);
      if (error.response) {
        throw new Error(`Failed to fetch product: ${error.response.status}`);
      } else {
      }
    }
  }

  static async getProductByBrand(id: number): Promise<BaseResponseI<CardData[]>> {
    try {
      const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
        `/products/?brand=${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch product by ID:", error);
      
    }
  }

}
