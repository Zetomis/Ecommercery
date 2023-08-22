const Divider = ({ type }: { type: "horizontal" | "vertical" }) => {
    if (type === "horizontal") {
        return <div className="my-2 h-1 bg-slate-600 w-full rounded-sm" />;
    } else {
        return <div className="mx-2 w-1 h-full bg-slate-600 rounded-sm" />;
    }
};

export default Divider;
