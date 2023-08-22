//This thing kinda show when clicked

import { Dispatch, ReactNode, SetStateAction } from "react";

const PopupWidget = ({
    children,
    isShowing,
    className,
}: {
    children: ReactNode;
    isShowing?: boolean;
    className?: string;
}) => {
    if (!isShowing) {
        return null;
    }

    return (
        <div
            className={`absolute top-full mt-2 right-0 px-4 py-3 rounded border border-slate-600 bg-slate-50 text-slate-800 z-20 ${className}`}
        >
            {children}
        </div>
    );
};

export default PopupWidget;
