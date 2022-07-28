import { MEETING_DETAILS } from '../../config/constants';
import { API } from './base.service';


export const createMeetingDetails = (data) => {
          return API.post(`${MEETING_DETAILS.service_api}`, data);
  };

export const getMeetingDetails = () => {
        return API.get(`${MEETING_DETAILS.service_api}`)
   }


