import React, { useEffect, useState } from "react";
import "./Chat.css";
function Chat({ chat, setSelectedChat }) {
    const [otherUser, setOtherUser] = useState({});
    useEffect(() => {
        /* 
        if chat.participants.length <= 2
            getOtherUser()
        

        */
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
            <div className="profile-picture history-profile-picture">U</div>
            <p className="username">username</p>
        </div>
    );
}

export default Chat;
