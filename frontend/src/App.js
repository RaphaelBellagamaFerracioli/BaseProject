import './App.css';
import {BrowserRouter, Routes,Route, Navigate} from "react-router-dom"

//pages
import Home from '../src/pages/home/Home.js'
import Login from "../src/pages/Auth/Login"
import Register  from "../src/pages/Auth/Register"
import EditProfile from "../src/pages/EditProfile/EditProfile"
import Profile from './pages/Profile/Profile';
import  Search  from './pages/Search/Search';
//hooks
import { useAuth } from "./hooks/useAuth";

//Components
import Navbar from './componnents/Navbar';
import Footer from './componnents/Footer';

import Photo from './pages/Photo/Photo';

function App() {

  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
   <div className='App'>

     <BrowserRouter>
      <Navbar></Navbar>
     <div className='container'>
      <Routes>
        
        <Route path='/' element={auth ?<Home/> :<Navigate to="/login"/>}></Route>

        <Route path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
              
              />
        
        <Route path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
              />

        <Route path='/login' element={!auth ?<Login/>:<Navigate to="/"/>}></Route>        

        <Route path='/register' element={!auth ?<Register/>:<Navigate to="/"/>}></Route>

        <Route path="/search" element={auth ? <Search /> : <Navigate to="/login" />}
              />

        <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to="/login" />}
              />

     </Routes>
     
     </div>

     <Footer />
 
     </BrowserRouter>

   </div>
  );
}

export default App;
