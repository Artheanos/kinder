import './App.css';
import React from "react";

import {LoginForm, RegisterForm} from './components/auth';
import {Redirect} from "react-router-dom";

class Home extends React.Component {
    render() {
        if (!localStorage.getItem('token')) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <div className="home-component">
                <div className="jumbotron">
                    <h1 className="display-4">You have successfully logged in
                        as <b>{localStorage.getItem('username')}</b>
                    </h1>
                </div>
                <button className="btn btn-warning" onClick={() => {
                    localStorage.clear();
                    this.props.history.push('/');
                }}>Log Out
                </button>
            </div>
        )
    }
}

export default Home;
