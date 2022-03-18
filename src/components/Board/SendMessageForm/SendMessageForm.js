import React, { useState } from "react";
import "./SendMessageForm.css";

const SendMessageForm = () => {
    const handleSendMessage = async (e) => {
        try {
            e.preventDefault();
            //take newMessage and add it to this user's chat as {msg}
        } catch (error) {
            console.error(error);
        }
    };

    const [newMessege, setNewMessege] = useState("");
    return (
        <form onSubmit={handleSendMessage} className="send-message-form">
            <textarea
                autoComplete="on"
                placeholder="Message"
                className="message-input"
                onChange={(e) => {
                    setNewMessege(e.target.value);
                }}
            ></textarea>
            <button type="submit" id="sendMessage">
                SEND
            </button>
        </form>
    );
};

export default SendMessageForm;
