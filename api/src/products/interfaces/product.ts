export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  productDetail: ProductDetail;
}

export interface ProductDetail {
  id: number;
  partNumber: string;
  dimension?: string;
  weight?: number;
  manufacturer?: string;
  origin?: string;
}

export interface UpdateProduct {
  name: string;
  quantity: number;
  price: number;
  productDetail?: UpdateProductDetail;
}

export interface UpdateProductDetail {
  partNumber: string;
  dimension?: string;
  weight?: number;
  manufacturer?: string;
  origin?: string;
}
