import { IAPIUserProfileResponse } from "@/interfaces/api_interface";
import { ICartData } from "@/interfaces/cart_interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ICartStore {
  cart: ICartData[] | undefined;
  updateCart: (data: ICartData[] | undefined) => void;
  refreshCart: boolean;
  updateRefreshCart: () => void;
}

export const useCartStore = create(
  persist<ICartStore>(
    (set) => ({
      cart: undefined,
      updateCart: (data) => set(() => ({ cart: data })),
      refreshCart: false,
      updateRefreshCart: () =>
        set((state) => ({ refreshCart: !state.refreshCart })),
    }),
    {
      name: "selectedCart",
    }
  )
);
