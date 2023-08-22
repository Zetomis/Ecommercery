const UserButtonSkeleton = () => {
    return (
        <div className="flex gap-x-2 justify-self-end">
            <div className="flex flex-col justify-between items-end">
                <div className="w-12 h-4 bg-slate-200" />
                <div className="w-16 h-3 bg-slate-200" />
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
        </div>
    );
};

export default UserButtonSkeleton;
