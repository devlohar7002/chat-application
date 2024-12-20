import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import axios from "axios";

const ChatHeader = ({ username }) => {
    const setUser = useSetRecoilState(userAtom);

    const handleLogout = async () => {
        try {

            await axios.post("/api/users/logout");


            localStorage.removeItem("user");


            setUser(null);


            window.location.href = "/signin";
        } catch (error) {
            console.error("Error logging out:", error);
            alert("Failed to logout. Please try again.");
        }
    };

    return (
        <div className="flex justify-between items-center p-4 border-b bg-zinc-50 border-[f4f4f4]">
            <div className="font-bold text-zinc-600">{username}</div>
            <button
                className="bg-zinc-800 text-white px-4 py-2 text-xs rounded-full hover:bg-zinc-900 shadow-sm"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default ChatHeader;
