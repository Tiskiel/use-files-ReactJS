
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import UploadPage from './pages/UploadPage';


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/home/Upload-files' element={<UploadPage />} />
      <Route path='/' element={<Navigate to='/home/Upload-files' />} />
    </Routes>
    </div>
  );
}

export default App;
