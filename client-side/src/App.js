
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
import Profile from './components/Profile'
import EditeProfile from './pages/EditeProfile';

function App() {

  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch() ;  

  useEffect(() => {
    dispatch(authCheck() )
  } , [dispatch])

  return (
    <BrowserRouter >
      <Nabvbar currentUser={currentUser && currentUser} />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/users' exact element={<User />} />
        <Route path='/user/:userId' exact element={<Profile />} />
        <Route path='/edite/:userId' exact element={<EditeProfile />} />
      </Routes>


    </BrowserRouter>
  );
}

export default App ;
