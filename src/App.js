import { BrowserRouter, Route, Routes } from "react-router-dom";
import {  Error, Landing, Register } from "./pages/index";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { SharedLayout,Stats,Alljobs,Profile,AddJob } from "./pages/dashboard/index";
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout/>}>
          <Route index element={<Stats/>}/>
          <Route path="all-jobs" element={<Alljobs/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path='add-job' element={<AddJob/>}/>
        </Route>
        
        <Route path='landing' element={<Landing/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      <ToastContainer position="top-center"/>
    </BrowserRouter>
  );
}


export default App;
