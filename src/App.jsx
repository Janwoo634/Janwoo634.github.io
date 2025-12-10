import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RightColumn from './components/RightColumn';
import HomePage from './pages/HomePage';
import PicturesPage from './pages/PicturesPage';
import DocumentsPage from './pages/DocumentsPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-layout">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pictures" element={<PicturesPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
        </Routes>
      </div>
      <RightColumn />
    </div>
  );
}

export default App;

