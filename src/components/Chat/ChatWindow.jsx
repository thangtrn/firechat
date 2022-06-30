import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useChatStore } from "../../context/ChatProvider";
import { db } from "../../firebase";
import { UserAddIcon } from "../../icon";
import ChatBroad from "./ChatBroad";

function ChatWindow() {
    const { selectedRoom } = useChatStore();

    const handleInvite = async () => {
        const uidValue = prompt("Enter the invitation code (uid code)");
        console.log(selectedRoom.id);
        if (!selectedRoom?.id || !uidValue.trim()) return;
        try {
            const docRef = doc(db, "rooms", selectedRoom.id);
            const payload = {
                members: arrayUnion(uidValue),
            };
            updateDoc(docRef, payload);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {selectedRoom ? (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="room-info">
                            <strong>{selectedRoom.name}</strong>
                            <p className="description">
                                {selectedRoom.description}
                            </p>
                        </div>
                        <div className="actions">
                            <button
                                className="btn add-user"
                                onClick={handleInvite}
                            >
                                <UserAddIcon size={16} /> <span>invite</span>
                            </button>
                            <div className="member">
                                Member: {selectedRoom.members.length}
                            </div>
                        </div>
                    </div>
                    <ChatBroad />
                </div>
            ) : (
                <div className="unChat">
                    <h2>Hay chọn phòng</h2>
                </div>
            )}
        </>
    );
}

export default ChatWindow;
