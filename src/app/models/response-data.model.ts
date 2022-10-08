import { Product } from "./product.model";

export interface AuthData {
  username: string;
  password: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
