import React from 'react'
import GamePage from './Components/GamePage'
import Lobby from './Components/Lobby'
import LoginPage from './Components/LoginPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/game" component={GamePage} />
        <Route path="/lobby" component={Lobby} />
      </Switch>
    </Router>
  )
}

export default App
