import React, { useState } from "react";
import { Form, Field } from "react-final-form";

import {v4 as generateUUID} from 'uuid';
import {IoMdCreate} from 'react-icons/io';
import { useNavigate } from 'react-router';
import 'react-calendar-datetime-picker/dist/index.css'
import DateTimePicker from 'react-datetime-picker';

import { createMeetingDetails } from "../../service/meetingDetails.service";

const MeetingForm = (props) => {

  const [meetingStartTime, setMeetingStartTime] = useState(null)
  const [meetingEndTime, setMeetingEndTime] = useState(null)

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const createMeetingDetailsPayload = {
      meetingId: values.meetingID,
      hostId: values.hostID,
      hostCode: values.hostCode,
      hostName: values.hostName,
      guestID: values.guestID,
      guestCode: values.guestCode,
      guestName: values.guestName,
      meetingStartTime: meetingStartTime.toISOString(),
      meetingEndTime: meetingEndTime.toISOString(),
      metadata: {
        studyID: values.studyID,
        tenantID: values.tenantID,
        subject: values.subject,
      },
      createdBy: values.hostID
    }
    createMeetingDetails(createMeetingDetailsPayload).then(
      (response) => {
        navigate('/meetingRoom', { state: { token: response.data.result.hostcalltoken, callerType: "Host" } })
      }
    ).catch(err => console.log(err))
  }
  return (
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div style={{position: "absolute", right: "5px", top: "5px"}}>
          <button style={{ borderRadius: '8px', outline: "none", border: "1px solid grey" }} onClick={() => navigate('/meetingDetails', { state: {callerType: "Host" } })}>Meeting Details</button>
        </div>
        <div className="row d-flex justify-content-center align-items-center h-100 mt-2">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-3">
                <h2 className="text-center mb-4">Meeting Creation Form</h2>
                <Form
                  onSubmit={(values) => {
                    onSubmit(values)
                  }}
                  render={({ handleSubmit, form }) => (
                    <form style={{marginLeft: '36px'}} onSubmit={handleSubmit}>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Meeting ID
                        </label>
                        <Field
                          name="meetingID"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                        <button 
                          className="btn btn-block btn-sm btn-secondary text-body mx-1" 
                          type="button" 
                          onClick={() => form.change("meetingID", generateUUID())}
                        >
                          <IoMdCreate size={20} />
                        </button>
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Host ID
                        </label>
                        <Field
                          name="hostID"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                        <button 
                          className="btn btn-block btn-sm btn-secondary text-body mx-1" 
                          type="button" 
                          onClick={() => {
                            const someValue = generateUUID();
                            form.change("hostID", someValue)
                            form.change("createdBy", someValue)
                        }}>
                          <IoMdCreate size={20} />
                        </button>
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Host Name
                        </label>
                        <Field
                          name="hostName"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Host Code
                        </label>
                        <Field
                          name="hostCode"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Guest ID
                        </label>
                        <Field
                          name="guestID"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                        <button 
                          className="btn btn-block btn-sm btn-secondary text-body mx-1" 
                          type="button" 
                          onClick={() => form.change("guestID", generateUUID())}
                        >
                          <IoMdCreate size={20} />
                        </button>
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Guest Name
                        </label>
                        <Field
                          name="guestName"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Guest Code
                        </label>
                        <Field
                          name="guestCode"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Study ID
                        </label>
                        <Field
                          name="studyID"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                        <button 
                          className="btn btn-block btn-sm btn-secondary text-body mx-1" 
                          type="button" 
                          onClick={() => form.change("studyID", generateUUID())}
                        >
                          <IoMdCreate size={20} />
                        </button>
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Tenant ID
                        </label>
                        <Field
                          name="tenantID"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                        <button 
                          className="btn btn-block btn-sm btn-secondary text-body mx-1" 
                          type="button" 
                          onClick={() => form.change("tenantID", generateUUID())}
                        >
                          <IoMdCreate size={20} />
                        </button>
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Subject
                        </label>
                        <Field
                          name="subject"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Meeting Start Time
                        </label>
                        
                        <DateTimePicker
                          onChange={setMeetingStartTime}
                          value={meetingStartTime}
                          className="datetime-picker"
                          disableClock
                        />
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Meeting End Time
                        </label>
                        
                        <DateTimePicker
                          onChange={setMeetingEndTime}
                          value={meetingEndTime}
                          className="datetime-picker"
                          disableClock
                        />
                      </div>
                      <div className="d-flex form-outline mb-4">
                        <label
                          className="form-label mt-1"
                          style={{ width: "6rem" }}
                        >
                          Created By
                        </label>
                        <Field
                          name="createdBy"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-block btn-lg btn-primary text-body text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                ></Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingForm;
