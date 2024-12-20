import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import MessageInput from "../components/MessageInput";
import userAtom from "../atoms/userAtom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from "axios";
import selectedUserAtom from "../atoms/selectedUserAtom";

function ChatPage() {
    const currentUser = useRecoilValue(userAtom);
    // const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [allConversations, setAllConversations] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const selectedUser = useRecoilValue(selectedUserAtom)
    // const [selectedUserId, setSelectedUserId] = useState(selectedUser._id)

    useEffect(() => {

        async function fetchAllConversations() {
            try {
                const res = await axios.get("/api/messages/conversations");

                setAllConversations(res?.data)
                console.log(res?.data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchAllConversations()
    }, [selectedUser, setAllConversations])


    useEffect(() => {
        async function fetchAllUsers() {
            try {
                const res = await axios.get("/api/users/all");

                // Filter out users who are already part of an existing conversation
                const filteredUsers = res.data.filter((user) => {
                    return !allConversations.some((conversation) =>
                        conversation.participants.some((participant) => participant._id === user._id)
                    );
                });

                // Exclude the current user from the list
                setAllUsers(() => filteredUsers.filter((user) => user._id !== currentUser._id));
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllUsers();
    }, [allConversations, currentUser._id, selectedUser]);

    useEffect(() => {

        async function fetchAllMessages() {
            try {
                console.log(selectedUser)

                const res = await fetch(`/api/messages/${selectedUser?._id}`);
                const data = await res.json();

                setAllMessages(data)
                console.log(data)

            } catch (error) {
                setAllMessages([])
                console.log(error)
            }
        }

        fetchAllMessages()
    }, [selectedUser])


    return (
        <div className="flex h-screen">
            <Sidebar conversations={allConversations} allUsers={allUsers} setConversations={setAllConversations} />
            <div className="flex flex-col flex-1">
                <ChatHeader username={selectedUser?.username} />
                <ChatMessages messages={allMessages} currentUser={currentUser?._id} setAllMessages={setAllMessages} />
                <MessageInput setAllMessages={setAllMessages} setConversations={setAllConversations} />
            </div>
        </div>
    );
}

export default ChatPage