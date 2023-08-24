"use client";

import Button from "@/components/previews/Button";
import Divider from "@/components/small/Divider";
import UserProductsDisplay from "@/components/user/UserProductsDisplay";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ManagePage = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return null;
    }

    if (status === "authenticated") {
        return (
            <div className="grid gap-y-2">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-xl">
                        {session?.user.name}
                        {"'s "}Store
                    </h1>
                    <Link href={"/new-product"} className="button default">
                        Add new Product
                    </Link>
                </div>
                <Divider type="horizontal" />
                <UserProductsDisplay userId={session.user.id} />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-center text-4xl font-extrabold">
                Sign In to continue
            </h1>
        </div>
    );
};

export default ManagePage;
