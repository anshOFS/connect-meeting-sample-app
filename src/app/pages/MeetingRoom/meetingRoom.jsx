import React from "react";
import { useSelector } from "react-redux";

const MeetingRoom = (props) => {
    const {
        createMeetingDetails, 
        role
      } = useSelector((store) => store.meetingDetail);
    const token = role === 'Guest' ? createMeetingDetails.guestcalltoken : createMeetingDetails.hostcalltoken;
    return (
        <div>
            <iframe src={`https://azurevideomeet.azurewebsites.net/?token=${token}`} width="1360" height="691" allow="camera;microphone;display-capture;fullscreen">           
            </iframe>
        </div>
    );
};

export default MeetingRoom;