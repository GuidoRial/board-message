import React from 'react'
import ReceivedMessage from '../ReceivedMessage/ReceivedMessage'
import SentMessage from '../SentMessage/SentMessage'
import './MainChats.css'

const MainChats = () => {
  return (
    <div className="messages-container">
        <ReceivedMessage/>
        <SentMessage/>
    </div>
  )
}

export default MainChats