import React, { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import "./Board.css";
import { signOut } from "firebase/auth";
import { authService } from "../../firebase";
import { useNavigate } from "react-router-dom";
import MainChats from "./MainChats/MainChats";
import SendMessageForm from "./SendMessageForm/SendMessageForm";



    

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

    const handleLogOut = async () => {
        try {
            signOut(authService);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    const handleSendMessage = async (e) => {
        try {
            e.preventDefault();
            //take newMessage and add it to this user's chat as {msg}
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
                            {activeUser.profilePicture ? (
                                <img
                                    src={activeUser.profilePicture}
                                    alt="user-profile"
                                />
                            ) : (
                                <div className="profile-picture header-profile-picture">
                                    test
                                </div>
                            )}

                            <div>
                                <p className="username">
                                    user I'm talking with
                                </p>
                                <p>user's about</p>
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
