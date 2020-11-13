import React from "react";
import {withRouter} from "react-router-dom";
import LoginInput from "./LoginInput";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginErrors: ""
        };

        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.loginButton = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.emailInput.current.handleSubmit()) {
            return;
        }

        if (!this.passwordInput.current.handleSubmit()) {
            return;
        }

        this.loginButton.current.classList.add('loading');

        fetch('http://192.168.1.93:3080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.emailInput.current.state.value,
                password: this.passwordInput.current.state.value
            })
        }).then(response => {
                if (response.status === 200) {
                    response.text().then((resString) => {
                        const data = JSON.parse(resString);
                        for (let key in data) if (data.hasOwnProperty(key))
                            localStorage.setItem(key, data[key]);
                        this.props.history.push('/home');
                    }).catch((err) => {
                        console.log('RESPONSE ERROR\n' + err);
                    })
                } else {
                    alert("Wrong credentials");
                }
            }
        ).catch((err) => {
            alert("ERROR\n" + err);
        }).finally(() => this.loginButton.current.classList.remove('loading'));
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="header">Login</h1>
                    <div className="form">
                        <LoginInput type="email" name="email" placeholder="email@website.com" ref={this.emailInput}/>
                        <LoginInput type="password" name="password" placeholder="*******" ref={this.passwordInput}/>
                    </div>
                    <div className="footer">
                        <button type="submit" className="btn btn-primary" ref={this.loginButton}>
                            Login
                        </button>
                        <button type="button" className="btn btn-outline-info float-right"
                                onClick={this.props.switchForm}>
                            Register instead
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);