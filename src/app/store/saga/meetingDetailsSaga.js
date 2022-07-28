import { put, takeEvery, delay } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import * as meetingActions from "../actions/meetingActions";
import { MeetingDetailsService } from "../../service/meetingDetailService";

export function* createMeetingDetailsSaga(payload) {
    try {
        const response = yield MeetingDetailsService.createMeetingDetails(payload);
        const {isError, result} = response.data; 
        if(!isError) {
            yield put(meetingActions.createMeetingDetailsSuccess(result));
        }  
    } catch (error) {
        console.log(error)
    }
}
export function* getMeetingDetailsSaga() {
    try {
        const response = yield MeetingDetailsService.getMeetingDetails();
        const {isError, result} = response.data; 
        // yield delay(3000)
        if(!isError) { 
            yield put(meetingActions.getMeetingDetailsSuccess(result));
        }  
    } catch (error) {
        console.log(error)
    }
}

export function* watchMeetingDetailsAsync() {
    yield takeEvery(actionTypes.CREATE_MEETING_DETAILS, createMeetingDetailsSaga);
    yield takeEvery(actionTypes.GET_MEETING_DETAILS, getMeetingDetailsSaga);
}
  