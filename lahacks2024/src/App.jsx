import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { AuthProvider } from './auth';
import { EventMarkersProvider } from './Components/EventMarkers';

function App() {
  return (
    <AuthProvider>
  <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={
            <EventMarkersProvider>
              <Home/>
            </EventMarkersProvider>}
          />
      </Routes>
    </Router>
    </AuthProvider>
  
  );
}

export default App;
