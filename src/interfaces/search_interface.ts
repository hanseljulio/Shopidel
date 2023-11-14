type ProductSortByType = "recommended" | "price" | "newest" | "most_buy";
type ProductSortType = "asc" | "desc";
interface IProductFilter {
  districts: string[];
  price: {
    min: string;
    max: string;
  };
  minRating: string;
  category: string[];
  sortBy: ProductSortByType;
  sort: ProductSortType;
}
