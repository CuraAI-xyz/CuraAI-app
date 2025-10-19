import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VoicePage from './pages/VoicePage';
import FilesPage from './pages/FilesPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/filesUpload" element={<FilesPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/" element={<VoicePage />} />
        </Routes>
    </Router>
  );
}

export default App;