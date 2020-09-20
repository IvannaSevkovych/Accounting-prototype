import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.sass';
// Importing components
import { Home } from './components/home';
import { Form } from './components/form';
import { Login } from './components/login';


function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}  />
          <Route path="/form" component={Form} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
