import React, { useEffect, useState } from "react";
import "./Board.css";
import { useNavigate } from "react-router-dom";
import MainChats from "./MainChats/MainChats";
import SendMessageForm from "./SendMessageForm/SendMessageForm";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { firestore } from "../../firebase";

function Board({ user, activeUser }) {
    const [messagesFromDatabase, setMessagesFromDatabase ] = useState([])
    const [msgUser, setMsgUser] = useState('')
    const [newMessage, setNewMessage] = useState("");
    const [myChats, setMyChats] = useState([]); //Get me an array of chats where I'm involved
    const [recommendedUsers, setRecommendedUsers] = useState([]); //Get me a list of 10 people I haven't messaged
    const [selectedChat, setSelectedChat] = useState({}); //On click, set this user as selectedChat and load this conversation, if there isn't any open an empty chat
    const [openBurger, setOpenBurger] = useState(false); //On hamburguer click, toggle and show an aside where I can update this user's info or logout
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <section className="board">
            <Sidebar user={user} activeUser={activeUser} className="sidebar"/>
            <main className="individual-chat">
                <Header activeUser={activeUser}/>
                <MainChats/>
                <SendMessageForm activeUser={activeUser}/>
            </main>
        </section>
    );
}

export default Board;
