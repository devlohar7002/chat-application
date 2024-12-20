import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import selectedUserAtom from "../atoms/selectedUserAtom";
import { useSocket } from "../context/SocketContext";

const Sidebar = ({ conversations, allUsers }) => {
    const user = useRecoilValue(userAtom);
    const selectedUser = useRecoilValue(selectedUserAtom);
    const setSelectedUser = useSetRecoilState(selectedUserAtom);
    const { onlineUsers } = useSocket();

    const isUserOnline = (userId) => onlineUsers.includes(userId);

    const sortedConversations = conversations
        ? [...conversations].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        : [];

    const handleConversationClick = (conversation) => {
        setSelectedUser(conversation.participants[0]);
    };

    return (
        <div className="w-1/4 bg-zinc-100 border-r-[1px] border-[f4f4f4] text-zinc-800">
            <div className="p-4 font-bold text-xl">{'@' + user.username}</div>
            <div className="p-4 font-bold text-md border-b ml-2 mr-2">Current Chats</div>
            {(!sortedConversations || sortedConversations.length === 0) && (
                <div className="p-4 text-sm ml-2 mr-2 text-zinc-400">None</div>
            )}
            <ul>
                {sortedConversations &&
                    sortedConversations.length > 0 &&
                    sortedConversations.map((conversation) => {
                        const participant = conversation.participants[0];
                        const isSelected =
                            selectedUser &&
                            conversation.participants.some(
                                (p) => p._id === selectedUser?._id
                            );

                        return (
                            <li
                                key={conversation._id}
                                onClick={() => handleConversationClick(conversation)}
                                className={`flex justify-between items-center p-4 cursor-pointer hover:bg-blue-100 ${isSelected ? "bg-blue-100" : ""
                                    }`}
                            >
                                <div>
                                    <div className="flex items-center">
                                        <div className="font-semibold text-sm mr-2">
                                            {participant?.username}
                                        </div>
                                        {isUserOnline(participant?._id) && (
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {conversation?.lastMessage?.text}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ul>

            {allUsers && allUsers.length > 0 && (
                <div className="p-4 font-bold text-md border-b ml-2 mr-2">
                    Start new conversation
                </div>
            )}
            <ul>
                {allUsers &&
                    allUsers.map((newUser) => (
                        <li
                            key={newUser._id}
                            onClick={() => setSelectedUser(newUser)}
                            className={`flex justify-between items-center p-4 cursor-pointer hover:bg-blue-100 ${selectedUser?._id === newUser._id ? "bg-blue-100" : ""
                                }`}
                        >
                            <div className="flex items-center">
                                <div className="font-semibold text-sm mr-2">{newUser.username}</div>
                                {isUserOnline(newUser._id) && (
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                )}
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Sidebar;
