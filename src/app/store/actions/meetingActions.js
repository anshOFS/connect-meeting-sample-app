import * as actionTypes from "../actions/actionTypes";

export const setUserRole = (payload) => ({
  type: actionTypes.SET_USER_ROLE,
  payload,
});

export const getMeetingDetails = (payload) => ({
    type: actionTypes.GET_MEETING_DETAILS,
    payload,
});
export const getMeetingDetailsFailed = (payload) => ({
    type: `${actionTypes.GET_MEETING_DETAILS}_FAILED`,
    payload,
});
export const getMeetingDetailsSuccess = (payload) => ({
    type: `${actionTypes.GET_MEETING_DETAILS}_SUCCESS`,
    payload,
});
export const createMeetingDetails = (payload) => ({
    type: actionTypes.CREATE_MEETING_DETAILS,
    payload,
});
export const createMeetingDetailsFailed = (payload) => ({
    type: `${actionTypes.CREATE_MEETING_DETAILS}_FAILED`,
    payload,
});
export const createMeetingDetailsSuccess = (payload) => ({
    type: `${actionTypes.CREATE_MEETING_DETAILS}_SUCCESS`,
    payload,
});