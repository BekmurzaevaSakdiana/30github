import axiosInstance from "@/app/axios/axios";
import { BaseResponseI, CardData } from "@/components/Cards";

export class CatalogUtils {
    static async getProductsByCatalogName({id, name}: {id: string, name: string}) {
      try {
        const response = await axiosInstance.get<BaseResponseI<CardData[]>>(
          `/category/?brand=${id}&name=${name}`
        );
        return response.data;
      } catch (error: any) {
        console.error("Failed to fetch product by ID:", error);
      }
    }

     
  }
  