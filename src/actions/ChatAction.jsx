import * as ChatReuqest from '../api/ChatRequest';

export const FetchContacts = () => async (dispatch) => {
    dispatch({ type: "FETCH_CONTACTS_START" })
    try {
        const { data } = await ChatReuqest.FetchContacts();
        // setContacts(data.data.recentMessages);
        dispatch({ type: "FETCH_CONTACTS_SUCCESS", data: data.recentMessages });
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "FETCH_CONTACTS_FAIL" })
    }
}


export const FetchMessages = (id) => async (dispatch) => {
    dispatch({ type: "FETCH_MESSAGES_START" })
    try {
        const { data } = await ChatReuqest.FetchMessage(id)
        // const response = await axios.get(`api/getMessages/${props.currentChat.id}`);
        // setMessages(response.data.message);
        dispatch({ type: "FETCH_MESSAGES_SUCCESS", data: data.message })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "FETCH_MESSAGES_FAIL" })
    }
}

export const sendMessages = (id, msg) => async (dispatch) => {
    dispatch({ type: "SEND_MESSAGES_START" })
    try {
        const { data } = await ChatReuqest.sendMessage(id, msg)
        dispatch({ type: "SEND_MESSAGES_SUCCESS", data: data.message })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "SEND_MESSAGES_FAIL" })
    }
}