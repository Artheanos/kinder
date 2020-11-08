import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewApp from './NewApp';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <div className="jumbotron">
            <h1>Kinder</h1>
        </div>
        <NewApp/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
