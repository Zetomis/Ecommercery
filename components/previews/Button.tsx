import { ReactNode } from "react";

type ButtonType = "default";

const Button = ({
    children,
    type = "default",
    className,
    onClick,
}: {
    children: ReactNode;
    type?: ButtonType;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <button className={`button ${type} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
