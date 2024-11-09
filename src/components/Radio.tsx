import { cn, RadioProps, useRadio, VisuallyHidden } from "@nextui-org/react";

const Radio = (props: RadioProps) => {
    const {
        Component,
        children,
        description,
        getBaseProps,
        getWrapperProps,
        getInputProps,
        getLabelProps,
        getLabelWrapperProps,
        getControlProps,
    } = useRadio(props);

    return (
        <Component
            {...getBaseProps()}
            className={cn(
                "group inline-flex items-center justify-between hover:bg-primary/10 hover:text-primary-500 flex-row-reverse",
                "cursor-pointer rounded-lg gap-4 p-4",
                "data-[selected=true]:border-primary data-[selected=true]:bg-primary/20",
                "bg-primary/10 text-primary-700 text-bold"
            )}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <span {...getWrapperProps()}>
                <span {...getControlProps()} />
            </span>
            <div {...getLabelWrapperProps()}>
                {children && (
                    <span
                        {...getLabelProps()}
                        className="text-primary-700 font-semibold"
                    >
                        {children}
                    </span>
                )}
                {description && (
                    <span className="text-small text-foreground opacity-70">
                        {description}
                    </span>
                )}
            </div>
        </Component>
    );
};
export default Radio;
