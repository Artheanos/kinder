import React from "react";
import {withRouter} from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        };

        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.loginButton = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const {email, password} = this.state;

        if (!email.length) {
            this.emailInput.current.classList.add('alert-danger');
            this.emailInput.current.placeholder = '';
            return;
        }

        if (!password.length) {
            this.passwordInput.current.classList.add('alert-danger');
            this.passwordInput.current.placeholder = '';
            return;
        }

        this.loginButton.current.classList.add('loading');

        fetch('http://192.168.1.93:3080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
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

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="header">Login</h1>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email"
                                   ref={this.emailInput}
                                   placeholder="email@website.com"
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   onFocus={(e) => e.target.classList.remove('alert-danger')}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" placeholder="********"
                                   ref={this.passwordInput}
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   onFocus={(e) => e.target.classList.remove('alert-danger')}
                            />
                        </div>
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