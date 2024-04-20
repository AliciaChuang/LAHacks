import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { AuthProvider } from './auth';

function App() {
  return (
    <AuthProvider>
  <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  
  );
}

export default App;
