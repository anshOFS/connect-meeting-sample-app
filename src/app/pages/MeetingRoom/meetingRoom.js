import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

import './meetingRoom.css';
import {ViedocConnect} from 'viedoc-connect';
import env from "../../service/environment.json"

const MeetingRoom = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    

    const clickHandler = () => {
        navigate('/', {replace: true});
    }

    const token = location.state.token;
    return (
        <div className="room-container">
            <button className="home-btn" onClick={clickHandler}>Homepage</button>

            <ViedocConnect calltoken={token} baseurl={env.BASE_URL} />

        </div>
    );
};

export default MeetingRoom;