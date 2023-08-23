import { ReactNode } from "react";

type ButtonType = "default" | "ghost";

const Button = ({
    children,
    type = "default",
    className,
    onClick,
    isLoading,
}: {
    children: ReactNode;
    type?: ButtonType;
    className?: string;
    onClick?: () => void;
    isLoading?: boolean;
}) => {
    return (
        <button
            className={`button ${type} ${className}`}
            onClick={onClick}
            disabled={isLoading}
        >
            {children}
        </button>
    );
};

export default Button;
