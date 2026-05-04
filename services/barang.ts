import axios from "axios"
import { getServerCookie } from "@/lib/server-cookie"
import { BASE_API_URL, APP_KEY } from "@/global"
import { Barang } from "@/types/barang"

type ResponseData = {
    status: boolean
    message: string
    data?: Barang[]
}

export const GetBarang = async (): Promise<ResponseData>=>{
    try {
        const token = await getServerCookie("token");
        const response = await axios.get(`${BASE_API_URL}/barang?page=1&quantity=10`, {
            headers: {
                "Content-Type": "application/json",
                'app-key': `${APP_KEY}`,
                'authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        return {
            status: true,
            message: "Barang fetched successfully",
            data: data.data
        };
    } catch (error) {
        return {
            status: false,
            message: "Failed to fetch barang",
        }
    }
}