export interface ICartData {
  shop_name: string;
  cart_items: ICartItems[];
}

export interface ICartItems {
  id: number;
  product_image_url: string;
  product_name: string;
  product_unit_price: string;
  product_quantity: number;
  product_total_price: string;
  isChecked: boolean;
}
