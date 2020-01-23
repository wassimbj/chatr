import React from 'react';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <h1> Welcome to chatr </h1>
            <a href='/join'> Join </a>
            <a href='/login'> Login </a>
          </Route>
          <Route exact path='/login'><Login /></Route>
          <Route exact path='/join'> <h1>Join</h1> </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
