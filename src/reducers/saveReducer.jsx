const saveReducer = (state = { savePost: [], loading: false, error: false }, action) => {
    switch (action.type) {

        case "RETREIVING_SAVE_POST_START":
            return { ...state, loading: true, error: false }
        case "RETREIVING_SAVE_POST_SSUCCESS":
            return { ...state, savePost: action.data, loading: false, error: false }
        case "RETREIVING_SAVE_POST_FAIL":
            return { ...state, loading: false, error: true }

        case "SAVE_POST_START":
            return { ...state, loading: true, error: false }
        case "SAVE_POST_SSUCCESS":
            return { ...state, savePost: [action.data, ...state.savePost], loading: false, error: false }
        case "SAVE_POST_FAIL":
            return { ...state, loading: false, error: true }

        case "REMOVE_THE_SAVE_FROME_THE_POST":
            const savePosts = state.savePost.filter(post => post.id !== action.id) 
            return { ...state, posts: savePosts, loading: false, error: false }

        default:
            return state
    }
}

export default saveReducer