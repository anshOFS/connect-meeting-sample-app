import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../../pages/Login/login";
import MeetingForm from "../../pages/MeetingForm/mettingForm";
import * as meetingActions from '../../store/actions/meetingActions';
import MeetingRoom from "../../pages/MeetingRoom/meetingRoom";
import MeetingDetails from "../../pages/MeetingDetails/meetingDetails";

const Container = (props) => {
  const {
    isMeetingFormOpen,
    isMeetingRoomOpen,
    meetingDetailsList, 
    role
  } = useSelector((store) => store.meetingDetail);
  const dispatch = useDispatch();

  const onRoleButtonClick = (role) => {
    dispatch(meetingActions.setUserRole(role));
  };
  useEffect(() => {
    dispatch(meetingActions.getMeetingDetails());
  }, []);
  return (
    <>
    {meetingDetailsList.length !== 0 && !isMeetingRoomOpen && role === 'Guest' && (<MeetingDetails meetingDetailsList={meetingDetailsList}/>)}  
    {!isMeetingRoomOpen && (
      <section className="vh-100 " style={{ backgroundColor: role === 'Guest' ? 'white' : "#508bfc" }}>
        <>{!isMeetingFormOpen && !isMeetingRoomOpen && <Login onRoleButtonClick={onRoleButtonClick} />}</>
        <>{isMeetingFormOpen && role  === 'Host' && <MeetingForm />}</>
      </section>
    )}
      {isMeetingRoomOpen && (<MeetingRoom/>)}
    </>
  );
};

export default Container;
