export interface IAPIResponse<T = Object> {
  data?: T;
  message: string;
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
}

interface ProductVariantOptions {
  variant_option_name: string
  childs: string[]
}

export interface IAPIProductDetail{
    id: 2
    name: string
    description: string
    stars: string
    sold: 0
    available: 0
    images: null
    variant_options: ProductVariantOptions[],
    variants: [
      {
        variant_id: 2,
        variant_name: string,
        selections: [
          {
            selection_variant_name: string,
            selection_name: string
          }
        ],
        stock: 2,
        price: string
      },
    ]
}