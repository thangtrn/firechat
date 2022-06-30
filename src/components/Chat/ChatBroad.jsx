import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useChatStore } from "../../context/ChatProvider";
import { db } from "../../firebase";
import Message from "./Message";

function ChatBroad() {
    const [message, setMessage] = useState("");
    const [MessageData, setMessageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { selectedRoom } = useChatStore();
    const { user } = useAuth();

    useEffect(() => {
        let unsub = () => {};
        if (selectedRoom?.id) {
            const collectionRef = collection(db, "messages");
            const q = query(
                collectionRef,
                where("roomId", "==", selectedRoom.id),
                orderBy("createAt", "asc")
            );
            unsub = onSnapshot(
                q,
                async (snapshot) => {
                    const data = await snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setMessageData(data);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        return unsub;
    }, [selectedRoom.id]);

    const handleSendMessage = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!message.trim()) {
            setLoading(false);
            return;
        }
        try {
            const collectionRef = collection(db, "messages");
            const docRef = doc(db, "users", user.uid);
            const result = await getDoc(docRef);

            await addDoc(collectionRef, {
                name: result.data().displayName,
                content: message,
                roomId: selectedRoom.id,
                uid: user.uid,
                createAt: serverTimestamp(),
            });
            setMessage("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <div className="chat-broad">
            <div className="message-list">
                {MessageData.map((item) => (
                    <Message key={item.id} data={item} />
                ))}
            </div>
            <form className="message-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Enter message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className={`${loading ? "disabled" : null}`}
                    disabled={loading}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatBroad;
