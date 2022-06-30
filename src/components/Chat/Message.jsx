import React from "react";
import { useAuth } from "../../context/AuthProvider";

function Message({ data }) {
    const { user } = useAuth();
    return (
        <div
            className={`message-item ${
                user.uid === data.uid ? "active" : null
            }`}
        >
            <div className="message-info">
                <span className="avatar">
                    <img
                        src="https://i.ytimg.com/vi/378sS2Lx-Q8/mqdefault.jpg"
                        alt=""
                    />
                </span>
                <span className="author">{data.name}</span>
                <span className="date">Today at 5:33 PM</span>
            </div>
            <div className="message-text">{data.content}</div>
        </div>
    );
}

export default Message;
