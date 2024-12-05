import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';
import { useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <Outlet context={setIsLoggedIn} />
      </div>
    </>
  )
}

export default App
