
import './App.css';
import Home from './pages/Home';
import { BrowserRouter ,Routes , Route } from 'react-router-dom';
import Nabvbar from './components/Nabvbar';
import Register from './pages/Register';
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { authCheck } from './redux/actions/userAction';
import User from './pages/Users';

function App() {

  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch() ;  

  useEffect(() => {
    dispatch(authCheck() )
  } , [dispatch])

  return (
    <BrowserRouter >
      <Nabvbar currentUser={currentUser} />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/users' exact element={<User />} />
      </Routes>


    </BrowserRouter>
  );
}

export default App ;
