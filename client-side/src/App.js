
import './App.css';
import Home from './pages/Home';
import { BrowserRouter ,Routes , Route } from 'react-router-dom';
import Nabvbar from './components/Nabvbar';
import Register from './pages/Register';
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter >
      <Nabvbar />
      <Routes>
        <Route path='/' exact component={Home} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/login' exact element={<Login />} />

      </Routes>


    </BrowserRouter>
  );
}

export default App ;
