export const validator = (values) => {
    const errors = {};
    if (!values.meetingID) {
        errors.meetingID = 'Meeting ID is required';
    }
    if (!values.hostID) {
        errors.hostID = 'Host ID is required';
    }
    if (!values.hostName) {
        errors.hostName = 'Host Name is required';
    }
    if (!values.hostCode) {
        errors.hostCode = 'Host Code is required';
    }
    if (!values.guestID) {
        errors.guestID = 'Guest ID is required';
    }
    if (!values.guestName) {
        errors.guestName = 'Guest Name is required';
    }
    if (!values.guestCode) {
        errors.guestCode = 'Guest Code is required';
    }
    if (!values.studyID) {
        errors.studyID = 'Study ID is required';
    }
    if (!values.tenantID) {
        errors.tenantID = 'Tenant ID is required';
    }
    if (!values.subject) {
        errors.subject = 'Subject is Required';
    }
    // if (!values.createdBy) {
    //     errors.createdBy = 'Created By is Required';
    // }
    return errors;
};