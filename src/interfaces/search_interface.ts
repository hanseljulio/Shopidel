type ProductSortByType = "recommended" | "price" | "date" | "most_buy";
type ProductSortType = "asc" | "desc";
interface IProductFilter {
  s: string;
  sortBy: ProductSortByType;
  sort: ProductSortType;
  district: string;
  page: string;
  limit: number;
  categoryId: string;
  minRating: string;
  minPrice: string;
  maxPrice: string;
}
