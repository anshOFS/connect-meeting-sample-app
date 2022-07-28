import { all } from 'redux-saga/effects';

import { watchMeetingDetailsAsync } from "./meetingDetailsSaga";

export function* rootSaga() {
  yield all([
    watchMeetingDetailsAsync(),
  ])
}