import React from "react";
import { formatRelative } from "date-fns/esm";
import { useAuth } from "../../context/AuthProvider";

function Message({ data }) {
    const { user } = useAuth();

    function formatDate(seconds) {
        let formattedDate = "";

        if (seconds) {
            formattedDate = formatRelative(
                new Date(seconds * 1000),
                new Date()
            );

            formattedDate =
                formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }

        return formattedDate;
    }

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
                <span className="date">
                    {formatDate(data?.createAt?.seconds)}
                </span>
            </div>
            <div className="message-text">{data.content}</div>
        </div>
    );
}

export default Message;
