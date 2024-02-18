import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import AudioPlayer from './components/AudioPlayer';
import Signup from './components/Signup';
import Login from './components/login';
import { tracks } from '../src/data/tracks';


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/tracks/:id" element={<AudioPlayer tracks={tracks} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
