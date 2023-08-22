import Link from "next/link";

const Logo = () => {
    return (
        <Link
            href={"/"}
            className="font-bold text-2xl hover:underline underline-offset-1"
        >
            Ecommercery
        </Link>
    );
};

export default Logo;
