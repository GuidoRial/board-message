import React, { useState } from "react";
import './Sidebar.css'
import Chat from "../Chat/Chat";
import ConfigurationDataUser from "./ConfigurationDataUser/ConfigurationDataUser";

function Sidebar({ user, activeUser, myChats, setSelectedChat, selectedChat }) {
    const [openBurger, setOpenBurger] = useState(false); //On hamburger click, toggle and show an aside where I can update this user's info or logout
    return (
        <aside className="history">
            <header className="search-container">
                <i
                    className="fas fa-bars"
                    onClick={() => setOpenBurger(!openBurger)}
                ></i>
                <input
                    className="search-bar"
                    type="search"
                    placeholder="Search"
                />
            </header>
            {openBurger ? (
                <ConfigurationDataUser activeUser={activeUser} />
            ) : (
                <div className="chats-container">
                    {myChats.map((chat) => (
                        <Chat
                            activeUser={activeUser}
                            key={chat.docId}
                            chat={chat}
                            setSelectedChat={setSelectedChat}
                            selectedChat={selectedChat}
                        />
                    ))}
                </div>
            )}

        </aside>
    );
}

export default Sidebar;
