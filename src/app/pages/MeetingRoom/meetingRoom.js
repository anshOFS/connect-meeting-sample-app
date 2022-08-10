import React, { useState } from "react";
import {useLocation} from "react-router-dom";

import './meetingRoom.css';
import { CALL_TOKEN } from "../../../config/constants";
import { HOSTED_URL } from "../../service/base.service";

const MeetingRoom = (props) => {

    const location = useLocation();
    const role = location.state.callerType;
    const [showIFrame, setShowIFrame] = useState(role === "Guest");

    const token = location.state.token;
    return (
        <div className="room-container">
            {role === 'Host' && <button style={{position: "absolute"}} onClick={() => setShowIFrame(true)}>Meeting URL: {HOSTED_URL}{CALL_TOKEN}{token}</button>}
            {showIFrame && <iframe title="ViedocConnect" src={`${HOSTED_URL}${CALL_TOKEN}${token}`} className="frame" allow="camera;microphone;display-capture;fullscreen">           
            </iframe>}
        </div>
    );
};

export default MeetingRoom;