import './App.css';
import React from "react";

import {LoginForm, RegisterForm} from './components/index';

class NewApp extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogInActive: true,
        }

        this.switchForm = this.switchForm.bind(this);
    }

    componentDidMount() {

    }

    switchForm() {
        this.setState({isLogInActive: !this.state.isLogInActive});
    }

    render() {
        const {isLogInActive} = this.state;
        return (
            <div className="App">
                {
                    isLogInActive ?
                        <LoginForm switchForm={this.switchForm}/>
                        :
                        <RegisterForm switchForm={this.switchForm}/>
                }
            </div>
        );
    }
}

export default NewApp;
