import * as FriendAPI from './../api/FriendRequest';

// export const Friends = (id) => async (dispatch) => {
//     dispatch({ type: "SEND_FRIEND_REQUEST_START" });
//     try {
//         // await FriendAPI.FriendRequest(id);
//         dispatch({ type: "SEND_FRIEND_REQUEST_SUCCESS" })
//     }
//     catch (err) {
//         console.log(err)
//         dispatch({ type: "SEND_FRIEND_REQUEST_FAIL" })
//     }
// }


export const getRandomfriend = () => async (dispatch) => {
    dispatch({ type: "GET_RANDOM_FRIENDS_START" })
    try {
        const { data } = await FriendAPI.getRandomFriend();
        dispatch({ type: "GET_RANDOM_FRIENDS_SUCCESS", data: data.friend })
    }
    catch (err) {
        // console.log(err.message)
        dispatch({ type: "GET_RANDOM_FRIENDS_FAIL" })
    }
}

// export const sendFriendRequest = (id) => async (dispatch) => {
//     dispatch({ type: "SEND_FRIENDS_REQUEST_START" })
//     try {
//         const { data } = await FriendAPI.sendFriendRequest(id);
//         dispatch({ type: "SEND_FRIENDS_REQUEST_SUCCESS", data: id })
//     }
//     catch (err) {
//         console.log(err.message)
//         dispatch({ type: "SEND_FRIENDS_REQUEST_FAIL" })
//     }
// }


export const acceptFrienReuest = (id) => async (dispatch) => {
    dispatch({ type: "ACCEPT_FRIENDS_REQUEST_START" })
    try {
        const { data } = await FriendAPI.acceptFrienReuest(id);
        dispatch({ type: "ACCEPT_FRIENDS_REQUEST_SUCCESS", data: data.freind })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: "ACCEPT_FRIENDS_REQUEST_FAIL" })
    }
}


export const rejectFrienReuest = (id) => async (dispatch) => {
    dispatch({ type: "REJECT_FRIENDS_REQUEST_START" })
    try {
        const { data } = await FriendAPI.rejectFrienReuest(id);
        dispatch({ type: "REJECT_FRIENDS_REQUEST_SUCCESS", data: data.friend })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: "REJECT_FRIENDS_REQUEST_FAIL" })
    }
}


export const getsendFrienReuest = (id) => async (dispatch) => {
    dispatch({ type: "GET_SEND_FRIENDS_REQUEST_START" })
    try {
        const { data } = await FriendAPI.getSendRequest(id);
        dispatch({ type: "GET_SEND_FRIENDS_REQUEST_SUCCESS", data: data.sendRequest })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: "GET_SEND_FRIENDS_REQUEST_FAIL" })
    }
}



export const getRecievedRequest = (id) => async (dispatch) => {
    dispatch({ type: "GET_RECIEVED_FRIENDS_REQUEST_START" })
    try {
        const { data } = await FriendAPI.getRecievedRequest(id);
        dispatch({ type: "GET_RECIEVED_FRIENDS_REQUEST_SUCCESS", data: data.RecievedRequest })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: "GET_RECIEVED_FRIENDS_REQUEST_FAIL" })
    }
}

export const getFriend = () => async (dispatch) => {
    dispatch({ type: "GET_FRIENDS_START" })
    try {
        const { data } = await FriendAPI.getFriend();
        dispatch({ type: "GET_FRIENDS_SUCCESS", data: data.freind })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: "GET_FRIENDS_FAIL" })
    }
}


export const getOnlineFriend = () => async (dispatch) => {
    dispatch({ type: "GET_ONLINE_FRIENDS_START" })
    try {
        const { data } = await FriendAPI.getOnlineFriends();
        dispatch({ type: "GET_ONLINE_FRIENDS_SUCCESS", data: data.freind })
    }
    catch (err) {
        console.log(err.message)
        dispatch({ type: "GET_ONLINE_FRIENDS_FAIL" })
    }
} 