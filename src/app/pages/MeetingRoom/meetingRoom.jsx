import React, { useState } from "react";
import { useSelector } from "react-redux";
import './meetingRoom.css'

const MeetingRoom = (props) => {

    const {
        createMeetingDetails, 
        role
      } = useSelector((store) => store.meetingDetail);

    const [showIFrame, setShowIFrame] = useState(role === "Guest");

    const token = role === 'Guest' ? createMeetingDetails.guestcalltoken : createMeetingDetails.hostcalltoken;
    return (
        <div className="room-container">
            {role === 'Host' && <button onClick={() => setShowIFrame(true)}>Meeting URL: `viedocqavideoconnect.azurewebsites.net?calltoken={token}`</button>}
            {showIFrame && <iframe title="ViedocConnect" src={`https://viedocqavideoconnect.azurewebsites.net?calltoken=${token}`} width="1360" height="691" allow="camera;microphone;display-capture;fullscreen">           
            </iframe>}
        </div>
    );
};

export default MeetingRoom;