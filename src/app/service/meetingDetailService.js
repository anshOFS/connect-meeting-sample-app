import axios from 'axios';

export class MeetingDetailsService {
    static createMeetingDetails = (data) => {
       return (async () => {
        try {
          console.log("SagaPayload:", data)
          const result = await axios.post('https://viedocqavideoconnectapi.azurewebsites.net/api/v1/meeting', 
          data
          );
          return result
        } catch(e) {}
      })()
    };

    static getMeetingDetails = () => {
      return (async () => {
       try {
         const result = await axios.get('https://viedocqavideoconnectapi.azurewebsites.net/api/v1/meeting')
         return result
       } catch(e) {}
     })()
   }
};

