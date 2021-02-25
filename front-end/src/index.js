import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import GlobalLayout from './layouts/GlobalLayout';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/sign-up" component={SignUp} />
          <Route path="/acceuil" component={GlobalLayout} />
          <Redirect from="/" to="/login"/>
        </Switch>
      </Router>
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
