export interface IBestSelling {
  name: string;
  price: string;
  picture_url: string;
  stars: string;
  total_sold: string;
  category: string;
  product_name_slug: string;
  shop_name_slug: string;
}

export interface IEtalaseSeller {
  showcase_id: number;
  showcase_name: string;
}

export interface IEtalase {
  data: IEtalaseSeller[];
  pagination: {
    total_page: number;
    total_item: number;
    current_page: number;
    limit: number;
  };
}

export interface IAPIProfileShopResponse {
  seller_id: number;
  seller_name: string;
  seller_picture_url: string;
  seller_district: string;
  seller_operating_hour: {
    start: string;
    end: string;
  };
  seller_stars: string;
  shop_name_slug: string;
  seller_products: [
    {
      name: string;
      price: string;
      picture_url: string;
      stars: string;
      total_sold: number;
      created_at: string;
      category_level_1: string;
      category_level_2: string;
      category_level_3: string;
    },
    {
      name: string;
      price: string;
      picture_url: string;
      stars: string;
      total_sold: number;
      created_at: string;
      category_level_1: string;
      category_level_2: string;
      category_level_3: string;
    }
  ];
}

export interface IProfileShopProps {
  seller: IAPIProfileShopResponse;
}
export interface ISellerOrderHistory {
  data: ISellerOrderHistoryData[];
  pagination: {
    total_page: number;
    total_item: number;
    current_page: number;
    limit: number;
  };
}

export interface ISellerOrderHistoryData {
  order_id: number;
  buter_name: string;
  status: string;
  products: ISellerOrderHistoryProducts[];
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
  created_at: string;
}

export interface ISellerOrderHistoryProducts {
  product_id: number;
  product_order_detail_id: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  individual_price: string;
  review: ISellerOrderHistoryReview;
  is_reviewed: boolean;
}

export interface ISellerOrderHistoryReview {
  review_id: number;
  review_feedback: string;
  review_rating: number;
  review_image_url: string;
  created_at: string;
}

export interface ITransactionHistoryPromotions {
  marketplace_voucher: string;
  shop_voucher: string;
}
