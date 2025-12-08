import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VoicePage from './pages/VoicePage';
import FilesPage from './pages/FilesPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import { useContext } from 'react';
import { UserContext } from './userContext.jsx';

function App() {
  const { user, loading } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route path="/filesUpload" element={user ? <FilesPage /> : <Navigate to="/loginpage" />} />
        <Route path="/loginpage" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/" element={user ? <VoicePage /> : <Navigate to="/loginpage" />} />
      </Routes>
    </Router>
  );
}

export default App;