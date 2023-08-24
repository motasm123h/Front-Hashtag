import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentReducer from './commentReducer';
import friendReducer from './friendReducer';
import chatReducer from "./chatReducer";
import notificationReducer from "./notificationReducer";
import saveReducer from "./saveReducer";
import videoReducer from "./videoReducer";
import storyReducer from "./storyReducer";

export const reducers = combineReducers({ authReducer, postReducer, commentReducer, friendReducer, chatReducer, notificationReducer, saveReducer, videoReducer, storyReducer });