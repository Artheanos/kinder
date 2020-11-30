import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Welcome from "./welcome/Welcome";
import Main from "./main/Main";
import NotFound from "./common/NotFound";


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route exact path="/" component={Welcome}/>
                <Route path={["/home", "/profile", "/profile-private-form"]} component={Main}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </Router>
    </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(alert))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
