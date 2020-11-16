import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./home/Home";
import Welcome from "./welcome/Welcome";


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/auth" component={Welcome}/>
            <Route path="/home" component={Home}/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(alert))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
