import React from "react";

const Label = ({ title, htmlFor, className = "" }) => {
    return (
        <label htmlFor={htmlFor} className={className}>
            {title}
        </label>
    );
};

export default Label;
