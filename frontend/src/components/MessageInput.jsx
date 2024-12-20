import React, { useState } from "react";
import selectedUserAtom from "../atoms/selectedUserAtom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";
import messageSound from "../assets/sounds/message.mp3";

const MessageInput = ({ setAllMessages, setConversations }) => {
    const [message, setMessage] = useState("");
    const selectedUser = useRecoilValue(selectedUserAtom)
    console.log("Selected user in Message Input:", selectedUser)
    const recipientId = selectedUser?._id
    const { socket } = useSocket()

    const sendMessage = async () => {
        if (message.trim()) {
            try {
                const res = await axios.post("/api/messages/sendMessage", {
                    recipientId,
                    message,
                });

                // Clear the input field
                setMessage("");
                setAllMessages((prev) => Array.isArray(prev) ? [...prev, res.data] : [res.data]);

                const receivedMessage = res.data

                setConversations((prev) => {
                    const updatedConversations = prev.map((conversation) => {
                        console.log('hdkfhkhdkasdkj')
                        if (conversation._id === receivedMessage.conversationId) {
                            return {
                                ...conversation,
                                lastMessage: {
                                    text: receivedMessage.text,
                                    sender: receivedMessage.sender,
                                },
                            };
                        }
                        return conversation;
                    });
                    return updatedConversations;
                });


            } catch (error) {
                console.error("Error sending message:", error);
                alert("Failed to send message. Please try again.");
            }

        }
    };

    useEffect(() => {
        try {
            socket.on("newMessage", (message) => {
                console.log(selectedUser._id, message.sender)
                if (selectedUser._id === message.sender) {
                    setAllMessages((prev) => Array.isArray(prev) ? [...prev, message] : [message]);
                }

                if (!document.hasFocus()) {
                    const sound = new Audio(messageSound);
                    sound.play();
                }


                setConversations((prev) => {
                    const updatedConversations = prev.map((conversation) => {
                        console.log('hdkfhkhdkasdkj')
                        if (conversation._id === message.conversationId) {
                            return {
                                ...conversation,
                                lastMessage: {
                                    text: message.text,
                                    sender: message.sender,
                                },
                            };
                        }
                        return conversation;
                    });
                    return updatedConversations;
                });

            });

            return () => socket.off("newMessage");
        } catch (error) {

        }
    }, [socket, selectedUser, setConversations]);

    return (
        selectedUser && (
            <div className="p-4 border-t-[1px] bg-zinc-50 flex">
                <input
                    type="text"
                    className="flex-1 py-2 px-4 rounded-full bg-[#e9e9e9] opacity-90 mr-2 text-zinc-900 text-sm placeholder:text-zinc-400 placeholder:text-xs focus:outline-none"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button
                    className="bg-zinc-800 text-white px-4 py-2 text-xs rounded-full hover:bg-zinc-900 shadow-lg"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        )
    );
};

export default MessageInput;
