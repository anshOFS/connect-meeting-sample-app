import _ from "underscore";
import { updateObject } from "../../utils/storeUtils";
import * as actionTypes from '../actions/actionTypes';
const initialState = {
  role: "",
  isMeetingFormOpen: false,
  createMeetingDetails: {
    meetingId: '',
    hostId: '',
    hostName: '',
    guestID: '',
    guestName: '',
    meetingStartTime: '',
    meetingEndTime: '',
    createdOn: '', 
    createdBy: ''
  },
  isMeetingRoomOpen: false, 
  meetingDetailsList: []
};
export const MeetingDetailsReducer = (state = initialState, action = { type: "" }) => {
  switch (action.type) {
    case actionTypes.SET_USER_ROLE:
      return updateObject(state, { role: action.payload, isMeetingFormOpen: true });
    case `${actionTypes.CREATE_MEETING_DETAILS}_SUCCESS`:
      let createMeetingDetails = state.createMeetingDetails
      console.log('hi')
      createMeetingDetails = {
        ...action.payload
      }
      return updateObject(state, { 
        createMeetingDetails: createMeetingDetails, 
        isMeetingFormOpen: false, 
        isMeetingRoomOpen: true 
      });
      case  `${actionTypes.GET_MEETING_DETAILS}_SUCCESS`:
        let updatedMeetingList = action.payload
      return updateObject(state, { meetingDetailsList:  updatedMeetingList});
      default:
        return state;

  }
};
