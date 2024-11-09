import { IBill, IGetBillPayload } from "../types/IBill";
import { axiosInstance } from "./request";

export const addNewBill = async (body: IBill) => {
    const response = await axiosInstance.post(`/bill/add`, body);
    return response.data;
};

export const fetchBill = async (body: IGetBillPayload) => {
    const response = await axiosInstance.get(
        `/bill/get?company=${body.company}&bill_date=${body.bill_date}`
    );
    return response.data;
};
