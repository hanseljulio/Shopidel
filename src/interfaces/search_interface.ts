type ProductSortByType = "recommended" | "price" | "newest" | "most_buy";
type ProductSortType = "asc" | "desc";
interface IProductFilter {
  districts: string[];
  price: {
    min: string;
    max: string;
  };
  rating: number[];
  category: number[];
  sortBy: ProductSortByType;
  sort: ProductSortType;
}
