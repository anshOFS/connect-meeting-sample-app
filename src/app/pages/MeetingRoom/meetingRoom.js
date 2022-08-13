import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

import './meetingRoom.css';
import { CALL_TOKEN } from "../../../config/constants";
import { HOSTED_URL } from "../../service/base.service";

const MeetingRoom = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    // const role = location.state.callerType;
    // const [showIFrame, setShowIFrame] = useState(role === "Guest");
    // const [buttonHidden, setButtonHidden] = useState(false);

    const clickHandler = () => {
        // setShowIFrame(true)
        // setButtonHidden(true)
        navigate('/', {replace: true});
    }

    const token = location.state.token;
    return (
        <div className="room-container">
            {/* {role === 'Host' && <button className="btn-style" hidden={buttonHidden} onClick={clickHandler}>Meeting URL: {HOSTED_URL}{CALL_TOKEN}{token}</button>} */}
            {/* {showIFrame && <iframe title="ViedocConnect" src={`${HOSTED_URL}${CALL_TOKEN}${token}`} className="frame" allow="camera;microphone;display-capture;fullscreen">           
            </iframe>} */}
            <button className="home-btn" onClick={clickHandler}>Homepage</button>
            <iframe title="ViedocConnect" src={`${HOSTED_URL}${CALL_TOKEN}${token}`} className="frame" allow="camera;microphone;display-capture;fullscreen">           
            </iframe>
            {/* <iframe title="ViedocConnect" src={`http://localhost:3000?calltoken=${token}`} className="frame" allow="camera;microphone;display-capture;fullscreen">           
            </iframe> */}
        </div>
    );
};

export default MeetingRoom;