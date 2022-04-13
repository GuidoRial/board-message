import React, { useState } from "react";
import Chat from "../Chat/Chat";
import ConfigurationDataUser from "./ConfigurationDataUser/ConfigurationDataUser";

function Sidebar({ user, activeUser, myChats, setSelectedChat }) {
    const [configUserMenu, setConfigUserMenu] = useState(false);


    return (
        <aside className="history">
            <header className="search-container">
                <i
                    className="fas fa-bars"
                    onClick={() => setConfigUserMenu(!configUserMenu)}
                ></i>
                <input
                    className="search-bar"
                    type="search"
                    placeholder="Search"
                />
            </header>
            {configUserMenu ? (
                <ConfigurationDataUser activeUser={activeUser} />
            ) : (
                <div className="chats-container">
                    {myChats.map((chat) => (
                        <Chat
                            key={chat.docId}
                            chat={chat}
                            setSelectedChat={setSelectedChat}
                        />
                    ))}
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
