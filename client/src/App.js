import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';

function KorumaliPanel() {
    const location = useLocation();
    if (location.state && location.state.yetkili) {
        return <MainPage adminModu={true} />;
    }
    return <Navigate to="/yonetim" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage adminModu={false} />} />
        <Route path="/yonetim" element={<LoginPage />} />
        <Route path="/panel" element={<KorumaliPanel />} />
      </Routes>
    </Router>
  );
}

export default App;