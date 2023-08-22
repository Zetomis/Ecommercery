import { ReactNode } from "react";

type ButtonType = "default";

const Button = ({
    children,
    type = "default",
}: {
    children: ReactNode;
    type: ButtonType;
}) => {
    return <button className={`button ${type}`}>{children}</button>;
};

export default Button;
