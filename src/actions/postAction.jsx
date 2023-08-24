import * as createPostApi from '../api/PostRequest'

export const PostFetch = () => async (dispatch) => {
    dispatch({ type: "RETREIVING_START" });
    try {
        const newPost = await createPostApi.getTimeLinePosts()
        dispatch({ type: "RETREIVING_SUCCESS", data: newPost.data.post });
    } catch (err) {
        console.log(err)
        dispatch({ type: "RETREIVING_FAIL" });
    }
}

export const PostDelete = (id) => async (dispatch) => {
    dispatch({ type: "DELETE_START" });
    try {
        await createPostApi.DeletePost(id);
        dispatch({ type: "DELETE_SUCCESS", id: id })
    }
    catch (err) {
        console.log(err);
        dispatch({ type: "DELETE_FAIL" })
    }
}

export const PostUpdate = (formData, id) => async (dispatch) => {
    dispatch({ type: "POST_UPDATE_START" })
    try {
        const { data } = await createPostApi.EditePost(formData, id);
        dispatch({ type: "POST_UPDATE_SUCCESS", data: data })
    }
    catch (err) {
        console.log(err);
    }P
}
export const profileInfo = (id) => async (dispatch) => {
    dispatch({ type: "PROFILE_POST_FETCH_START" })
    try {
        const { data } = await createPostApi.profileInfo(id);
        dispatch({ type: "PROFILE_POST_FETCH_SUCCESS", data: data })
    }
    catch (err) {
        console.log(err);
        dispatch({ type: "PROFILE_POST_FETCH_FAIL", data: data })
    }
}

export const postByType = (post_type) => async (dispatch) => {
    dispatch({ type: "POST_TYPE_FETCH_START" })
    try {
        const { data } = await createPostApi.getPostByType(post_type);
        dispatch({ type: "POST_TYPE_FETCH_SUCCESS", data: data })
    }
    catch (err) {
        console.log(err);
        dispatch({ type: "POST_TYPE_FETCH_FAIL", data: data })
    }
}