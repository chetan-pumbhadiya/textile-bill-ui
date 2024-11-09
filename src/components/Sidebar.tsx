import React from "react";
import { DatePicker, RadioGroup } from "@nextui-org/react";
import Radio from "./Radio";
import { convertSupportedDateFormat } from "../constance";
import { getLocalTimeZone, now } from "@internationalized/date";

const Sidebar = ({ onChange, date, onDateChange }) => {
    return (
        <div className="flex h-screen px-2.5 lg:px-5 md:px-5 sm:px-2.5 w-full lg:w-2/6 md:w-1/4">
            <div className="py-4 px-3 w-full flex flex-col gap-4">
                <RadioGroup
                    label="Select company"
                    defaultValue="ramdev"
                    onChange={onChange}
                >
                    <Radio description="" value="ramdev">
                        Ramdev
                    </Radio>
                    <Radio description="" value="nakalang">
                        Nakalang
                    </Radio>
                </RadioGroup>

                <DatePicker
                    label="Fetch past bill"
                    className="past_bill_date text-primary-700"
                    dateInputClassNames={{
                        label: "text-foreground-500 leading-6 text-[15px] mb-1",
                        innerWrapper: "text-primary-700",
                    }}
                    labelPlacement="outside"
                    color="primary"
                    value={convertSupportedDateFormat(date)}
                    onChange={onDateChange}
                    maxValue={now(getLocalTimeZone())}
                />

                {/* <div className="flex justify-between">
                    <Tooltip
                        color="primary"
                        content="Print"
                        className="capitalize"
                    >
                        <Button
                            color="primary"
                            variant="flat"
                            endContent={<IconPrinter />}
                            aria-label="Print"
                            className="font-semibold"
                        >
                            Print
                        </Button>
                    </Tooltip>
                    <Tooltip
                        color="primary"
                        content="Download PDF"
                        className="capitalize"
                    >
                        <Button
                            color="primary"
                            variant="flat"
                            endContent={<IconFileDownload />}
                            aria-label="Download PDF"
                            className="font-semibold"
                        >
                            Download PDF
                        </Button>
                    </Tooltip>
                    <Tooltip
                        color="primary"
                        content="Download Image"
                        className="capitalize"
                    >
                        <Button
                            color="primary"
                            variant="flat"
                            endContent={<IconPhotoDown />}
                            aria-label="Download Image"
                            className="font-semibold"
                        >
                            Download Image
                        </Button>
                    </Tooltip>
                    <Tooltip
                        color="primary"
                        content="Reset"
                        className="capitalize"
                    >
                        <Button
                            isIconOnly
                            color="primary"
                            variant="flat"
                            aria-label="Reset"
                        >
                            <IconRefresh />
                        </Button>
                    </Tooltip>
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
