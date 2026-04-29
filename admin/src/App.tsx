import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout/AdminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Doctors from './pages/Doctors/Doctors';
import Hospitals from './pages/Hospitals/Hospitals';
import Specialties from './pages/Specialties/Specialties';
import Appointments from './pages/Appointments/Appointments';
import Reviews from './pages/Reviews/Reviews';
import Notifications from './pages/Notifications/Notifications';
import Statistics from './pages/Statistics/Statistics';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
