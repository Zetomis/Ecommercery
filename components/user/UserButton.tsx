"use client";

import { signIn, useSession } from "next-auth/react";
import Button from "../previews/Button";
import { AiOutlineGoogle } from "react-icons/ai";

const UserButton = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return null;
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
        return <div className="justify-self-end">{session.user.name}</div>;
    }
};

export default UserButton;
