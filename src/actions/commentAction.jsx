import * as CommentRequest from '../api/CommentRequest'

export const commentFetch = (id) => async (dispatch) => {
    dispatch({ type: "COMMENT_START" })
    try {
        const { data } = await CommentRequest.commentFetch(id);
        dispatch({ type: "COMMENT_SUCCESS", data: data.comment })

    } catch (err) {
        console.log(err)
        dispatch({ type: "COMMENT_FAIL" })
    }
}

export const commentCreate = (formData,id) => async (dispatch) => {
    dispatch({ type: "CREATE_START" })
    try {
        const { data } = await CommentRequest.createComment(formData,id);
        dispatch({ type: "CREATE_SUCCESS", data: data.comment })

    } catch (err) {
        console.log(err)
        dispatch({ type: "CREATE_FAIL" })
    }
}