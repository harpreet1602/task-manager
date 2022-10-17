import React, { useState } from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CheckEmail from './pages/CheckEmail';

export const CredentialsContext = React.createContext(null);

const App = () => {
  const [credentials,setCredentials] = useState(null);

  return (
    <div
    >
      <CredentialsContext.Provider value={[credentials,setCredentials]}>
      <Router>
        <Routes>
          <Route path = "/" element={<Home />}/>
          <Route path = "/login" element={<Login />}/>
          <Route path = "/register" element={<Register />}/>
          <Route path = "/checkemail" element={<CheckEmail />}/>
        </Routes>
      </Router>
      </CredentialsContext.Provider>
    </div>
  )
}

export default App