import * as likeRequests from '../api/likesRequest'
// import { likeOrUnLike } from './../api/likesRequest';

export const likeOrUnLike = (id) => async (dispatch) => {
    try {
        const { data } = await likeRequests.likeOrUnLike(id)
        dispatch({ type: 'LIKE_OR_UN_LIKE', data: data.data })
    }
    catch (err) {
        console.log(err);
    }
}