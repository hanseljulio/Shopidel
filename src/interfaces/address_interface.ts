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
