import "./Chat.scss";
import Welcome from "../../components/chat/Welcome/Welcome";
import ChatContact from "../../components/chat/ChatContact/ChatContact";
import ChatContainer from "../../components/chat/ChatContainer/ChatContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { FetchContacts } from "../../actions/ChatAction";
import { Link } from "react-router-dom";
import users from "../../assets/user.png";


export default function Chat() {
    const dispatch = useDispatch();
    const [contacts, setContacts] = useState(useSelector((state) => state.chatReducer.contacts));
    const [currentChat, setCurrentChat] = useState(undefined);
    const { user } = useSelector((state) => state.authReducer.authData)

    const handleChangeContacts = (chat) => {
        setCurrentChat(chat);
    }

    useEffect(() => {

        dispatch(FetchContacts())

    }, [user])


    return (
        <div className="outer">
            <Link to="/" ><h1>Back to Home</h1></Link>
            <div className="container">
                <ChatContact
                    contacts={contacts}
                    changeContacts={handleChangeContacts}
                />

                {
                    currentChat === undefined ?
                        (<Welcome />) :
                        (
                            <ChatContainer
                                currentChat={currentChat}
                                currentUser={user}
                            />
                        )
                }
            </div>
        </div>
    )
}