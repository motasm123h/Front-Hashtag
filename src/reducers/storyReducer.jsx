const storyReducer = (state = { myStory: [], stories: [], stories_view: [], loading: false, error: false }, action) => {

    switch (action.type) {
        case 'FETCH_STORY_START':
            return { ...state, loading: true, error: false }
        case 'FETCH_STORY_SUCCESS':
            return { ...state, stories: action.data, loading: false, error: false }
        case 'FETCH_STORY_FAIL':
            return { ...state, loading: false, error: true }

        case 'DELETE_STORY_PROFILE':
            return { ...state, myStory: [], loading: false, error: false }


        case 'DELETE_STORY_START':
            return { ...state, loading: true, error: false }
        case 'DELETE_STORY_SUCCESS':
            return { ...state, myStory: [], loading: false, error: false }
        case 'DELETE_STORY_FAIL':
            return { ...state, loading: false, error: true }


        case 'GET_VIEWS_START':
            return { ...state, loading: true, error: false }
        case 'GET_VIEWS_SUCCESS':
            return { ...state, stories_view: action.data, loading: false, error: false }
        case 'GET_VIEWS_FAIL':
            return { ...state, loading: false, error: true }


        case 'UPLOAD_STORY_START':
            return { ...state, loading: true, error: false }
        case 'UPLOAD_STORY_SUCCESS':
            return { ...state, myStory: action.data, loading: false, error: false }
        case 'UPLOAD_STORY_FAIL':
            return { ...state, loading: false, error: true }


        case 'FETCH_VIEW_STORY_START':
            return { ...state, loading: true, error: false }
        case 'FETCH_VIEW_STORY_SUCCESS':
            return { ...state, stories_view: action.data, loading: false, error: false }
        case 'FETCH_VIEW_STORY_FAIL':
            return { ...state, loading: false, error: true }


        case 'FETCH_MY_STORY_START':
            return { ...state, loading: true, error: false }
        case 'FETCH_MY_STORY_SUCCESS':
            return { ...state, myStory: action.data, loading: false, error: false }
        case 'FETCH_MY_STORY_FAIL':
            return { ...state, loading: false, error: true }


        default:
            return state

    }
}

export default storyReducer;