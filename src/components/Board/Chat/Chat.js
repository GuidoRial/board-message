import { connectAuthEmulator } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
    getFirstLetterOfUsername,
    getUserByUserId,
} from "../../../auxFunctions";
import { firestore } from "../../../firebase";

import "./Chat.css";
function Chat({ chat, setSelectedChat, selectedChat, activeUser }) {
    const [otherUser, setOtherUser] = useState({});
    const [profilePicture, setProfilePicture] = useState("");
    const [userName, setUserName] = useState("");
    const [firstLetterOfUsername, setFirstLetterOfUsername] = useState("");
    useEffect(() => {
        const loadChatData = async () => {
            if (chat.participants.length === 1) {
                setUserName(activeUser.username);
                setProfilePicture(activeUser.profilePicture);
                const firstLetter = getFirstLetterOfUsername(
                    activeUser.username
                );
                setFirstLetterOfUsername(firstLetter);
            }
            if (chat.participants.length === 2) {
                const [otherUserId] = chat.participants.filter(
                    (id) => id !== activeUser.userId
                );
                const [receiver] = await getUserByUserId(otherUserId);
                setUserName(receiver.username);
                setProfilePicture(receiver.profilePicture);
                const firstLetter = getFirstLetterOfUsername(receiver.username);
                setFirstLetterOfUsername(firstLetter);
            }
        };
        loadChatData();
    }, []);

    /* 
    render:
     if chat.participants.length <= 2
        username: otherUser.username
        userProfilePic: otherUser.profilePic
        
        else
        chat.profilePicture
        chat.name
    */
    return (
        <div className="chat" onClick={() => setSelectedChat(chat.docId)}>
            {profilePicture ? (
                <img
                    className="profile-picture history-profile-picture"
                    src={profilePicture}
                    alt={userName}
                />
            ) : (
                <div className="profile-picture history-profile-picture">
                    {firstLetterOfUsername}
                </div>
            )}

            <p className="username">{userName ? userName : "Loading..."}</p>
        </div>
    );
}

export default Chat;
