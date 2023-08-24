import './ChatContact.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import users from "../../../assets/user.png";

import HashTags from '../../../assets/animation/message.gif';
export default function ChatContact(props) {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [currentChatSelected, setCurrentChatSelected] = useState(undefined);


    const changeCurrentChat = (index, contact) => {
        setCurrentChatSelected(index);
        props.changeContacts(contact);
    }

    return (
        <>
            {user &&
                <div className="cont">
                    <div className="logo">
                        {/* <h4>social media</h4> */}
                        <img src={HashTags} alt="" />
                    </div>
                    <div className="contacts">
                        {
                            props.contacts.map((contact, index) => {
                                return (
                                    <div
                                        onClick={() => changeCurrentChat(index, contact)}
                                        key={index}
                                        className={`contact ${index === currentChatSelected ? "selected" : ""}`}>
                                        <div className="userImage">
                                            {
                                                contact.profile_image ?
                                                    <img src={`http://localhost:8000/user/${contact.profile_image}`}
                                                        alt="" /> :
                                                    <img src={users} />
                                            }
                                        </div>
                                        <div className="userName">
                                            {contact.name}
                                        </div>

                                    </div>
                                );
                            })}

                    </div>
                    {/* <hr className="H"/> */}
                    {/* <div className="current">
                        <img src={`http://localhost:8000/user/${user.profile_image}`}
                            alt="" />
                        <h3>{user.name}</h3>
                    </div> */}

                </div>
            }
        </>
    )
}