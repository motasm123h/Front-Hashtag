import * as StoryRequest from '../api/StoryRequest'

export const fetchStory = () => async (dispatch) => {
    dispatch({ type: "FETCH_STORY_START" })
    try {
        const { data } = await StoryRequest.fetchstory();
        dispatch({ type: "FETCH_STORY_SUCCESS", data: data.stories })
    }
    catch (err) {
        dispatch({ type: "FETCH_STORY_FAIL" })
        console.log(err)
    }
}



export const deleteStory = (id) => async (dispatch) => {
    dispatch({ type: "DELETE_STORY_START" })
    try {
        const { data } = await StoryRequest.deleteStory(id);
        dispatch({ type: "DELETE_STORY_SUCCESS" })
    }
    catch (err) {
        dispatch({ type: "DELETE_STORY_FAIL" })
        console.log(err)
    }
}



export const getViews = (id) => async (dispatch) => {
    dispatch({ type: "GET_VIEWS_START" })
    try {
        const { data } = await StoryRequest.getViews(id);
        dispatch({ type: "GET_VIEWS_SUCCESS", data: data.views })
    }
    catch (err) {
        dispatch({ type: "GET_VIEWS_FAIL" })
        console.log(err);
    }
}

export const uploadStoryImage = (formData) => async (dispatch) => {
    try {
        await StoryRequest.uploadStoryIma(formData);
        dispatch({ type: "UPLOAD_IMAGE_STORY_SUCCESS" })
    }
    catch (err) {
        console.log(err);
    }
}

export const uploadStory = (formData) => async (dispatch) => {
    dispatch({ type: "UPLOAD_STORY_START" })
    try {
        const { data } = await StoryRequest.createStory(formData);
        dispatch({ type: "UPLOAD_STORY_SUCCESS", data: data.message })
    }
    catch (err) {
        dispatch({ type: "UPLOAD_STORY_FAIL" })
        console.log(err)
    }
}

// export const FetchViewStory = (formData) => async (dispatch) => {
//     dispatch({ type: "FETCH_VIEW_STORY_START" })
//     try {
//         const { data } = await StoryRequest.getViews(formData);
//         dispatch({ type: "FETCH_VIEW_STORY_SUCCESS", data: data.views })
//     }
//     catch (err) {
//         dispatch({ type: "FETCH_VIEW_STORY_FAIL" })
//         console.log(err)
//     }
// }

export const FetchMyStory = () => async (dispatch) => {
    dispatch({ type: "FETCH_MY_STORY_START" })
    try {
        const { data } = await StoryRequest.getMyStory();
        dispatch({ type: "FETCH_MY_STORY_SUCCESS", data: data.stories })
    }
    catch (err) {
        dispatch({ type: "FETCH_MY_STORY_FAIL" })
        console.log(err)
    }
}