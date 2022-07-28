import React from "react";
import { Form, Field } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import * as meetingDetailsAction from '../../store/actions/meetingActions'
import {v4 as generateUUID} from 'uuid';

const MeetingForm = (props) => {
  const {
    createMeetingDetails
  } = useSelector((store) => store.meetingDetail);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const createMeetingDetailsPayload = {
      meetingId: values.meetingID,
      hostId: values.hostID,
      hostName: values.hostName,
      guestID: values.guestID,
      guestName: values.guestName,
      meetingStartTime: "2022-07-01T11:46:33.630Z",
      meetingEndTime: "2022-07-01T12:46:33.630Z",
      createdOn: new Date(), 
      createdBy: values.hostID
    }
    dispatch(meetingDetailsAction.createMeetingDetails(createMeetingDetailsPayload));
  }
  return (
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
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
                        <button className="btn btn-block btn-sm btn-danger text-body" type="button" onClick={() => form.change("meetingID", generateUUID())}>
                          GEN
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
                        <button className="btn btn-block btn-sm btn-danger text-body" type="button" onClick={() => {
                          const someValue = generateUUID();
                          form.change("hostID", someValue)
                          form.change("createdBy", someValue)
                        }}>
                          GEN
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
                          Guest ID
                        </label>
                        <Field
                          name="guestID"
                          style={{ width: "20rem", marginLeft: "10px" }}
                          className="form-control form-control-sg"
                          component="input"
                        />
                        <button className="btn btn-block btn-sm btn-danger text-body" type="button" onClick={() => form.change("guestID", generateUUID())}>
                          GEN
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
                      {console.log(createMeetingDetails, 'createMeetingDetails')}
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
                          className="btn btn-block btn-lg btn-primary text-body"
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
