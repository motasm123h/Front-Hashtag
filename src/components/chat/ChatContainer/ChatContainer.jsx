import './ChatContainer.scss'
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatInput from './../ChatInput/ChatInput';
import { useDispatch, useSelector } from 'react-redux';
import chatReducer from './../../../reducers/chatReducer';
import { FetchMessages, sendMessages } from '../../../actions/ChatAction';

export default function ChatContainer(props) {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chatReducer.messages);
    const { user } = useSelector((state) => state.authReducer.authData)
    const scrollRef = useRef();

    const [arrivalMessage, setArrivalMessage] = useState(null);
    
    useEffect(() => {
        dispatch(FetchMessages(props.currentChat.id))
    }, [props.currentChat])

    const handleSendMes = async (msg) => {
        if (props.currentChat.id === undefined) {
            return;
        }
        else {
            dispatch(sendMessages(props.currentChat.id, msg))
        }
    }


    const TheListOfTheMessage = messages.map((mes, index) => {
        return (

            <div ref={scrollRef} key={index}>
                <div className={`message ${mes.sender_id === props.currentUser.id ? "send" : "receive"}`}>
                    <div className="content">
                        <p>{mes.message}</p>
                    </div>
                </div>
            </div>

        )
    })

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <div className="conta">
            <div className="chat-header">
                <div className="user-details">
                    <img
                        src={`http://localhost:8000/user/${props.currentChat.profile_image}`}
                        alt="" />
                    <h3>{props.currentChat.name}</h3>
                </div>
            </div>
            <div className="chat-messages">
                {TheListOfTheMessage}
            </div>
            <ChatInput
                handleSendMes={handleSendMes}
            />
        </div>
    )
}