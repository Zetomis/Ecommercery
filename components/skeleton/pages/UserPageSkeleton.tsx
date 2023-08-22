const UserPageSkeleton = () => {
    return (
        <div>
            <div className="flex gap-x-4 items-center">
                <div className="w-24 h-24 rounded-full bg-slate-200" />
                <div className="flex flex-col gap-y-2">
                    <div className="h-8 w-32 bg-slate-200" />
                    <div className="h-12 w-28 bg-slate-200" />
                </div>
            </div>
        </div>
    );
};

export default UserPageSkeleton;
