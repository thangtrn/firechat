import { Routes, Route } from 'react-router-dom'
import Chat from './components/Chat';
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
        <Routes>
            <Route path='/' element={
              <PrivateRoute>
                <Chat/>
              </PrivateRoute>
            } />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    </>
  );
}

export default App;
