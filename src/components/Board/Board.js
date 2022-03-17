import React, { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import "./Board.css";
import ReceivedMessage from "./ReceivedMessage/ReceivedMessage";
import SentMessage from "./SentMessage/SentMessage";
import { signOut } from "firebase/auth";
import { authService } from "../../firebase";
import { useNavigate } from "react-router-dom";


function Board({ user, activeUser }) {

    const [newMess, setNewMess]=useState('')
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
            signOut(authService);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };


    const getFirstLetter = () => {
        let firstLeterOfUsername = activeUser.username[0].toUpperCase();
        return firstLeterOfUsername;
    };



    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

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
                            {activeUser.profilePicture ? (
                                <img
                                    src={activeUser.profilePicture}
                                    alt="user-profile"
                                />
                            ) : (
                                <div className="profile-picture header-profile-picture">
                                    {getFirstLetter()}
                                </div>
                            )}

                            <div>
                                <p className="username">
                                    {activeUser.username}
                                </p>
                                <p>{activeUser.about}</p>
                            </div>
                        </div>
                    </header>
                    <div className="messages-container">
                        <ReceivedMessage />
                        <SentMessage />
                        <ReceivedMessage />
                        <ReceivedMessage />
                        <SentMessage />
                        <ReceivedMessage />
                        <SentMessage />
                        <ReceivedMessage />
                        <ReceivedMessage />
                        <SentMessage />
                        <ReceivedMessage />
                        <SentMessage />
                        <ReceivedMessage />
                        <ReceivedMessage />
                        <SentMessage />
                    </div>
                    <form className="send-message-form">
                        <textarea
                            autoComplete="on"
                            placeholder="Message"
                            className="message-input"
                            onChange={(e)=>{setNewMess(e.target.value)}}>
                        </textarea>
                        <button
                            type="submit"
                            id="sendMessage">SEND</button>
                    </form>
                </main>
            </section>
        </div>
    );
}

export default Board;
