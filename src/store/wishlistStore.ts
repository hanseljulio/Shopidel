import { IAPIUserProfileResponse } from "@/interfaces/api_interface";
import { ICartData } from "@/interfaces/cart_interface";
import { IWishlist } from "@/interfaces/product_interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IWishlistStore {
  wishlist: IWishlist[] | undefined;
  updateWishlist: (data: IWishlist[] | undefined) => void;
}

export const useWishlistStore = create(
  persist<IWishlistStore>(
    (set) => ({
      wishlist: undefined,
      updateWishlist: (data) => set(() => ({ wishlist: data })),
    }),
    {
      name: "wishlist",
    }
  )
);
