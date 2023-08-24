const chatReducer = (state = { contacts: [], messages: [], loading: false, error: false }, action) => {
    switch (action.type) {
        case 'FETCH_CONTACTS_START':
            return { ...state, loading: true, error: false }
        case 'FETCH_CONTACTS_SUCCESS':
            return { ...state, contacts: action.data, loading: false, error: false }
        case 'FETCH_CONTACTS_FAIL':
            return { ...state, loading: false, error: true }


        case 'FETCH_MESSAGES_START':
            return { ...state, loading: true, error: false }
        case 'FETCH_MESSAGES_SUCCESS':
            return { ...state, messages: action.data , loading: false, error: false }
        case 'FETCH_MESSAGES_FAIL':
            return { ...state, loading: false, error: true }



        case 'SEND_MESSAGES_START':
            return { ...state, loading: true, error: false }
        case 'SEND_MESSAGES_SUCCESS':
            return { ...state, messages: [...state.messages, action.data], loading: false, error: false }
        case 'SEND_MESSAGES_FAIL':
            return { ...state, loading: false, error: true }

        default:
            return state
    }
}

export default chatReducer