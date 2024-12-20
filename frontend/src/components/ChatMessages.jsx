import React, { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { format, isToday, isYesterday, isThisWeek, isThisYear, formatDistanceToNow } from "date-fns";
import selectedUserAtom from "../atoms/selectedUserAtom";

const ChatMessages = ({ messages, currentUser }) => {
    const selectedUser = useRecoilValue(selectedUserAtom);
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatMessageTime = (createdAt) => {
        const messageDate = new Date(createdAt);

        if (isToday(messageDate)) {
            return format(messageDate, "p");
        } else if (isYesterday(messageDate)) {
            return "Yesterday";
        } else if (isThisWeek(messageDate)) {
            return format(messageDate, "EEEE");
        } else if (isThisYear(messageDate)) {
            return format(messageDate, "MMM d");
        } else {
            return formatDistanceToNow(messageDate, { addSuffix: true });
        }
    };

    return (
        <>
            <div className="flex-1 p-4 overflow-y-auto bg-zinc-50">
                {messages && messages.length > 0 && messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === currentUser ? "justify-end" : "justify-start"
                            } mb-4`}
                        ref={messages.length - 1 === index ? messageEndRef : null}
                    >
                        <div
                            className={`p-3 max-w-[60%] rounded-lg ${msg.sender === currentUser
                                ? "bg-blue-100 text-zinc-600"
                                : "bg-zinc-100 text-zinc-700"
                                }`}
                        >
                            <div className="text-sm">{msg.text}</div>
                            <div className={`text-[10px] mt-1 ${msg.sender === currentUser
                                ? "text-zinc-500"
                                : "text-zinc-400"
                                }`}
                            >
                                {formatMessageTime(msg.createdAt)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ChatMessages;
