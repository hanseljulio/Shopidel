export interface IAPIResponse<T = Object | []> {
  data?: T;
  message?: string;
  pagination?: IAPIPagination;
}

interface IAPIPagination {
  total_page: number;
  total_item: number;
  current_page: number;
  limit: number;
}

export interface IAPIWalletResponse {
  balance: string;
  wallet_number: string;
  isActive: boolean;
}

export interface IAPIUserProfileResponse {
  id: string;
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  gender: string;
  birthdate: string;
  profile_picture: string;
  wallet_number: string;
  balance: string;
  forget_password_expired_at: string;
}

export interface IAPILoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface IAPIProductsResponse{
  id: number,
  name: string,
  district: string,
  total_sold: number,
  price: string,
  picture_url: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}