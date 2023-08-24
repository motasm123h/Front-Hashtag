import * as createPostApi from '../api/PostRequest'
import * as uploadImage from '../api/uploadImage'

export const uploadIma = (data) => async (dispatch) => {
    try {
        await uploadImage.uploadImage(data)
    } catch (err) {
        console.log(err)
    }
}


export const uploadPost = (postData) => async (dispatch) => {
    dispatch({ type: "UPLOAD_POST_START" })
    try {
        const { data : response } = await createPostApi.uploadPost(postData)
        dispatch({ type: "UPLOAD_POST_SUCCESS", data: response.post })
    } catch (err) {
        console.log(err)
        dispatch({ type: "UPLOAD_POST_FAIL" })
    }
}

// export const PostFetch = () => async (dispatch) => {
//     dispatch({ type: "RETREIVING_START" });
//     try {
//         const {data}  = await createPostApi.getTimeLinePosts()
//         dispatch({ type: "RETREIVING_SUCCESS", data: data.post.post });
//     } catch (err) {
//         console.log(err)
//         dispatch({ type: "RETREIVING_FAIL" });
//     }
// }


// export default createPostApi