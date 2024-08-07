"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ListCard = ({ list, handleEdit, handleDelete }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const [copied, setCopied] = useState("");

    const handleCopy = (text) => {
        setCopied(text);
        navigator.clipboard.writeText(text);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleEditClick = () => {
        if (handleEdit) handleEdit(list);
    };

    const handleDeleteClick = () => {
        if (handleDelete) handleDelete(list._id);
    };

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">{list.name}</h3>
                        <p className="font-inter text-sm text-gray-500">
                            Created on: {new Date(list.creationDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="copy_btn" onClick={() => handleCopy(list.name)}>
                    <Image
                        src={copied === list.name ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
                        alt={copied === list.name ? "tick_icon" : "copy_icon"}
                        width={12}
                        height={12}
                    />
                </div>
            </div>

            <ul className="my-4">
                {list.responseCodes.map((code) => (
                    <li key={code.code} className="flex items-center gap-3">
                        <p className="font-satoshi text-sm text-gray-700">{code.code}</p>
                        
                        <div className="copy_btn" onClick={() => handleCopy(code.code)}>
                           
                        </div>
                    </li>
                ))}
            </ul>

            {session?.user.id === list.creator._id && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                    <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEditClick}>
                        Edit
                    </p>
                    <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDeleteClick}>
                        Delete
                    </p>
                </div>
            )}
        </div>
    );
};

export default ListCard;
