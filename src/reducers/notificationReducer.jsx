const notificationReducer = (state = { notification: [], loading: false, error: false }, action) => {
    switch (action.type) {
        case 'FTECH_NOTIFICATION_START':
            return { ...state, loading: true, error: false }
        case 'FTECH_NOTIFICATION_SUCCESS':
            return { ...state, notification: action.data, loading: false, error: false }



        case 'DELETE_NOTIFICATION_START':
            return { ...state, loading: true, error: false }
        case 'DELETE_NOTIFICATION_SUCCESS':
            const notificationFiltir = state.notification.filter(notify => notify.id !== action.data)
            return { ...state, notification: notificationFiltir, loading: false, error: false }
        case 'DELETE_NOTIFICATION_FAIL':
            return { ...state, error: true, loading: false }



        case 'MARK_NOTIFICATION_START':
            return { ...state, loading: true, error: false }
        case 'MARK_NOTIFICATION_SUCCESS':
            const readNotificationFiltir = state.notification.map(notify => {
                if (notify.id === action.data) {
                    return {
                        ...notify,
                        read_at: new Date().toLocaleTimeString(),
                    }
                }
                return notify;
            }
            )
            return { ...state, notification: readNotificationFiltir, loading: false, error: false }
        case 'MARK_NOTIFICATION_FAIL':
            return { ...state, error: true, loading: false }


        case 'SEND_NOTIFICATION_REQUEST_SUCCESS':
            return { ...state, notification: [action.data, ...state.notification] }
        default:
            return state;






    }
}

export default notificationReducer;