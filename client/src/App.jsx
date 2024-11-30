import { Outlet } from 'react-router-dom';
import Sidebar from './ui/Sidebar'

function App() {

  return (
    <>
      <h1>App.jsx parent page</h1>
      <p>This is the parent page</p>
      <div>
        <Sidebar />
      </div>
      <br />
      <hr />
      <div>
        <p>This is the child page</p>
        <Outlet />
      </div>
    </>
  )
}

export default App
