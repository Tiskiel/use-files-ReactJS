
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import UploadPage from './pages/UploadPage';
import ViewDataChoice from './pages/ViewDataChoice';
import ViewFiles from './pages/ViewFiles';


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/home/upload-files' element={<UploadPage />} />
      <Route path='/home/upload-files/view-files' element={<ViewFiles />} />
      <Route path='/home/upload-files/view-data' element={<ViewDataChoice />} />
      <Route path='/' element={<Navigate to='/home/Upload-files' />} />
    </Routes>
    </div>
  );
}

export default App;
