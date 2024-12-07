import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [sessionData, setSessionData] = useState();
  const apiHost = import.meta.env.VITE_APP_HOST;
  const getSessionUrl = apiHost + '/api/customers/getsession';

  useEffect(() => {
    async function getSession() {
      const response = await fetch(getSessionUrl, {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
        setIsLoggedIn(true);
      } else {
        setSessionData(null);
        setIsLoggedIn(false);
      }
    }
    getSession();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#04c17c" }}>
        <div style={{ paddingRight: "30px" }}><Nav isLoggedIn={isLoggedIn} /></div>
        <h1 style={{ fontFamily: "Calibri", textAlign: "center", paddingBottom: "10px", color: "white", fontSize: "75px" }}>GymGear</h1>
        <br />
      </div>

      <div style={{ backgroundColor: "#303232", minHeight: "100vh", paddingLeft: "10px" }}>
        <Outlet context={{ isLoggedIn, setIsLoggedIn, sessionData }} />
      </div>
    </>
  )
}

export default App
