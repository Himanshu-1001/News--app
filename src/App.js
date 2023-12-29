import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar';


export default function App() {
  const [progress, setProgress]=useState(0);
  
  const apiKey=process.env.REACT_APP_API_KEY;
  
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path="/" element={<News api={apiKey} setProgress={setProgress} key="home" pageSize="6" country="in" category="general" />} />
          <Route path="/business" element={<News api={apiKey} setProgress={setProgress} key="business" pageSize="6" country="in" category="business" />} />
          <Route path="/entertainment" element={<News api={apiKey} setProgress={setProgress} key="entertainment" pageSize="6" country="in" category="entertainment" />} />
          <Route path="/general" element={<News api={apiKey} setProgress={setProgress} key="general" pageSize="6" country="in" category="general" />} />
          <Route path="/health" element={<News api={apiKey} setProgress={setProgress} key="health" pageSize="6" country="in" category="health" />} />
          <Route path="/science" element={<News api={apiKey} setProgress={setProgress} key="science" pageSize="6" country="in" category="science" />} />
          <Route path="/sports" element={<News api={apiKey} setProgress={setProgress} key="sports" pageSize="6" country="in" category="sports" />} />
          <Route path="/technology" element={<News api={apiKey} setProgress={setProgress} key="technology" pageSize="6" country="in" category="technology" />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

