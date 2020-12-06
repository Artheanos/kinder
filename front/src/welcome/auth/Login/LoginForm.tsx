import React, {FormEvent} from "react"
import {withRouter} from 'react-router-dom';
import LoginInput from "./LoginInput";
import FormProps from "../FormProps";

class LoginForm extends React.Component<FormProps> {
    emailInput: React.RefObject<LoginInput> = React.createRef();
    passwordInput: React.RefObject<LoginInput> = React.createRef();
    loginButton: React.RefObject<HTMLButtonElement> = React.createRef();
    warning: React.RefObject<HTMLDivElement> = React.createRef();

    constructor(props: any) {
        super(props);
        this.state = {
            loginErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showWarning = this.showWarning.bind(this);
        this.clearWarning = this.clearWarning.bind(this);
    }

    showWarning(message = '') {
        this.warning.current!.classList.add('expanded');
        this.warning.current!.innerText = message;
    }

    clearWarning() {
        this.warning.current!.classList.remove('expanded');
        this.warning.current!.innerText = '';
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!this.emailInput.current!.isValid()) {
            return;
        }

        if (!this.passwordInput.current!.isValid()) {
            return;
        }

        this.loginButton.current!.classList.add('loading');

        fetch('http://192.168.1.93:3080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.emailInput.current!.state.value,
                password: this.passwordInput.current!.state.value
            })
        }).then(response => {
                if (response.status === 200) {
                    response.text().then((resString) => {
                        const receivedData = JSON.parse(resString);
                        for (let key in receivedData) if (receivedData.hasOwnProperty(key)) {
                            localStorage.setItem(key, receivedData[key]);
                        }
                        this.props.history.push('/home');
                    }).catch((err) => {
                        alert('RESPONSE ERROR\n' + err);
                    })
                } else {
                    this.showWarning('Incorrect email or password');
                }
            }
        ).catch((err) => {
            alert("ERROR\n" + err);
        }).finally(() => {
            if (this.loginButton.current)
                this.loginButton.current.classList.remove('loading')
        });
    }

    render() {
        return (
            <div className="Login-form">
                <form onSubmit={this.handleSubmit} onClick={this.clearWarning}>
                    <h1 className="header">Login</h1>
                    <div className="form">
                        <LoginInput type="email" name="email" placeholder="email@website.com" ref={this.emailInput}/>
                        <LoginInput type="password" name="password" placeholder="*******" ref={this.passwordInput}/>
                    </div>
                    <div className="login-warning alert-warning" ref={this.warning}/>
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