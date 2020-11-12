import '../../App.css';
import React from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Redirect} from "react-router-dom";

class Auth extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogInActive: true,
        }

        this.switchForm = this.switchForm.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }

    switchForm() {
        this.setState({isLogInActive: !this.state.isLogInActive});
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <Redirect to="/home"/>
            )
        }

        const {isLogInActive} = this.state;
        return (
            <div className="Auth">
                {
                    isLogInActive ?
                        <LoginForm switchForm={this.switchForm} {...this.props}/>
                        :
                        <RegisterForm switchForm={this.switchForm}/>
                }
            </div>
        );
    }
}

export default Auth;
