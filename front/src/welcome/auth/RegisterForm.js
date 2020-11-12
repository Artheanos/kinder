import React from "react";
import {withRouter} from "react-router-dom";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
            registrationErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {name, surname, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("passwords dont match")
        }

        fetch('http://192.168.1.93:3080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                password: password
            })
        }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    response.text().then((resString) => {
                        alert('You have successfully registered\nYou can now log in!');
                        this.props.switchForm();
                    }).catch((err) => {
                        console.log('RESPONSE ERROR\n' + err);
                    })
                } else if (response.status === 400) {
                    response.text().then((resString) => {
                        alert('Error\n' + resString);
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
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="base-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="header">Register</h1>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="name">First Name</label>
                                <input className="form-control" type="text" name="name" placeholder="John"
                                       value={this.state.name}
                                       onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Last Name</label>
                                <input className="form-control" type="text" name="surname" placeholder="Smith"
                                       value={this.state.surname}
                                       onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="email" name="email"
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
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input className="form-control" type="password" name="confirmPassword"
                                       placeholder="********"
                                       value={this.state.confirmPassword}
                                       onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                        <button type="button" className="btn btn-outline-info float-right"
                                onClick={this.props.switchForm}>
                            Login instead
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(RegisterForm);