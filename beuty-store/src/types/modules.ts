export interface BaseSliceType<T> {
  data: T;
  isLoading: boolean;
  error: any;
}

export interface BaseItemType {
  id: string;
  createAt: string;
  updateAt: string;
}

export interface InitialObject {
  [key: string]: any;
}

export interface CardData {
  quantity: number;
  id: number;
  images: { image: string }[];
  name: string;
  subtitle: string;
  description: string;
  price: number;
  discount_price?: string;
  article?: string;
}

export interface BaseResponseI<T> {
  name: any;
  count: number;
  next: null | string;
  previous: null | string;
  results: T;
}

export interface Brand {
  price: number | undefined;
  discount_price?: string | undefined;
  images: { image: string }[];
  id: number;
  name: string;
  description: string;
  logo?: string;
  subtitle?: string;
}

export interface Category extends BaseItemType {
  name?: string;
  slug: string;
  sub_category: string;
}
