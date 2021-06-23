import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home';
import Game from './pages/Game';

const App: React.FC = () => {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/game' exact component={Game} />
    </Router>
  );
};

export default App;