import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../firebase";
import Chat from "../Chat/Chat";

function Sidebar() {
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
            signOut(authService);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <aside className="history">
            <header className="search-container">
                <i className="fas fa-bars"></i>
                <input
                    className="search-bar"
                    type="search"
                    placeholder="Search"
                />
                <button onClick={handleLogOut}>L</button>
            </header>
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
