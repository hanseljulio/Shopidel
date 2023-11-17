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
  
  export interface IEtalase {
    showcase_id: number;
    showcase_name: string;
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
  