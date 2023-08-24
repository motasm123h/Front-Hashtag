import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import './ChatInput.scss';

function ChatInput({ handleSendMes }) {
    const [mes, setMes] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    function handleEmojiClick(emojiObject) {
        setSelectedEmoji(emojiObject);
        setMes(mes + emojiObject.emoji);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if (mes.length > 0) {
            handleSendMes(mes);
            setMes('');
        }
    };

    return (
        <div className="contai">
            <div className="button-container">
                <div className="emoji">
                    <EmojiEmotionsIcon onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form onSubmit={(e) => sendChat(e)}>
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMes(e.target.value)}
                    value={mes}
                />
                {/* <EmojiEmotionsIcon onClick={handleEmojiPickerHideShow} />
                {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />} */}
                <button type="submit">
                    <SendIcon />
                </button>
            </form>
        </div>
    );
}

export default ChatInput;