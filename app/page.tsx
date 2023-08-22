import Link from "next/link";

const RootPage = () => {
    return (
        <div>
            <Hero />
            {/* Feature All Products (kinda best seller) */}
            {/* Feature Men products */}
            {/* Feature Women products */}
            {/* Feature Kids products */}
        </div>
    );
};

const Hero = () => {
    return (
        <div className="text-center grid justify-center">
            <h1 className="font-extrabold text-4xl mb-6">
                Best Fashion Collection
            </h1>
            <p className="font-medium text-slate-600 w-full max-w-screen-sm mx-auto mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio molestias amet dignissimos, facilis iusto, pariatur
                ea, cum quisquam maxime officia adipisci commodi. Suscipit
                magnam ipsa repellat soluta non a exercitationem.
            </p>
            <Link href={"/products"} className="button default w-fit mx-auto">
                Explore Shop Collection
            </Link>
        </div>
    );
};

export default RootPage;
