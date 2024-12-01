import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

function App() {

  return (
    <>
      <h1>Welcome to GymGear</h1>
      <p></p>
      <div>
        <Nav />
      </div>
      <br />
      <hr />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
