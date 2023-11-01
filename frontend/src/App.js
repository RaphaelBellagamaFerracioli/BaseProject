import './App.css';
import {BrowserRouter, Routes,Route, Navigate} from "react-router-dom"
import Home from '../src/pages/home/Home.js'

import Login from "../src/pages/Auth/Login"
import Register  from "../src/pages/Auth/Register"

//Components
import Navbar from './componnents/Navbar';
import Footer from './componnents/Footer';

function App() {
  return (
   <div className='App'>

     <BrowserRouter>
      <Navbar></Navbar>
     <div className='container'>
      <Routes>
        
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

     </Routes>
     
     </div>

     <Footer />
 
     </BrowserRouter>

   </div>
  );
}

export default App;
