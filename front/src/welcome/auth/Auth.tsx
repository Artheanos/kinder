import '../../App.css';
import React from "react";

import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import {Redirect} from "react-router-dom";

class Auth extends React.Component<{}, { isLogInActive: boolean }> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            isLogInActive: true,
        }

        this.switchForm = this.switchForm.bind(this);
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
                        <RegisterForm switchForm={this.switchForm} {...this.props}/>
                }
            </div>
        );
    }
}

export default Auth;
