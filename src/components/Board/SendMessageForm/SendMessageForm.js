import React, { useState } from "react";
import './SendMessageForm.css'

const SendMessageForm = () => {

    const [newMess, setNewMess]=useState('')
    return (
        <form className="send-message-form">
            <textarea
                autoComplete="on"
                placeholder="Message"
                className="message-input"
                onChange={(e)=>{setNewMess(e.target.value)}}>
            </textarea>
            <button
                type="submit"
                id="sendMessage">SEND
            </button>
        </form>
    )
}

export default SendMessageForm