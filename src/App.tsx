import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import Layout from "./Layout";

const App = () => {
    return (
        <NextUIProvider locale="hi-IN">
            <Layout />
        </NextUIProvider>
    );
};

export default App;
