
import React from "react";

import Chat from "../Chat/Chat";
import ConfigurationDataUser from "./ConfigurationDataUser/ConfigurationDataUser";

function Sidebar() {
    
    return (
        <aside className="history">
            <header className="search-container">
                <i className="fas fa-bars"></i>
                <input
                    className="search-bar"
                    type="search"
                    placeholder="Search"
                />
                
            </header>
            <ConfigurationDataUser/>
            <div className="chats-container">
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
            </div>
        </aside>
    );
}

export default Sidebar;
