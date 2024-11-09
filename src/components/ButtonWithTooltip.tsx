import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { IconLoader3 } from "@tabler/icons-react";

const ButtonWithTooltip = ({ content, icon, onClick, isLoading = false }) => {
    return (
        <Tooltip
            color="primary"
            content={content}
            className="capitalize"
            placement="right"
        >
            <Button
                isIconOnly
                color="primary"
                variant="flat"
                aria-label={content}
                onClick={onClick}
                isLoading={isLoading}
                spinner={<IconLoader3 className="animate-spin" />}
            >
                {icon}
            </Button>
        </Tooltip>
    );
};

export default ButtonWithTooltip;
