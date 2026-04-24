import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Doctors from './pages/Doctors/Doctors';
import DoctorProfile from './pages/DoctorProfile/DoctorProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:slug" element={<DoctorProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
