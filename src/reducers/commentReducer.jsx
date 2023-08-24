const commentReducer = (state = { commentData: [], loading: false, error: false }, action) => {
    switch (action.type) {
        case 'COMMENT_START':
            return { ...state, loading: true, error: false }
        case 'COMMENT_SUCCESS':
            return { ...state, commentData: action.data, loading: false }
        case 'COMMENT_FAIL':
            return { ...state, error: true, loading: false }

        // [action.data, ...state.posts]
        //create comment
        case 'CREATE_START':
            return { ...state, loading: true, error: false }
        case 'CREATE_SUCCESS':
            return { ...state, commentData: [...state.commentData, action.data], loading: false }
        case 'CREATE_FAIL':
            return state

        case 'DELETE_COMMENT_FROM_THE_COMMENTS':
            const commentAfterDelete = state.commentData.filter(comment => comment.id !== action.id)
            return { ...state, commentData: commentAfterDelete, loading: false, error: false }
        default:
            return state


    }
}

export default commentReducer