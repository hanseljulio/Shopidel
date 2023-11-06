import { IAPIUserProfileResponse } from "@/interfaces/api_interface";
import { ICartItems } from "@/interfaces/cart_interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ICartStore {
  cart: ICartItems[] | undefined;
  updateCart: (data: ICartItems[]) => void;
}

export const useCartStore = create(
  persist<ICartStore>(
    (set) => ({
      cart: undefined,
      updateCart: (data) => set(() => ({ cart: data })),
    }),
    {
      name: "selectedCart",
    }
  )
);
