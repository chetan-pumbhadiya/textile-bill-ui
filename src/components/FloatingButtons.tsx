import React, { useEffect, useState } from "react";
import { Button, cn } from "@nextui-org/react";
import {
    IconChevronsUp,
    IconDeviceFloppy,
    IconFileDownload,
    IconPhotoDown,
    IconPrinter,
    IconRefresh,
    IconTableOptions,
} from "@tabler/icons-react";
import ButtonWithTooltip from "./ButtonWithTooltip";
import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";

const FloatingButtons = ({ reset, setIsLoading, save, data = null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isPDFLoading, setIsPDFLoading] = useState(false);
    const [isImgLoading, setIsImgLoading] = useState(false);

    const handleShowOptions = () => {
        setIsOpen(!isOpen);
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleBillPrint = () => {
        const printContent = document.getElementById("challan-form").innerHTML;

        const printWindow = document.createElement("iframe");
        document.body.appendChild(printWindow);
        printWindow.style.display = "none";

        printWindow.contentDocument.write(`
        <html>
            <head>
                <link href="https://cdn.tailwindcss.com" rel="stylesheet">
            </head>
            <body>${printContent}</body>
        </html>`);

        // Print and remove the iframe
        printWindow.contentDocument.close();
        printWindow.contentWindow.print();
        document.body.removeChild(printWindow);
    };

    const handleFilterImgNode = (node) => {
        if (node.tagName === "BUTTON" && node.id === "add_row") {
            node.style.visibility = "hidden";
            return true;
        }
        return true;
    };

    const handleDownloadBillPDF = async () => {
        const element = document.getElementById("challan-form");
        if (element) {
            setIsPDFLoading(true);
            const inputs = element.querySelectorAll("input");
            const originalPlaceholders = [];
            inputs.forEach((input, index) => {
                originalPlaceholders[index] = input.placeholder;
                input.placeholder = "";
            });

            const imgDataUrl = await toJpeg(element, {
                quality: 1,
                filter: handleFilterImgNode,
            });

            const addRowButton = element.querySelector(
                "#add_row"
            ) as HTMLElement;
            addRowButton.style.visibility = "visible";
            inputs.forEach((input, index) => {
                input.placeholder = originalPlaceholders[index]; // Restore original placeholder
            });

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "pt",
                format: "a4",
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = element.clientWidth;
            const imgHeight = element.clientHeight;
            const ratio = Math.min(
                pageWidth / imgWidth,
                pageHeight / imgHeight
            );
            const scaledWidth = imgWidth * ratio;
            const scaledHeight = imgHeight * ratio;

            const xOffset = (pageWidth - scaledWidth) / 2;
            const yOffset = (pageHeight - scaledHeight) / 2;

            pdf.addImage(
                imgDataUrl,
                "JPEG",
                xOffset,
                yOffset,
                scaledWidth,
                scaledHeight
            );

            pdf.save("challan-form.pdf");
            setIsPDFLoading(false);
        }
    };

    const handleDownloadBillImage = async () => {
        const element = document.getElementById("challan-form");
        if (element) {
            setIsImgLoading(true);
            const inputs = element.querySelectorAll("input");
            const originalPlaceholders = [];
            inputs.forEach((input, index) => {
                originalPlaceholders[index] = input.placeholder;
                input.placeholder = "";
            });

            const imgDataUrl = await toJpeg(element, {
                quality: 1,
                filter: handleFilterImgNode,
            });

            const addRowButton = element.querySelector(
                "#add_row"
            ) as HTMLElement;
            addRowButton.style.visibility = "visible";
            inputs.forEach((input, index) => {
                input.placeholder = originalPlaceholders[index]; // Restore original placeholder
            });

            const link = document.createElement("a");
            link.href = imgDataUrl;
            link.download = "challan-form.jpeg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsImgLoading(false);
        }
    };

    useEffect(
        () => setIsLoading(isImgLoading || isPDFLoading),
        [isImgLoading, isPDFLoading]
    );

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <>
            <div className="fixed bottom-7 left-7 z-50 flex flex-col items-start space-y-2">
                <div
                    className={`flex flex-col items-start space-y-2 transition-transform duration-300 ${
                        isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }`}
                >
                    {isOpen && (
                        <>
                            {/* <ButtonWithTooltip
                                content="Print"
                                icon={<IconPrinter />}
                                onClick={handleBillPrint}
                            /> */}
                            <ButtonWithTooltip
                                content="Download PDF"
                                icon={<IconFileDownload />}
                                onClick={handleDownloadBillPDF}
                                isLoading={isPDFLoading}
                            />
                            <ButtonWithTooltip
                                content="Download Image"
                                icon={<IconPhotoDown />}
                                onClick={handleDownloadBillImage}
                                isLoading={isImgLoading}
                            />
                            {!data && (
                                <ButtonWithTooltip
                                    content="Save"
                                    icon={<IconDeviceFloppy />}
                                    onClick={save}
                                />
                            )}
                            <ButtonWithTooltip
                                content="Reset"
                                icon={<IconRefresh />}
                                onClick={reset}
                            />
                        </>
                    )}
                </div>
                <ButtonWithTooltip
                    content="Options"
                    icon={<IconTableOptions />}
                    onClick={handleShowOptions}
                />
            </div>
            <div className="fixed bottom-7 right-7 z-50 flex flex-col items-start space-y-2">
                <Button
                    isIconOnly
                    color="primary"
                    variant="flat"
                    className={cn(
                        "shadow-lg transform hover:scale-110",
                        isVisible
                            ? "transition-opacity duration-300 opacity-100"
                            : "opacity-0"
                    )}
                    aria-label="top scroll"
                    onClick={handleScrollToTop}
                >
                    <IconChevronsUp />
                </Button>
            </div>
        </>
    );
};

export default FloatingButtons;
