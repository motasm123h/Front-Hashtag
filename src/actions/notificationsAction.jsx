import * as notificationRequest from '../api/NotificationRequest';

// import { getNotification, deleteNotification } from './../api/NotificationRequest';

export const getNotifications = () => async (dispatch) => {
    dispatch({ type: "FTECH_NOTIFICATION_START" })
    try {
        const { data } = await notificationRequest.getNotification();
        dispatch({ type: "FTECH_NOTIFICATION_SUCCESS", data: data.notifications });
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "FTECH_NOTIFICATION_FAIL" })
    }
}

export const markNotificationAsRead = (id) => async (dispatch) => {
    dispatch({ type: "MARK_NOTIFICATION_START" })
    try {
        await notificationRequest.markNotificationAsRead(id);
        dispatch({ type: "MARK_NOTIFICATION_SUCCESS", data: id });
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "MARK_NOTIFICATION_FAIL" })
    }
}

export const deleteNotification = (id) => async (dispatch) => {
    dispatch({ type: "DELETE_NOTIFICATION_START" })
    try {
        await notificationRequest.deleteNotification(id);
        dispatch({ type: "DELETE_NOTIFICATION_SUCCESS", data: id });
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "DELETE_NOTIFICATION_FAIL" })
    }
}