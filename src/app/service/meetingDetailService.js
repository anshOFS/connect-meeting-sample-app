import axios from 'axios';

export class MeetingDetailsService {
    static createMeetingDetails = (data) => {
       return (async () => {
        try {
          const result = await axios.post('https://azurevideomeetapi.azurewebsites.net/api/v1/meetingstore', data.payload)
          return result
        } catch(e) {}
      })()
    };

    static getMeetingDetails = () => {
      return (async () => {
       try {
         const result = await axios.get('https://azurevideomeetapi.azurewebsites.net/api/v1/meetingstore')
         return result
       } catch(e) {}
     })()
   }
};

