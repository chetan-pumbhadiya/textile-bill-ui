import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Container from "./components/Container";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetBill } from "./services/hooks";

const Layout = () => {
    const [company, setCompany] = useState("ramdev");
    const [date, setDate] = useState(
        new Date().toLocaleDateString("en-GB").replace(/-/g, "/")
    );
    const [updateDate, setUpdateDate] = useState(null);

    const { data, isLoading } = useGetBill({
        bill_date: updateDate,
        company,
    });

    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    };

    const handleDateChange = (value) => {
        const { day, month, year } = value;
        const newDate = `${day}/${month}/${year}`;
        setDate(newDate);
        setUpdateDate(newDate);
    };

    return (
        <div className="flex bg-slate-50">
            <Sidebar
                onChange={handleCompanyChange}
                date={date}
                onDateChange={handleDateChange}
            />
            <Container
                company={company}
                isBillFetching={isLoading}
                data={data}
            />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>
    );
};

export default Layout;
