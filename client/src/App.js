import React from 'react';
import {authContext} from './config/authContext';
import config from './config/config';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import Login from './components/Login';
import Home from './components/Home';

class App extends React.Component {

  constructor()
  {
    super();
    this.state = { isauth: false }
  }

  componentDidMount()
  {
    fetch(`${config.server_url}/isauth`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg == 'slm')
          this.setState({ isauth: true });
        else
          this.setState({ isauth: false });

      })
      .catch(err => console.log('APP_ISAUTH_ERROR: ', err))
  }

  render(){
    return (
      <div className="App">
        <authContext.Provider value={{ isauth: this.state.isauth }}>
          <Router>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/login'><Login /></Route>
              <Route exact path='/join'> <h1>Join</h1> </Route>
            </Switch>
          </Router>
        </authContext.Provider>
      </div>
    )
  }
}

export default App;
