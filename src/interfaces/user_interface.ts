import { IRegisterForm } from "./auth_interface";

export interface IUser extends Omit<IRegisterForm, "confirmPassword"> {
  gender: string;
  birthdate: string;
  profilePhoto?: string;
  phone: number;
  shopName?: string;
}

export interface IAddress {
  id: number;
  full_address: string;
  detail: string;
  zip_code: string;
  kelurahan: string;
  sub_district: string;
  district_id: number;
  district: string;
  province_id: number;
  province: string;
  is_buyer_default: boolean;
  is_seller_default: boolean;
}

export interface ITransactionHistory {
  data: ITransactionHistoryData[];
  pagination: {
    total_page: number;
    total_item: number;
    current_page: number;
    limit: number;
  };
}

export interface ITransactionHistoryData {
  order_id: number;
  shop_name: string;
  status: string;
  products: ITransactionHistoryProducts[];
  promotions: ITransactionHistoryPromotions;
  delivery_fee: string;
  shipping: {
    province: string;
    district: string;
    zip_code: string;
    sub_district: string;
    kelurahan: string;
    detail: string;
  };
  total_payment: string;
}

export interface ITransactionHistoryProducts {
  product_id: number;
  product_name: string;
  quantity: number;
  individual_price: string;
  review: ITransactionHistoryReview;
  is_reviewed: boolean;
}

export interface ITransactionHistoryReview {
  review_id: number;
  review_feedback: string;
  review_rating: number;
  created_at: string;
}

export interface ITransactionHistoryPromotions {
  marketplace_voucher: string;
  shop_voucher: string;
}
