import { useMutation, useQuery } from "react-query";
import { IBill, IGetBillPayload } from "../types/IBill";
import { addNewBill, fetchBill } from "./api";
import { toast } from "react-toastify";

export const useAddNewBill = () => {
    return useMutation({
        mutationFn: (payload: IBill) => {
            return addNewBill(payload);
        },
        onSuccess: () => {
            toast.success("Successfully save bill data.");
        },
        onError: (err) => {
            console.log(err);
            toast.error("Something went wrong!");
        },
    });
};

export const useGetBill = (payload: IGetBillPayload) => {
    return useQuery({
        queryKey: ["getBill", payload.bill_date, payload.company],
        queryFn: () => fetchBill(payload),
        onSuccess: (data) => {
            if (data) {
                toast.success("Successfully fetch bill data");
            } else {
                toast.error("Bill not found");
            }
        },
        onError: (err) => {
            console.log("err", err);
            toast.error("Something went wrong!");
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: !!payload.bill_date,
    });
};
