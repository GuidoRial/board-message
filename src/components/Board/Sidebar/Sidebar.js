
import React, { useState } from "react";
import './Sidebar.css'
import Chat from "../Chat/Chat";
import ConfigurationDataUser from "./ConfigurationDataUser/ConfigurationDataUser";

function Sidebar({user, activeUser}) {
    const [configUserMenu, setConfigUserMenu] = useState(false)
    
    return (
        <aside className="history">
            <header className="search-container">
                <i className="fas fa-bars" onClick={()=>setConfigUserMenu(!configUserMenu)}></i>
                <input
                    className="search-bar"
                    type="search"
                    placeholder="Search"
                />
            </header>
            {configUserMenu ?
            <ConfigurationDataUser activeUser={activeUser}/>
            :
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
            </div>}
        </aside>
    );
}

export default Sidebar;
