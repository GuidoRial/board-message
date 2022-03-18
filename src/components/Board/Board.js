import React, { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import "./Board.css";
import { signOut } from "firebase/auth";
import { authService } from "../../firebase";
import { useNavigate } from "react-router-dom";
import MainChats from "./MainChats/MainChats";
import SendMessageForm from "./SendMessageForm/SendMessageForm";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

function Board({ user, activeUser }) {
    const [newMessage, setNewMessage] = useState("");
    const [myChats, setMyChats] = useState([]); //Get me an array of chats where I'm involved
    const [recommendedUsers, setRecommendedUsers] = useState([]); //Get me a list of 10 people I haven't messaged
    const [selectedChat, setSelectedChat] = useState({}); //On click, set this user as selectedChat and load this conversation, if there isn't any open an empty chat
    const [openBurger, setOpenBurger] = useState(false); //On hamburguer click, toggle and show an aside where I can update this user's info or logout
    /*
{
"participants": [{userOne.userId}, {userTwo.userId}, {userThree.userId}] // If activeUser.userId === anyofthose.userId then get chats
"messages": [{msg}, {msg}, {msg}, {msg}, {msg}, ]
}

msg = {
    sender: {user.userId} //Show this with one class
    receiver: {user.userId} // And this with the other
    date: Date.now() //Use this to sort array chronologically so that messages display correctly 
    content: "" //strings for now, but we could upload images maybe
    readBy: [userId, userId]
    read: false // if readBy.length === participants.length then read = true
    liked: [] // If I double click the message then a heart shows up and my id goes into the liked array
}

*/

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <div className="board-container">
            <section className="board">
                <Sidebar />
                <main className="individual-chat">
                    <Header activeUser={activeUser} />
                    <MainChats />
                    <SendMessageForm />
                </main>
            </section>
        </div>
    );
}

export default Board;
