import React from "react";
import { Button, Input } from "@nextui-org/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import Label from "./Label";

const BillTable = ({
    rows,
    addRow,
    onChange,
    removeRow,
    state,
    gstOnChange,
    subtotal,
    calGST,
    total,
    data = null,
}) => {
    const { bill_cgst, bill_sgst } = state;

    return (
        <>
            {/* Main table */}
            <table id="bill_table" className="w-full table-fixed mt-3.5">
                <thead className="w-full">
                    <tr>
                        <th className="font-bold w-[14%]">
                            <span
                                className="bill_item block w-full border-2 border-solid rounded-lg py-1"
                                id="bill_item"
                            >
                                Challan No.
                            </span>
                        </th>
                        <th className="font-bold w-[50%]">
                            <span
                                className="bill_description block w-full border-2 border-solid rounded-lg py-1"
                                id="bill_description"
                            >
                                Particular
                            </span>
                        </th>
                        <th className="font-bold w-[10%]">
                            <span
                                className="bill_quantity block w-full border-2 border-solid rounded-lg py-1"
                                id="bill_quantity"
                            >
                                Pieces
                            </span>
                        </th>
                        <th className="font-bold w-[13%]">
                            <span
                                className="bill_rate block w-full border-2 border-solid rounded-lg py-1"
                                id="bill_rate"
                            >
                                Rate
                            </span>
                        </th>
                        <th className="font-bold w-[13%]">
                            <span
                                className="bill_price block w-full border-2 border-solid rounded-lg py-1"
                                id="bill_price"
                            >
                                Price
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className="table_body_content">
                    {rows.map((row, index) => (
                        <tr
                            key={row.id}
                            className="group relative hover:bg-gray-100"
                        >
                            <td>
                                <Input
                                    type="number"
                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                    // placeholder={(index + 1).toString()}
                                    value={row.challan_no}
                                    name="challan_no"
                                    onChange={(e) =>
                                        onChange(
                                            row.id,
                                            "challan_no",
                                            e.target.value
                                        )
                                    }
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
                                />
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                    value={row.particular}
                                    name="particular"
                                    onChange={(e) =>
                                        onChange(
                                            row.id,
                                            "particular",
                                            e.target.value
                                        )
                                    }
                                    variant="bordered"
                                    size="sm"
                                />
                            </td>
                            <td>
                                <Input
                                    type="number"
                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                    // placeholder="0"
                                    name="piece"
                                    value={row.piece}
                                    onChange={(e) =>
                                        onChange(
                                            row.id,
                                            "piece",
                                            e.target.value
                                        )
                                    }
                                    variant="bordered"
                                    size="sm"
                                    min={0}
                                />
                            </td>
                            <td>
                                <Input
                                    type="number"
                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                    // placeholder="0.00"
                                    name="rate"
                                    value={row.rate}
                                    onChange={(e) =>
                                        onChange(row.id, "rate", e.target.value)
                                    }
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
                                />
                            </td>
                            <td>
                                <Input
                                    type="number"
                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                    // placeholder="0.00"
                                    name="price"
                                    value={row.price}
                                    // onChange={(e) =>
                                    //     onChange(
                                    //         row.id,
                                    //         "price",
                                    //         e.target.value
                                    //     )
                                    // }
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
                                    disabled
                                />
                            </td>
                            {rows.length > 1 && !data && (
                                <Button
                                    className="absolute -left-7 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer w-6 min-w-6 h-6"
                                    isIconOnly
                                    color="danger"
                                    aria-label="remove"
                                    onClick={() => removeRow(row.id)}
                                    disabled={rows.length === 1}
                                    size="sm"
                                >
                                    <IconMinus />
                                </Button>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add row button */}

            {!data && (
                <Button
                    id="add_row"
                    className="mt-1 w-6 min-w-6 h-6"
                    isIconOnly
                    color="primary"
                    aria-label="addRow"
                    onClick={addRow}
                    size="sm"
                >
                    <IconPlus />
                </Button>
            )}

            {/* Total section */}
            <div className="w-full flex justify-end ">
                <table className="w-5/12">
                    <tbody className="table_total">
                        <tr className="bill_subtotal">
                            <td className="w-1/2 font-bold">
                                <div className="border-2 border-solid rounded-lg bg-white h-[35.2px] min-h-[35.2px] py-[5px] px-2 flex items-center m-0">
                                    <Label
                                        title="Subtotal"
                                        htmlFor="subtotal"
                                    />
                                </div>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="bill_subtotal"
                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                    placeholder="0.00"
                                    variant="bordered"
                                    size="sm"
                                    value={subtotal}
                                    min={0}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-small font-bold">
                                                ₹
                                            </span>
                                        </div>
                                    }
                                    disabled
                                    defaultValue="0.00"
                                />
                            </td>
                        </tr>
                        <tr className="bill_cgst">
                            <td className="w-1/2 font-bold">
                                <div className="border-2 border-solid rounded-lg bg-white h-[35.2px] min-h-[35.2px] py-[5px] px-2 flex items-center m-0">
                                    <Label
                                        title="CGST"
                                        htmlFor="cgst"
                                        className="mr-1"
                                    />
                                    <Input
                                        type="number"
                                        name="bill_cgst"
                                        className="w-[70px]"
                                        placeholder="0.00"
                                        variant="bordered"
                                        size="sm"
                                        min={0}
                                        value={bill_cgst}
                                        onChange={gstOnChange}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-small font-bold">
                                                    %
                                                </span>
                                            </div>
                                        }
                                        defaultValue="2.5"
                                    />
                                </div>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                    placeholder="0.00"
                                    variant="bordered"
                                    size="sm"
                                    min={0}
                                    value={calGST(bill_cgst)}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-small font-bold">
                                                ₹
                                            </span>
                                        </div>
                                    }
                                    disabled
                                />
                            </td>
                        </tr>
                        <tr className="bill_sgst">
                            <td className="w-1/2 font-bold">
                                <div className="border-2 border-solid rounded-lg bg-white h-[35.2px] min-h-[35.2px] py-[5px] px-2 flex items-center m-0">
                                    <Label
                                        title="SGST"
                                        htmlFor="sgst"
                                        className="mr-1"
                                    />
                                    <Input
                                        type="number"
                                        name="bill_sgst"
                                        className="w-[70px]"
                                        placeholder="0.00"
                                        variant="bordered"
                                        size="sm"
                                        min={0}
                                        value={bill_sgst}
                                        onChange={gstOnChange}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-small font-bold">
                                                    %
                                                </span>
                                            </div>
                                        }
                                        defaultValue="2.5"
                                    />
                                </div>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                    placeholder="0.00"
                                    variant="bordered"
                                    size="sm"
                                    min={0}
                                    value={calGST(bill_sgst)}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-small font-bold">
                                                ₹
                                            </span>
                                        </div>
                                    }
                                    disabled
                                />
                            </td>
                        </tr>
                        <tr className="bill_total">
                            <td className="w-1/2 font-bold">
                                <div className="border-2 border-solid rounded-lg bg-white h-[35.2px] min-h-[35.2px] py-[5px] px-2 flex items-center m-0">
                                    <Label title="Total" htmlFor="total" />
                                </div>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    className="w-full border-2 border-solid rounded-lg bg-white"
                                    placeholder="0.00"
                                    variant="bordered"
                                    size="sm"
                                    min={0}
                                    value={total}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-small font-bold">
                                                ₹
                                            </span>
                                        </div>
                                    }
                                    disabled
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BillTable;
