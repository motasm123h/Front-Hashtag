import * as createSAvePostApi from '../api/SaveRequest'

export const savePostFetch = () => async (dispatch) => {
    dispatch({ type: "RETREIVING_SAVE_POST_START" });
    try {
        const { data } = await createSAvePostApi.fetchSavePosts();
        dispatch({ type: "RETREIVING_SAVE_POST_SSUCCESS", data: data.post });
    } catch (err) {
        console.log(err)
        dispatch({ type: "RETREIVING_SAVE_POST_FAIL" });
    }
}
export const savePost = (id) => async (dispatch) => {
    dispatch({ type: "SAVE_POST_START" });
    try {
        const { data } = await createSAvePostApi.savePost(id);
        dispatch({ type: "SAVE_POST_SSUCCESS", data: data.post });
    } catch (err) {
        console.log(err)
        dispatch({ type: "SAVE_POST_FAIL" });
    }

}
