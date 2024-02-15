import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
