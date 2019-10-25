import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-image/image.css'
import './App.css';
import Home from './components/login';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import Dashboard from './components/user'
import Signup from './components/signup'
const newHistory = createBrowserHistory();

function Rotutes() {
  return (
    <Router history={newHistory}>
      <div>
        <Switch>
          <Route path="/user" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  )
}


function App() {
  return (
    <Rotutes />
  );
}
export default App;
