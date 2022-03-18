import React, { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import "./Board.css";
import { signOut } from "firebase/auth";
import { authService } from "../../firebase";
import { useNavigate } from "react-router-dom";
import MainChats from "./MainChats/MainChats";
import SendMessageForm from "./SendMessageForm/SendMessageForm";

function Board() {
    
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
        <div className="board-container">
            <section className="board">
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
                        <Chat /> <Chat />
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
                <main className="individual-chat">
                    <header className="individual-chat-header">
                        <div className="selected-user">
                            <div className="profile-picture header-profile-picture">
                                U
                            </div>
                            <div>
                                <p className="username">username</p>
                                <p>Developed by GuidoRial and FedeSca001</p>
                            </div>
                        </div>
                    </header>
                    <MainChats />
                    <SendMessageForm/>
                </main>
            </section>
        </div>
    );
}

export default Board;
