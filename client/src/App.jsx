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
      <h1>Welcome to GymGear</h1>
      <p></p>
      <div>
        <Nav isLoggedIn={isLoggedIn} />
      </div>
      <br />
      <hr />
      <div>
        <Outlet context={{ isLoggedIn, setIsLoggedIn, sessionData }} />
      </div>
    </>
  )
}

export default App
