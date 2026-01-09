import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VoicePage from './pages/VoicePage';
import FilesPage from './pages/FilesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorRegister from './pages/DoctorRegister';
import { useContext } from 'react';
import { UserContext } from './userContext.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import DoctorLoginPage from './pages/DoctorLoginPage.jsx';

function App() {
  const { user, loading } = useContext(UserContext);
  const role = user?.user_metadata?.role;

  return (
    <Router>
      <Routes>
        <Route path="/filesUpload" element={user ? <FilesPage /> : <Navigate to="/loginpage" />} />
        <Route path="/loginpage" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/doctor" element={<DoctorRegister />} />
        <Route path="/doctorDashboard" element={user ? <DoctorDashboard /> : <Navigate to="/doctorLogin" />} />
        <Route path="/doctorLogin" element={<DoctorLoginPage />} />
        <Route
          path="/"
          element={
            user
              ? role === "doctor"
                ? <Navigate to="/doctorDashboard" />
                : <VoicePage />
              : <Navigate to="/loginpage" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;