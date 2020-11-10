import React from "react";
import {withRouter, Redirect} from "react-router-dom";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        const {email, password} = this.state;

        fetch('http://192.168.1.93:3080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
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
        })

        e.preventDefault();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="header">Login</h1>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="text" name="email"
                                       placeholder="email@website.com"
                                       value={this.state.email}
                                       onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" name="password" placeholder="********"
                                       value={this.state.password}
                                       onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="submit" className="btn btn-primary">
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