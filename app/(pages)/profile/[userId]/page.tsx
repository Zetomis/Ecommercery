"use client";

import { getUser } from "@/libs/actions/user.actions";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Button from "@/components/previews/Button";
import UserPageSkeleton from "@/components/skeleton/pages/UserPageSkeleton";
import NotFound from "@/components/previews/NotFound";

const ProfilePage = ({ params }: { params: { userId: string } }) => {
    const userQuery = useQuery<User | null>({
        queryKey: ["user", { id: params.userId }],
        queryFn: () => {
            return getUser(params.userId);
        },
    });

    if (userQuery.isLoading) {
        return <UserPageSkeleton />;
    }

    if (userQuery.isError || !userQuery.data) {
        return <NotFound />;
    }

    return (
        <div>
            <div className="flex gap-x-4 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
                    <Image
                        src={userQuery.data.image}
                        alt=""
                        quality={100}
                        width={96}
                        height={96}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <h1 className="font-extrabold text-2xl">
                        {userQuery.data.name}
                    </h1>
                    <Button type="default">Follow User</Button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
