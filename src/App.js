import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Create from './component/Create';
import Read from './component/Read';
import Update from './component/Update';
import "./app.css";


const App = () => {
  return (
    <div className='container'>
    <BrowserRouter>
      <Routes>
        <Route exact  path="/" element={<Create/>}></Route>
        <Route exact  path="/read" element={<Read/>}></Route>
        <Route exact  path="/update" element={<Update/>}></Route>
      </Routes>
    </BrowserRouter>
    
   
    </div>
   
   
  );
}

export default App;