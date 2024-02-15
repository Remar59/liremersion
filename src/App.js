import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cat" element={<AudioPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
