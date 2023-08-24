const postReducer = (state = { posts: [], postsForType: [], postType: null, profile: [], newsFeedPost: [], SearchPost: [], searchUser: [], loading: false, error: false, uploading: false }, action) => {

    switch (action.type) {

        //here i upload post
        case 'UPLOAD_POST_START':
            return { ...state, error: false, uploading: true }
        case 'UPLOAD_POST_SUCCESS':
            return { ...state, posts: [action.data, ...state.posts], error: false, uploading: false }
        case 'UPLOAD_POST_FAIL':
            return { ...state, error: true, uploading: false }

        //start fetching the posts
        case 'RETREIVING_START':
            return { ...state, error: false, loading: true }
        case 'RETREIVING_SUCCESS':
            return { ...state, posts: action.data, error: false, loading: false }
        case 'RETREIVING_FAIL':
            return { ...state, loading: false, error: true }



        case 'POST_TYPE_FETCH_START':
            return { ...state, error: false, loading: true }
        case 'POST_TYPE_FETCH_SUCCESS':
            return { ...state, postsForType: action.data.post, postType: action.data.type, error: false, loading: false }
        case 'POST_TYPE_FETCH_FAIL':
            return { ...state, loading: false, error: true }



        case 'CREATE_SUCCESS_COUNTER':
            // localStorage.setItem("id", JSON.stringify(action.data.post_id))
            const updatedPosts = state.posts.map(post => {
                if (post.id === action.data) {
                    return { ...post, comment_count: post.comment_count += 1 }
                }
                return post
            })
            return { ...state, posts: updatedPosts }


        // profilePost
        //******************************************* */
        case 'PROFILE_POST_FETCH_START':
            return { ...state, error: false, loading: true }
        case 'PROFILE_POST_FETCH_SUCCESS':
            return { ...state, profile: [action.data], loading: false, error: false }
        case 'PROFILE_POST_FETCH_FAIL':
            return { ...state, error: true, loading: false }



        //DELETE A POST

        case 'DELETE_StART':
            return { ...state, loading: true, error: false };
        case 'DELETE_SUCCESS':

            const PostAfterDele = state.posts.filter(post => post.id !== action.id)
            return { ...state, posts: PostAfterDele, loading: false, error: false }

        case 'DELETE_FAIL':
            return { ...state, error: true };


        //UPDATE POST  
        case 'POST_UPDATE_START':
            return { ...state, loading: true, error: false }
        case 'POST_UPDATE_SUCCESS':
            const PostAfterUPDATE = state.posts.map(post => {
                if (post.id === action.data.id) {
                    return {
                        ...post,
                        ...action.data,
                    }
                }
                return post
            })
            return { ...state, posts: updatedPosts, loading: false, error: false }
        case 'POST_UPDATE_FAIL':
            return { ...state, error: true, loading: false }


        //make like 
        case 'ADD_THE_LIKE_TO_THE_POST':
            const likePosts = state.posts.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isLiked: true,
                        like_count: post.like_count + 1,
                    }
                }
                return post
            })

            const { profile } = state;
            const { posts } = profile[0];

            const updatedProfilePosts = posts.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isLiked: true,
                        like_count: post.like_count + 1,
                    };
                }
                return post;
            });
            const updatedProfile = [{ ...profile[0], posts: updatedProfilePosts }];

            const newFeedPostLike = state.newsFeedPost.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isLiked: true,
                        like_count: post.like_count + 1,
                    }
                }
                return post;
            })


            const postBytypeAfterChange = state.postsForType.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isLiked: true,
                        like_count: post.like_count + 1,
                    }
                }
                return post
            })


            return { ...state, posts: likePosts, postsForType: postBytypeAfterChange, newsFeedPost: newFeedPostLike, profile: updatedProfile, loading: false, error: false }











        case 'ADD_THE_SAVE_TO_THE_POST':
            const savePosts = state.posts.map(post => {
                if (post.id === action.data.id) {
                    return {
                        ...post,
                        isSaved: true,
                    }
                }
                return post
            })


            const dataSave = state.profile[0].posts;

            const updatedProfilePostsSave = dataSave.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isSaved: true,
                    }
                };
                return post;
            }
            );

            const updatedProfileSave = [{ ...state.profile[0], posts: updatedProfilePostsSave }];



            const postBytypeAfterChangeSave = state.postsForType.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isSaved: true,
                    }
                }
                return post
            })

            return { ...state, posts: savePosts, profile: updatedProfileSave, postsForType: postBytypeAfterChangeSave, loading: false, error: false }


        case 'REMOVE_THE_SAVE_FROME_THE_POST':
            const unsavePosts = state.posts.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isSaved: false,
                    }
                }
                return post
            })

            const dataUnSave = state.profile[0].posts;

            const updatedProfilePostsUnSave = dataUnSave.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isSaved: false,
                    }
                };
                return post;
            }
            );

            const updatedProfileUnSave = [{ ...state.profile[0], posts: updatedProfilePostsUnSave }];

            const postBytypeAfterChangeUnSave = state.postsForType.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isSaved: false,
                    }
                }
                return post
            })

            return { ...state, posts: unsavePosts, postsForType: postBytypeAfterChangeUnSave, profile: updatedProfileUnSave, loading: false, error: false }


        //make romve 
        case 'REMOVE_THE_LIKE_FROME_THE_POST':
            const unlikePosts = state.posts.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isLiked: false,
                        like_count: post.like_count - 1,
                    }
                }
                return post
            })

            const data = state.profile[0].posts;

            const updatedProfilePostsUnlike = data.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isLiked: false,
                        like_count: post.like_count - 1,
                    }
                };
                return post;
            }
            );

            const updatedProfileUnlike = [{ ...state.profile[0], posts: updatedProfilePostsUnlike }];


            const postBytypeAfterChangeUnlike = state.postsForType.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        isLiked: false,
                        like_count: post.like_count - 1,
                    }
                }
                return post
            })

            return { ...state, posts: unlikePosts, postsForType: postBytypeAfterChangeUnlike, profile: updatedProfileUnlike, loading: false, error: false }


        case 'NEWS_FEED_POST_START':
            const newFeedPost = state.newsFeedPost ? [action.data, ...state.newsFeedPost] : [action.data]
            return { ...state, newsFeedPost: newFeedPost, error: false, loading: false }



        case 'SEARCH_USER_START':
            return { ...state, searchUser: action.data, error: false, loading: false }

        case 'SEARCH_POST_START':
            return { ...state, SearchPost: action.data, error: false, loading: false }


        case 'INITIALIZATION_SEARCH_ARRAYS':
            return { ...state, SearchPost: [], searchUser: [], error: false, loading: false }



        case 'REDUCE_THE_COUNTER_BY_ONE':
            const PostMinusByOnecounter = state.posts.map(post => {
                if (post.id === action.data) {
                    return {
                        ...post,
                        comment_count: post.comment_count - 1,
                    }
                }
                return post
            })
            return { ...state, posts: PostMinusByOnecounter, error: false, loading: false }
        default:
            return state
    }
}

export default postReducer