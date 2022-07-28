import { combineReducers } from "redux";
import { MeetingDetailsReducer } from "../reducer/meetingDetails";

export const rootReducer = combineReducers({
    meetingDetail: MeetingDetailsReducer,
});