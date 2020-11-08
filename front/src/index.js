import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route} from "react-router-dom";
import Auth from './Auth';
import Home from "./Home";
import TopBar from "./components/TopBar";


ReactDOM.render(
    <React.StrictMode>
        <TopBar/>
        <Router>
            <Route exact path="/" component={Auth}/>
            <Route path="/home" component={Home}/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
