import React from 'react';
import {authContext} from './config/authContext';
import config from './config/config';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import Login from './views/Login';
import Home from './views/Home';
import Inbox from './views/Inbox';
import io from 'socket.io-client';

class App extends React.Component {

  constructor()
  {
    super();
    this.state = { isauth: null, userid: null }

    this.socket = io.connect(`${config.server_url}`, { transports: ['websocket'] }, () => {
      console.log('Client connected to the server')
    });
  }

  componentDidMount()
  {
    // get user status, (authenticated or not)
    this.setState({isauth: 'fetching'})
    fetch(`${config.server_url}/isauth`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg == 'slm')
          this.setState({ isauth: true, userid: data.id });
        else
          this.setState({ isauth: false });
      })
      .catch(err => {
        // window.location.reload();
        console.log('APP_ERROR: ', err)
        alert('Something crashed... please refresh')
      })
  }

  render(){
    return (
      <div className="App">
        <authContext.Provider value={{ isauth: this.state.isauth, userid: this.state.userid }}>
            <Router>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/join'> <h1>Join</h1> </Route>
                <Route exact path='/messages/:chatwith' component={(props) => <Inbox {...props} io={this.socket} />} />
              </Switch>
            </Router>
        </authContext.Provider>
      </div>
    )
  }
}

export default App;
