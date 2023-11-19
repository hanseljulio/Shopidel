import { IAPIPagination } from "./api_interface";

export interface IProduct {
  id: number;
  name: string;
  district: string;
  total_sold: number;
  price: string;
  picture_url: string;
  rating: number;
  shop_name: string;
  shop_name_slug: string;
  product_name_slug: string;
  slug: string;
  category_name: string;
  category_id: number;
}

export interface IProductPagination {
  data: IProduct[];
  pagination: {
    total_page: number;
    total_item: number;
    current_page: number;
    limit: number;
  };
}

export interface IReviewProduct {
  id: number;
  customer_name: string;
  customer_picture_url: string;
  stars: string;
  comment: string;
  variant: string;
  created_at: string;
  pictures: string[];
}

export interface IProductSuggestion {
  product_id: number;
  product_name: string;
  product_picture_url: string;
  product_price: string;
  seller_name: string;
  shop_name_slug: string;
  product_name_slug: string;
}

export interface IListCategory {
  category_id: number;
  name: string;
  picture_url: string;
}

export interface ICategory {
  id: number;
  name: string;
  children?: ICategory[];
}
