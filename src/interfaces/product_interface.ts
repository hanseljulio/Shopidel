export interface IProduct {
  id: number;
  name: string;
  district: string;
  total_sold: number;
  price: string;
  picture_url: string;
  seller_name: string;
}

export interface IReviewProduct
{
    customer_name: string,
    customer_picture_url: string
    stars: string,
    comment: string,
    variant: string,
    created_at: string
}

export interface IProductSuggestion{
    product_id: number,
    product_name: string
    product_picture_url: string
    product_price: string
    seller_name: string
}