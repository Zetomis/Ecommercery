import Image from "next/image";

const UserAvatar = ({ src }: { src: string }) => {
    return (
        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-600">
            <Image src={src} alt="" width={32} height={32} />
        </div>
    );
};

export default UserAvatar;
