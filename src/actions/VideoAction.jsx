import * as videoApi from '../api/VideoRequest'

export const videoFetch = () => async (dispatch) => {
    dispatch({ type: "RETREIVING_VIDEO_POST_START" });
    try {
        const { data } = await videoApi.fetchVideos();
        dispatch({ type: "RETREIVING_VIDEO_POST_SSUCCESS", data: data.message });
    } catch (err) {
        console.log(err)
        dispatch({ type: "RETREIVING_VIDEO_POST_FAIL" });
    }
}
export const createPostVideo = (dataa) => async (dispatch) => {
    dispatch({ type: "CREATE_VIDOE_START" });
    try {
        const { data } = await videoApi.createVideos(dataa);
        dispatch({ type: "CREATE_VIDOE_SUCCESS", data: data.message });
    } catch (err) {
        console.log(err)
        dispatch({ type: "CREATE_VIDOE_FAIL" });
    }

}
