const videoReducer = (state = { video: [], loading: false, error: false }, action) => {
    switch (action.type) {

        case "RETREIVING_VIDEO_POST_START":
            return { ...state, loading: true, error: false }
        case "RETREIVING_VIDEO_POST_SSUCCESS":
            return { ...state, video: action.data, loading: false, error: false }
        case "RETREIVING_VIDEO_POST_FAIL":
            return { ...state, loading: false, error: true }

        case "CREATE_VIDOE_START":
            return { ...state, loading: true, error: false }
        case "CREATE_VIDOE_SUCCESS":
            return { ...state, video: [action.data, ...state.video], loading: false, error: false }
        case "CREATE_VIDOE_FAIL":
            return { ...state, loading: false, error: true }

        case "REDUCER_THE_VIDEOS_BY_ONE":
            const VideoAfterChange = state.video.filter(vid => vid.id !== action.data)
            return { ...state, video: VideoAfterChange, loading: false, error: true }
        default:
            return state
    }
}

export default videoReducer