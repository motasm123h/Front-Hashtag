const likeReducer = (state = { LikeData: [], loading: false, error: false }, action) => {
    switch (action.type) {
        case 'COMMENT_START':
            return { ...state, loading: true, error: false }
        case 'COMMENT_SUCCESS':
            return { ...state, LikeData: action.data, loading: false }
        case 'COMMENT_FAIL':
            return { ...state, error: true, loading: false }
        
        case 'LIKE_OR_UN_LIKE':
            return { ...state,error:false,loading: false}
        // [action.data, ...state.posts]
        //create comment
        // case 'CREATE_START':
        //     return { ...state, loading: true, error: false }
        // case 'CREATE_SUCCESS':
        //     return { ...state, commentData: [...state.commentData, action.data], loading: false }
        // case 'CREATE_FAIL':
        //     return state
        default:
            return state


    }
}

export default likeReducer