"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../previews/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import UserAvatar from "./UserAvatar";
import PopupWidget from "../widgets/PopupWidget";
import { useState } from "react";
import Link from "next/link";
import Divider from "../small/Divider";
import UserButtonSkeleton from "../skeleton/components/UserButtonSkeleton";

const UserButton = () => {
    const { data: session, status } = useSession();
    const [isShowing, setIsShowing] = useState(false);

    if (status === "loading") {
        return <UserButtonSkeleton />;
    }

    if (status === "unauthenticated") {
        return (
            <Button
                type="default"
                className="button default w-fit justify-self-end flex items-center gap-x-2"
                onClick={() => signIn("google")}
            >
                Sign In <AiOutlineGoogle />
            </Button>
        );
    }

    if (status === "authenticated") {
        return (
            <div className="relative justify-self-end">
                <button
                    className="flex gap-x-2"
                    onClick={() => setIsShowing(!isShowing)}
                >
                    <div className="flex flex-col justify-between text-right">
                        <h1 className="text-sm font-semibold text-slate-800">
                            {session.user.name}
                        </h1>
                        <span className="text-xs font-normal text-slate-600">
                            {session.user.email}
                        </span>
                    </div>
                    <UserAvatar src={session.user.image} />
                </button>
                <PopupWidget
                    isShowing={isShowing}
                    className="w-64 flex flex-col gap-y-2"
                >
                    <Link
                        href={`/profile/${session.user.id}`}
                        className="button ghost w-full text-right"
                    >
                        Profile
                    </Link>
                    <Link
                        href={`/cart`}
                        className="button ghost w-full text-right"
                    >
                        Cart
                    </Link>
                    <Divider type="horizontal" />
                    <Link
                        href={`/manage`}
                        className="button ghost w-full text-right"
                    >
                        Manage
                    </Link>
                    <Divider type="horizontal" />
                    <Button
                        type="default"
                        onClick={() => signOut()}
                        className="text-right"
                    >
                        Sign Out
                    </Button>
                </PopupWidget>
            </div>
        );
    }
};

export default UserButton;
