import React, { useEffect, useState } from "react";
import "./Board.css";
import { useNavigate } from "react-router-dom";
import MainChats from "./MainChats/MainChats";
import SendMessageForm from "./SendMessageForm/SendMessageForm";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { getDocumentWithDocId, getMyChats } from "../../auxFunctions";

function Board({ user, activeUser }) {
    const [myChats, setMyChats] = useState([]); //Get me an array of chats where I'm involved
    const [recommendedUsers, setRecommendedUsers] = useState([]); //Get me a list of 10 people I haven't messaged
    const [selectedChat, setSelectedChat] = useState(""); //On click, set this user as selectedChat and load this conversation, if there isn't any open an empty chat
    const [renderedChat, setRenderedChat] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadChats = async () => {
            const response = await getMyChats(activeUser.userId);
            setMyChats(response);
        };

        if (activeUser) loadChats();
    }, [activeUser]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        const getChatToRender = async () => {
            const [thisChat] = await getDocumentWithDocId(selectedChat);
            setRenderedChat(thisChat);
        };
        getChatToRender();
    }, [selectedChat]);

    console.log(renderedChat);

    return (
        <div className="board-container">
            <section className="board">
                <Sidebar
                    user={user}
                    activeUser={activeUser}
                    myChats={myChats}
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                />
                <main className="individual-chat">
                    <Header
                        activeUser={activeUser}
                        selectedChat={selectedChat}
                    />
                    <MainChats selectedChat={selectedChat} />
                    <SendMessageForm activeUser={activeUser} />
                </main>
            </section>
        </div>
    );
}

export default Board;
