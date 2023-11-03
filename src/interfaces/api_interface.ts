export interface IAPIResponse<T = Object> {
    data?: T
    message: string
}

export interface IAPIWalletResponse {
    balance: string
    wallet_number: string
    isActive: boolean
}

