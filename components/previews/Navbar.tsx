import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

const Navbar = () => {
    return (
        <div className="fixed top-0 inset-x-0 bg-white py-3 shadow-lg">
            <Container className="grid grid-cols-3 items-center">
                <Logo />
                <div className="flex justify-between font-semibold text-slate-800">
                    <Link href={"/products"}>All Products</Link>
                    <Link href={"/products?category=men"}>Men</Link>
                    <Link href={"/products?category=women"}>Women</Link>
                    <Link href={"/products?category=kids"}>Kids</Link>
                </div>
                <Link
                    href={"/sign-in"}
                    className="button default w-fit justify-self-end"
                >
                    Sign In
                </Link>
            </Container>
        </div>
    );
};

export default Navbar;
