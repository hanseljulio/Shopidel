import { IAPIUserProfileResponse } from "@/interfaces/api_interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserStore {
  user: IAPIUserProfileResponse | undefined;
  updateUser: (data: IAPIUserProfileResponse | undefined) => void;
}

export const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      user: undefined,
      updateUser: (data) => set(() => ({ user: data })),
    }),
    {
      name: "user",
    }
  )
);
