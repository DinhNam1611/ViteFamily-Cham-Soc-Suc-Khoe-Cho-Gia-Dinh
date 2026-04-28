import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Doctors from './pages/Doctors/Doctors';
import DoctorProfile from './pages/DoctorProfile/DoctorProfile';
import CustomerGuide from './pages/CustomerGuide/CustomerGuide';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AppointmentBooking from './pages/Contact/AppointmentBooking';
import AskExpert from './pages/Contact/AskExpert';
import WorkWithUs from './pages/Contact/WorkWithUs';
import Specialties from './pages/Specialties/Specialties';
import SpecialtyDetail from './pages/SpecialtyDetail/SpecialtyDetail';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/specialties/:slug" element={<SpecialtyDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:slug" element={<DoctorProfile />} />
          <Route path="/help" element={<CustomerGuide />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Contact — chỉ đặt lịch cần đăng nhập */}
          <Route
            path="/contact/dat-lich-kham"
            element={
              <ProtectedRoute>
                <AppointmentBooking />
              </ProtectedRoute>
            }
          />
          <Route path="/contact/hoi-chuyen-gia" element={<AskExpert />} />
          <Route path="/contact/lam-viec-tai-vf" element={<WorkWithUs />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
