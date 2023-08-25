"use client";

import { FormEvent, useState } from "react";
import Button from "./Button";
import { createComment } from "@/libs/actions/comment.actions";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Comment, Product } from "@prisma/client";

const CreateComment = ({
    productId,
    authorId,
    refetch,
}: {
    productId: string;
    authorId: string;
    refetch: () => void;
}) => {
    const [content, setContent] = useState("");
    const createCommentMutation = useMutation({
        mutationKey: ["comment", { productId: productId }],
        mutationFn: () => {
            const comment = createComment(content, productId, authorId);
            setContent("");
            return comment;
        },
        onSuccess: () => {
            refetch();
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createCommentMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-y-2">
            <form
                className="flex items-center gap-x-2"
                onSubmit={(event) => handleSubmit(event)}
            >
                <input
                    type="text"
                    className="input flex-1"
                    placeholder="Enter comment..."
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                />
                <Button isLoading={createCommentMutation.isLoading}>
                    Comment
                </Button>
            </form>
        </div>
    );
};

export default CreateComment;
