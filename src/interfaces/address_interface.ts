export interface IAddress {
  id: number;
  full_address: string;
  detail: string;
  zip_code: string;
  kelurahan: string;
  sub_district: string;
  district: string;
  province: string;
  is_buyer_default: boolean;
  is_seller_default: boolean;
}
