export interface IAPIResponse<T = Object | []> {
  data?: T;
  message?: string;
  pagination?: IAPIPagination;
}

export interface IAPIPagination {
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

export interface IAPIProductDetailResponse {
  id: number;
  name: string;
  description: string;
  stars: string;
  sold: number;
  available: number;
  images: null;
  variant_options: [
    {
      variant_option_name: string;
      childs: [];
    }
  ];
  variants: [
    {
      variant_id: number;
      variant_name: string;
      selections: [
        {
          selection_variant_name: string;
          selection_name: string;
        }
      ];
      stock: number;
      price: string;
    }
  ];
}
