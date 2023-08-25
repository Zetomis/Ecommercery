import { Comment, User } from "@prisma/client";
import Link from "next/link";
import UserAvatar from "../user/UserAvatar";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const CommentCard = ({
    comment,
    author,
}: {
    comment: Comment;
    author: User;
}) => {
    return (
        <div className="border border-slate-400 rounded px-4 py-2">
            <Link
                href={`/profile/${comment.authorId}`}
                className="flex items-center gap-x-2 mb-4"
            >
                <UserAvatar src={author.image} />
                <h1 className="font-semibold text-slate-600 text-lg">
                    {author.name}
                </h1>
            </Link>
            <ReactMarkdown className="prose">{comment.content}</ReactMarkdown>
        </div>
    );
};

export default CommentCard;
