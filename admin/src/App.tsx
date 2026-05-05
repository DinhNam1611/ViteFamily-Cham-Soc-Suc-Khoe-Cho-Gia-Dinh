import { Component, type ErrorInfo, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import AdminLayout from './components/AdminLayout/AdminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Doctors from './pages/Doctors/Doctors';
import DoctorDetail from './pages/Doctors/DoctorDetail';
import Hospitals from './pages/Hospitals/Hospitals';
import Specialties from './pages/Specialties/Specialties';
import Appointments from './pages/Appointments/Appointments';
import Reviews from './pages/Reviews/Reviews';
import Notifications from './pages/Notifications/Notifications';

interface EBState { error: Error | null }

class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  state: EBState = { error: null };

  static getDerivedStateFromError(error: Error): EBState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AdminApp]', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <Result
          status="error"
          title="Lỗi render trang Admin"
          subTitle={this.state.error.message}
          extra={
            <Button type="primary" onClick={() => this.setState({ error: null })}>
              Thử lại
            </Button>
          }
        />
      );
    }
    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:id" element={<DoctorDetail />} />
          <Route path="hospitals" element={<Hospitals />} />
          <Route path="specialties" element={<Specialties />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
