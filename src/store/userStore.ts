import { create } from 'zustand'

export interface IUser {
  email: string
  password: string
  username: string
  fullname: string
  gender: string
  birthdate: string
  profilePhoto?: string
  phone: number
  shopName?: string
}

interface IRegisterState {
  registerData: Partial<IUser>
  updateRegisterData: (data: IUser) => void
}

const useRegisterStore = create<IRegisterState>((set) => ({
  registerData: {},
  updateRegisterData: (data) => set((state) => ({ registerData: { ...state.registerData, ...data } }))
}))


export default useRegisterStore