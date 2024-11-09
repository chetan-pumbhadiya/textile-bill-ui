import React, { useEffect, useState } from "react";
import { DatePicker, Image, Input } from "@nextui-org/react";
import Label from "./Label";
import BillTable from "./BillTable";
import FloatingButtons from "./FloatingButtons";
import { IconLoader3 } from "@tabler/icons-react";
import { useAddNewBill } from "../services/hooks";
import { convertSupportedDateFormat } from "../constance";

const initState = {
    party_name: "",
    party_address_1: "",
    party_address_2: "",
    party_contact_no: "",
    party_email: "",
    party_gst_no: "",
    bill_no: "",
    bill_date: new Date().toLocaleDateString("en-GB").replace(/-/g, "/"),
    bill_cgst: "2.5",
    bill_sgst: "2.5",
};

const initTableRows = [
    {
        id: 1,
        challan_no: "",
        particular: "",
        piece: "",
        rate: "",
        price: "",
    },
    {
        id: 2,
        challan_no: "",
        particular: "",
        piece: "",
        rate: "",
        price: "",
    },
    {
        id: 3,
        challan_no: "",
        particular: "",
        piece: "",
        rate: "",
        price: "",
    },
];

const Container = ({ company, isBillFetching = false, data = null }) => {
    const [state, setState] = useState(initState);
    const [tableRows, setTableRows] = useState(initTableRows);
    const [isLoading, setIsLoading] = useState(false);
    const {
        party_name,
        party_address_1,
        party_address_2,
        party_contact_no,
        party_email,
        party_gst_no,
        bill_no,
        bill_date,
        bill_cgst,
        bill_sgst,
    } = state;

    const { mutate, isLoading: isDataSaving, isSuccess } = useAddNewBill();

    const handleInputChange = (event) => {
        setState((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleDateChange = (value) => {
        console.log("value", value);
        const { day, month, year } = value;
        setState((prev) => ({
            ...prev,
            bill_date: `${day}/${month}/${year}`,
        }));
    };

    const handleRowAdd = () => {
        setTableRows([
            ...tableRows,
            {
                id: tableRows.length + 1,
                challan_no: "",
                particular: "",
                piece: "",
                rate: "",
                price: "",
            },
        ]);
    };

    const handleRowChange = (id, field, value) => {
        // setTableRows(
        //     tableRows.map((row) =>
        //         row.id === id ? { ...row, [field]: value } : row
        //     )

        setTableRows((prevRows) => {
            return prevRows.map((row) => {
                if (row.id === id) {
                    const updatedRow = { ...row, [field]: value };

                    if (field === "piece" || field === "rate") {
                        const piece = parseFloat(updatedRow.piece) || 0;
                        const rate = parseFloat(updatedRow.rate) || 0;
                        updatedRow.price = (piece * rate).toString();
                    }

                    return updatedRow;
                }
                return row;
            });
        });
    };

    const handleRowRemove = (id) => {
        if (tableRows.length > 1) {
            setTableRows(tableRows.filter((row) => row.id !== id));
        }
    };

    const getSubtotal = () => {
        const subtotal = tableRows.reduce((total, row) => {
            return total + (parseFloat(row.price) || 0);
        }, 0);
        return parseFloat(subtotal.toFixed(2));
    };

    const calGST = (percentage: string) => {
        const subtotal = getSubtotal();
        const finalCal = subtotal * (parseFloat(percentage) / 100);
        return parseFloat(finalCal.toFixed(2).toString());
    };

    const totalAmount = () => {
        return (getSubtotal() + calGST(bill_cgst) + calGST(bill_sgst)).toFixed(
            2
        );
    };

    const handleBillSave = () => {
        const payload = {
            ...state,
            company,
            bill_rows: tableRows === initTableRows ? [] : tableRows,
        };
        mutate(payload);
    };

    const handleBillReset = () => {
        setState(initState);
        setTableRows(initTableRows);
        setIsLoading(false);
    };

    useEffect(() => setIsLoading(isDataSaving), [isDataSaving, isBillFetching]);
    useEffect(() => handleBillReset(), [isSuccess]);

    useEffect(() => {
        if (data) {
            const {
                party_name,
                party_address_1,
                party_address_2,
                party_contact_no,
                party_email,
                party_gst_no,
                bill_no,
                bill_date,
                bill_cgst,
                bill_sgst,
                bill_rows,
            } = data;
            setState({
                party_name,
                party_address_1,
                party_address_2,
                party_contact_no,
                party_email,
                party_gst_no,
                bill_no,
                bill_date,
                bill_cgst,
                bill_sgst,
            });
            setTableRows(bill_rows);
        }
    }, [data]);

    return (
        <div className="relative w-full border-l bg-slate-200 flex justify-center py-6">
            <div
                id="challan-form"
                className="w-[816px] min-h-[1056px] bg-white relative"
            >
                <p className="text-center text-red-900 absolute top-[5px] left-[47%] text-xs z-[11]">
                    || श्री ||
                </p>
                <Image
                    alt="company"
                    src={
                        company === "ramdev"
                            ? "https://i.ibb.co/txXBZr6/Ramdev.png"
                            : "https://i.ibb.co/cXPMdFk/Nakalang.png"
                    }
                    radius="none"
                    crossOrigin="anonymous"
                />
                <div className="px-11 pb-11 mt-2">
                    <div className="flex">
                        <div className="w-3/5 flex flex-col pr-3 bill_input">
                            <Input
                                type="text"
                                name="party_name"
                                variant="underlined"
                                size="sm"
                                placeholder="Party Name"
                                radius="none"
                                value={party_name}
                                onChange={handleInputChange}
                            />
                            <Input
                                type="text"
                                name="party_address_1"
                                variant="underlined"
                                size="sm"
                                placeholder="Party Address"
                                radius="none"
                                value={party_address_1}
                                onChange={handleInputChange}
                            />
                            <Input
                                type="text"
                                name="party_address_2"
                                variant="underlined"
                                size="sm"
                                radius="none"
                                value={party_address_2}
                                onChange={handleInputChange}
                            />
                            <Input
                                type="text"
                                name="party_contact_no"
                                variant="underlined"
                                size="sm"
                                placeholder="Party Contact No"
                                radius="none"
                                value={party_contact_no}
                                onChange={handleInputChange}
                            />
                            <Input
                                type="Email"
                                name="party_email"
                                variant="underlined"
                                size="sm"
                                placeholder="Party Email"
                                radius="none"
                                value={party_email}
                                onChange={handleInputChange}
                            />
                            <Input
                                type="text"
                                name="party_gst_no"
                                variant="underlined"
                                size="sm"
                                placeholder="Party GST No"
                                radius="none"
                                value={party_gst_no}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-2/5 flex pl-3">
                            <div className="w-full flex justify-end">
                                <table className="w-full mb-[6em]">
                                    <tbody className="table_total">
                                        <tr className="bill_no">
                                            <td className="font-bold">
                                                <div className="border-2 border-solid rounded-lg bg-white h-[35.2px] min-h-[35.2px] py-[5px] px-2 flex items-center m-0">
                                                    <Label
                                                        title="Bill No."
                                                        htmlFor="bill_no"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <Input
                                                    type="text"
                                                    name="bill_no"
                                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                                    // placeholder="0123"
                                                    variant="bordered"
                                                    size="sm"
                                                    min={0}
                                                    startContent={
                                                        <div className="pointer-events-none flex items-center">
                                                            <span className="text-default-400 text-small">
                                                                #
                                                            </span>
                                                        </div>
                                                    }
                                                    value={bill_no}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="bill_no">
                                            <td className="font-bold">
                                                <div className="border-2 border-solid rounded-lg bg-white h-[35.2px] min-h-[35.2px] py-[5px] px-2 flex items-center m-0">
                                                    <Label
                                                        title="Date"
                                                        htmlFor="date"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <DatePicker
                                                    name="bill_date"
                                                    variant="bordered"
                                                    size="sm"
                                                    className="bill_date border-2 border-solid rounded-lg bg-white"
                                                    value={convertSupportedDateFormat(
                                                        bill_date
                                                    )}
                                                    onChange={handleDateChange}
                                                    granularity="day"
                                                />
                                            </td>
                                        </tr>
                                        <tr className="bill_no">
                                            <td className="font-bold">
                                                <div className="border-2 border-solid rounded-lg bg-white h-[35.2px] min-h-[35.2px] py-[5px] px-2 flex items-center m-0">
                                                    <Label
                                                        title="Amount"
                                                        htmlFor="amount"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <Input
                                                    type="text"
                                                    name="bill_amount"
                                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    size="sm"
                                                    min={0}
                                                    startContent={
                                                        <div className="pointer-events-none flex items-center">
                                                            <span className="text-default-400 text-small">
                                                                ₹
                                                            </span>
                                                        </div>
                                                    }
                                                    value={totalAmount().toString()}
                                                    onChange={handleInputChange}
                                                    disabled
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <BillTable
                        rows={tableRows}
                        addRow={handleRowAdd}
                        onChange={handleRowChange}
                        removeRow={handleRowRemove}
                        state={state}
                        gstOnChange={handleInputChange}
                        subtotal={getSubtotal()}
                        calGST={calGST}
                        total={totalAmount()}
                        data={data}
                    />

                    <div className="w-full flex justify-between mt-8">
                        <span className="border-t-2 border-stone-700">
                            Receiver's Signature
                        </span>
                        <span className="border-t-2 border-stone-700">
                            For,{" "}
                            {company === "ramdev"
                                ? "Ramdev Fashion"
                                : "Naklang Fashion Point"}
                        </span>
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-200/50">
                    <IconLoader3 className="animate-spin text-primary-700 w-12 h-12" />
                </div>
            )}

            <FloatingButtons
                reset={handleBillReset}
                setIsLoading={setIsLoading}
                save={handleBillSave}
                data={data}
            />
        </div>
    );
};

export default Container;
