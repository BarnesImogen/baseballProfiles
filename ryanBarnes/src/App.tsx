import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfileView from './pages/ProfileView';
import ProfileEdit from './pages/ProfileEdit';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfileView />} />
        <Route path="/profile/:id/edit" element={<ProfileEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
