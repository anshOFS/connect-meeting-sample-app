import './App.css';
import Login from './app/pages/Login/login';
import MeetingRoom from './app/pages/MeetingRoom/meetingRoom';
import MeetingDetails from './app/pages/MeetingDetails/meetingDetails';
import MeetingForm from './app/pages/MeetingForm/meetingForm';
import {Routes, Route} from 'react-router-dom';
import history from './utils/history';

function App() {
  return (
    <Routes history={history}>
      <Route path="/" element={<Login />} />
      <Route path="/meetingCreation" element={<MeetingForm />} />
      <Route path="/meetingDetails" element={<MeetingDetails />} />
      <Route path="/meetingRoom" element={<MeetingRoom />} />
    </Routes>
  );
}

export default App;
