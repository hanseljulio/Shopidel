import axios from "axios"

export const API = axios.create({
    baseURL: "https://digitalent.games.test.shopee.io/vm2/api"
})