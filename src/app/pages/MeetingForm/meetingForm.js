import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";

import { v4 as generateUUID } from "uuid";
import { IoMdCreate } from "react-icons/io";
import { useNavigate } from "react-router";

import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { validator } from "./validator";
import { createMeetingDetails } from "../../service/meetingDetails.service";
import './meetingForm.css';
import { SNACKBAR_DURATION } from "../../../config/constants";
import Toaster from "../../components/Toaster/Toaster";

const MeetingForm = (props) => {

  const [meetingStartTime, setMeetingStartTime] = useState(initialTime);
  const [meetingEndTime, setMeetingEndTime] = useState(getTiming(meetingStartTime))

  const navigate = useNavigate();

  const classStyleError = "form-control form-control-sg error-border";
  const classStyleSuccess = "form-control form-control-sg";

  const [message, setMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function initialTime() {
    return new Date(new Date().setSeconds(new Date().getSeconds() + 60));
  }

  function getTiming(time) {
    return new Date(new Date(time).setHours(time.getHours() + 1));
  }

  useEffect(() => {
    getTiming(meetingStartTime);
  }, [meetingStartTime]);


  const snackbarHandler = (errorMessage) => {
      setMessage(errorMessage);
      setIsAlertVisible(true);

      setTimeout(() => {
          setIsAlertVisible(false);
      }, SNACKBAR_DURATION);
  }

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
    createMeetingDetails(createMeetingDetailsPayload)
      .then((response) => {
        navigate("/meetingRoom", {
          state: {
            token: response.data.result.hostcalltoken,
            callerType: "Host",
          },
        });
      })
      .catch((err) => snackbarHandler(err.message));
  }
  
  return (
    <>
      {isAlertVisible && <Toaster message={message}/>}
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div style={{ position: "absolute", right: "5px", top: "5px" }}>
          <button
            className="meetingDetails"
            onClick={() =>
              navigate("/meetingDetails", { state: { callerType: "Host" } })
            }
          >
            Meeting Details
          </button>
        </div>
        <div className="row d-flex justify-content-center align-items-center h-100 mt-2">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-3">
                <h2 className="text-center mb-4 title">Meeting Creation Form</h2>
                <Form
                  validate={validator}
                  onSubmit={(values) => {
                    onSubmit(values);
                  }}
                  render={({ handleSubmit, form, submitting, pristine }) => (
                    <form
                      className="meetingForm"
                      onSubmit={handleSubmit}
                    >
                      <Field
                        name="meetingID"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Meeting ID
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  readOnly
                                  {...input}
                                  type="text"
                                  placeholder="Click the button to generate Meeting ID"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              <div>
                                <button
                                  className="btn btn-block btn-md btn-secondary text-body mx-1"
                                  type="button"
                                  onClick={() =>
                                    form.change("meetingID", generateUUID())
                                  }
                                >
                                  <IoMdCreate size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="hostID"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Host ID
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  readOnly
                                  {...input}
                                  type="text"
                                  placeholder="Click the button to generate Host ID"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              <div>
                                <button
                                  className="btn btn-block btn-md btn-secondary text-body mx-1"
                                  type="button"
                                  onClick={() => {
                                    const idValue = generateUUID();
                                    form.change("hostID", idValue)
                                    form.change("createdBy", idValue)
                                  }
                                    
                                  }
                                >
                                  <IoMdCreate size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="hostName"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Host Name
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  {...input}
                                  type="text"
                                  placeholder="Host Name"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="hostCode"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Host Code
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  {...input}
                                  type="text"
                                  placeholder="Host Code"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="guestID"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Guest ID
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  readOnly
                                  {...input}
                                  type="text"
                                  placeholder="Click the button to generate Guest ID"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              <div>
                                <button
                                  className="btn btn-block btn-md btn-secondary text-body mx-1"
                                  type="button"
                                  onClick={() =>
                                    form.change("guestID", generateUUID())
                                  }
                                >
                                  <IoMdCreate size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="guestName"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Guest Name
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  {...input}
                                  type="text"
                                  placeholder="Guest Name"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="guestCode"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Guest Code
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  {...input}
                                  type="text"
                                  placeholder="Guest Code"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="studyID"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Study ID
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  readOnly
                                  {...input}
                                  type="text"
                                  placeholder="Click the button to generate Study ID"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              <div>
                                <button
                                  className="btn btn-block btn-md btn-secondary text-body mx-1"
                                  type="button"
                                  onClick={() =>
                                    form.change("studyID", generateUUID())
                                  }
                                >
                                  <IoMdCreate size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="tenantID"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Tenant ID
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  readOnly
                                  {...input}
                                  type="text"
                                  placeholder="Click the button to generate Tenant ID"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              <div>
                                <button
                                  className="btn btn-block btn-md btn-secondary text-body mx-1"
                                  type="button"
                                  onClick={() =>
                                    form.change("tenantID", generateUUID())
                                  }
                                >
                                  <IoMdCreate size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="subject"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Subject
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  {...input}
                                  type="text"
                                  placeholder="Subject"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field name="meetingStartTime">
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Meeting Start Time
                              </label>

                                <DateTimePicker
                                  minDateTime={new Date()}
                                  renderInput={
                                    (props) => 
                                      <TextField {...props} />}
                                  
                                  value={meetingStartTime}
                                  onChange={(value) => {
                                    setMeetingStartTime(value);
                                    setMeetingEndTime(getTiming(value))
                                  }}
                              />
                            </div>
                            {/* {(meta.error || meta.submitError) &&
                              meta.touched && (
                                <span className="error-msg">{meta.error || meta.submitError}</span>
                              )} */}
                          </div>
                        )}
                      </Field>
                      <Field name="meetingEndTime">
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Meeting End Time
                              </label>

                                <DateTimePicker
                                  minDateTime={meetingStartTime.getTime() + (1000 * 60 * 60 * 0.25)}
                                  maxDateTime={meetingStartTime.getTime() + (1000 * 60 * 60 * 1)}
                                  renderInput={(props) => <TextField {...props} />}
                                  
                                  value={meetingEndTime }
                                  onChange={(value) => {
                                    setMeetingEndTime(value);
                                  }}
                                />
                            </div>
                            {/* {(meta.error || meta.submitError) &&
                              meta.touched && (
                                <span className="error-msg">{meta.error || meta.submitError}</span>
                              )} */}
                          </div>
                        )}
                      </Field>
                      <Field
                        name="createdBy"
                        style={{ width: "20rem", marginLeft: "10px" }}
                      >
                        {({ input, meta }) => (
                          <div>
                            <div className="d-flex form-outline mb-2">
                              <label
                                className="label"
                                style={{ width: "6rem" }}
                              >
                                Created By
                              </label>
                              <div className="flex-grow-1">
                                <input
                                  readOnly
                                  {...input}
                                  type="text"
                                  placeholder="Created By"
                                  className={(meta.error && meta.touched) ? classStyleError : classStyleSuccess}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-msg">{meta.error}</span>
                                )}
                              </div>
                              
                            </div>
                          </div>
                        )}
                      </Field>
                      <div className="d-flex justify-content-center btn-sub">
                        <button
                          type="submit"
                          className="btn btn-block btn-lg btn-primary text-body text-white"
                          disabled={submitting || pristine}
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
    </>
  );
};

export default MeetingForm;
