import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
} from "firebase/firestore";
import { AddIcon } from "../../icon";
import { auth, db } from "../../firebase";
import { useAuth } from "../../context/AuthProvider";
import { useChatStore } from "../../context/ChatProvider";

function Sidebar() {
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayname] = useState("");
    const { user } = useAuth();
    const { rooms, handleSetSelectedRoom } = useChatStore();

    const navigate = useNavigate();

    useEffect(() => {
        const getUserName = async () => {
            try {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                setDisplayname(docSnap.data().displayName);
            } catch (error) {
                console.log(error);
            }
        };

        getUserName();

        return () => {
            getUserName();
        };
    }, [user]);

    const handleSignOut = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            handleSetSelectedRoom(null);
            navigate("/login");
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };

    const handleAddRoom = () => {
        const name = prompt("Enter room name...");
        const description = prompt("Enter description name...");
        if (!name) return;
        try {
            const collectionRef = collection(db, "rooms");
            addDoc(collectionRef, {
                name,
                description,
                createAt: serverTimestamp(),
                members: [user.uid],
            });
            alert(`Phòng '${name}' đã được tạo thành công!`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="sidebar">
            <div className="header">
                <div className="header-info">
                    <img
                        src="https://i.ytimg.com/vi/378sS2Lx-Q8/mqdefault.jpg"
                        alt=""
                    />
                    <span className="username">{displayName}</span>
                </div>
                <button
                    className="btn logout-btn"
                    onClick={handleSignOut}
                    disabled={loading}
                >
                    Sign out
                </button>
            </div>
            <div className="coppy-text">
                Mã mời: <span>{user.uid}</span>
            </div>
            <div className="sidebar-main">
                <div className="sidebar-top">
                    <h3>Room list</h3>
                    <button
                        className="btn add-room-btn"
                        onClick={handleAddRoom}
                    >
                        <AddIcon size={16} /> Add room
                    </button>
                </div>
                <ul className="room-list">
                    {rooms ? (
                        rooms.map((room) => (
                            <li
                                key={room.id}
                                className="room-item"
                                onClick={() => handleSetSelectedRoom(room)}
                            >
                                {room.name}
                            </li>
                        ))
                    ) : (
                        <></>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
