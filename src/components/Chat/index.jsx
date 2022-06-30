import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

function Home() {
    return (
        <div className="container">
            <Sidebar />
            <ChatWindow />
        </div>
    );
}

export default Home;
