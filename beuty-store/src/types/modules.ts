export interface BaseSliceType<T> {
  data: T;
  isLoading: boolean;
  error: any;
}


export  interface BaseItemType {
  id: string
  createAt: string
  updateAt: string
}

export interface ResponseType<T> {
  count: number;
  next: null | string;
  previous: null | string;
  results: T;
}

export interface InitialObject {
  [key:string]: any
}
