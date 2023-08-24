const friendReducer = (state = { randomfriends: [], onlineFreind: [], friends: [], sendRequest: [], recievedRequest: [], loading: false, error: false, }, action) => {
    switch (action.type) {
        //random friend
        case 'GET_RANDOM_FRIENDS_START':
            return { ...state, loading: true, error: false }
        case 'GET_RANDOM_FRIENDS_SUCCESS':
            return { ...state, randomfriends: action.data, loading: false, error: false }
        case 'GET_RANDOM_FRIENDS_FAIL':
            return { ...state, loading: false, error: true }

        //send friend request
        case 'SEND_FRIENDS_REQUEST_START':
            return { ...state, loading: true, error: false }
        case 'SEND_FRIENDS_REQUEST_SUCCESS':
            const friend = state.randomfriends.filter(friend => friend.id !== action.data)
            return { ...state, randomfriends: friend, loading: false, error: false }
        case 'SEND_FRIENDS_REQUEST_FAIL':
            return { ...state, loading: false, error: true }

        //reject friend request
        case 'REJECT_FRIENDS_REQUEST_START':
            return { ...state, loading: true, error: false }
        case 'REJECT_FRIENDS_REQUEST_SUCCESS':
            const friendAfterEdit = state.recievedRequest.filter(friend => friend.id !== action.data)
            return { ...state, recievedRequest: friendAfterEdit, loading: false, error: false }
        case 'REJECT_FRIENDS_REQUEST_FAIL':
            return { ...state, loading: false, error: true }

        case 'DELETE_SEND_REQUEST_SUCCESS':
            const sendReqsAfterEdit = state.sendRequest.filter(friend => friend.id !== action.data)
            return { ...state, sendRequest: sendReqsAfterEdit, loading: false, error: false }
        case 'DELETE_Friend_SUCCESS':
            const friendsAfterEdit = state.friends.filter(friend => friend.id !== action.data)
            return { ...state, friends: friendsAfterEdit, loading: false, error: false }


        // accept friend request
        // case 'GET_FRIENDS_START':
        //     return { ...state, loading: true, error: false }
        // case 'GET_FRIENDS_SUCCESS':
        //     return { ...state, friends: [], loading: false, error: false }
        // case 'GET_FRIENDS_FAIL':
        //     return { ...state, loading: false, error: true }

        // get all friend request
        case 'GET_FRIENDS_START':
            return { ...state, loading: true, error: false }
        case 'GET_FRIENDS_SUCCESS':
            return { ...state, friends: action.data, loading: false, error: false }
        case 'GET_FRIENDS_FAIL':
            return { ...state, loading: false, error: true }

        //get all reciecved request
        case 'GET_RECIEVED_FRIENDS_REQUEST_START':
            return { ...state, loading: true, error: false }
        case 'GET_RECIEVED_FRIENDS_REQUEST_SUCCESS':
            return { ...state, recievedRequest: action.data, loading: false, error: false }
        case 'GET_RECIEVED_FRIENDS_REQUEST_FAIL':
            return { ...state, loading: false, error: false }


        //get all send reuest
        case 'GET_SEND_FRIENDS_REQUEST_START':
            return { ...state, loading: true, error: false }
        case 'GET_SEND_FRIENDS_REQUEST_SUCCESS':
            return { ...state, sendRequest: action.data, loading: false, error: false }

        case 'GET_SEND_FRIENDS_REQUEST_FAIL':
            return { ...state, loading: false, error: false }

        case 'GET_ONLINE_FRIENDS_START':
            return { ...state, loading: true, error: false }
        case 'GET_ONLINE_FRIENDS_SUCCESS':
            return { ...state, onlineFreind: action.data, loading: false, error: false }

        case 'GET_ONLINE_FRIENDS_FAIL':
            return { ...state, loading: false, error: false }



        default:
            return state

    }
}

export default friendReducer