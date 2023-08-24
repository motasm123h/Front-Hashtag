import { createContext, useEffect } from "react";
import Echo from "laravel-echo";
import { useDispatch, useSelector } from "react-redux";
import { getRandomfriend } from "../actions/FriendsAction";
import { getNotifications } from "../actions/notificationsAction";
import { FetchMyStory, fetchStory } from "../actions/storyAction";
import { profileInfo } from "../actions/postAction";

const total_user_info = localStorage.getItem('token');
const users = JSON.parse(total_user_info)
const token = users ? users : ''
const user = JSON.parse(localStorage.getItem('user'))

const echo = new Echo({
    broadcaster: 'pusher',
    key: 123456789,
    wsHost: '127.0.0.1',
    cluster: "mt1",
    wsPort: 6001,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
    enabledTransports: ['ws', 'wss'],
    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
});

// console.log(user.user.id)
export const PusherContext = createContext();



export const PusherProvider = ({ children }) => {
    const { authData } = useSelector((state) => state.authReducer)
    const distatch = useDispatch();
    useEffect(() => {
        distatch(getRandomfriend())
    }, [])
    useEffect(() => {
        distatch(getNotifications())
    }, [])

    useEffect(() => {
        distatch(fetchStory())
    }, [])

    useEffect(() => {
        distatch(FetchMyStory())
    }, [])

    

    useEffect(() => {
        const channel = echo.private(`post`);
        channel.listen('Post', (e) => {
            distatch({ type: "NEWS_FEED_POST_START", data: e.Post });
            console.log(e.Post)
        });
        return () => {
            channel.stopListening('Post');
        };
    }, []);

    useEffect(() => {
        const channel = echo.private(`search`);
        channel.listen('SearchEvent', (e) => {
            distatch({ type: "SEARCH_USER_START", data: e.result.user });
            distatch({ type: "SEARCH_POST_START", data: e.result.posts });
            // console.log("safas")
            console.log(e.result.user)
        });
        return () => {
            channel.stopListening('SearchEvent');
        };
    }, []);

    useEffect(() => {
        const channel = echo.private(`message.${user ? user.user.id : 0}`);
        channel.listen('Message', (e) => {
            distatch({ type: "SEND_MESSAGES_SUCCESS", data: e.message });
            console.log(e.message)
        });
        return () => {
            channel.stopListening('Message');
        };
    }, []);

    // console.log(user.user.id);

    //this for send the friedn request 
    useEffect(() => {
        const channel = echo.private(`App.Models.User.${user ? user.user.id : 0}`);
        channel.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (notification) => {
            if (notification.type === 'App\\Notifications\\FriendRequestNotification') {
                distatch({ type: "SEND_NOTIFICATION_REQUEST_SUCCESS", data: notification.message });

                // console.log('New friend request:', notification.message);

                // Handle the new friend request notification here
            }
        });

        return () => {
            channel.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated');
        };
    }, []);

    //this is for accept the friend request
    useEffect(() => {
        const channel = echo.private(`App.Models.User.${user ? user.user.id : 0}`);
        channel.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (notification) => {
            if (notification.type === 'App\\Notifications\\FriendRequestAcceptNotification') {
                distatch({ type: "SEND_NOTIFICATION_REQUEST_SUCCESS", data: notification.message });

                console.log('Accept friend request:', notification.message.id);
                // Handle the new friend request notification here
            }
        });

        return () => {
            channel.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated');
        };
    }, []);

    //this is for comment on the friend post
    useEffect(() => {
        const channel = echo.private(`App.Models.User.${user ? user.user.id : 0}`);
        channel.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (notification) => {
            if (notification.type === 'App\\Notifications\\CommentNotification') {
                distatch({ type: "SEND_NOTIFICATION_REQUEST_SUCCESS", data: notification.message });

                console.log('comment', notification.message.id);
                // Handle the new friend request notification here
            }
        });

        return () => {
            channel.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated');
        };
    }, []);

    //this is for comment on the friend post
    useEffect(() => {
        const channel = echo.private(`App.Models.User.${user ? user.user.id : 0}`);
        channel.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (notification) => {
            if (notification.type === 'App\\Notifications\\LikeNotification') {
                distatch({ type: "SEND_NOTIFICATION_REQUEST_SUCCESS", data: notification.message });

                // console.log('like', notification.message.id);
                // Handle the new friend request notification here
            }
        });

        return () => {
            channel.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated');
        };
    }, []);

    return (
        <PusherContext.Provider value={echo}>
            {children}
        </PusherContext.Provider>
    );
};