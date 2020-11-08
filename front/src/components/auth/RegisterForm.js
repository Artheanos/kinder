import React from "react";

export class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
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
        const {password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("passwords dont match")
        }

        console.log('wow!');
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
                                <label htmlFor="username">Username</label>
                                <input className="form-control" type="username" name="username" placeholder="Username"
                                       value={this.state.username}
                                       onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="email" name="email" placeholder="email@website.com"
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
                                <input className="form-control" type="confirmPassword" name="confirmPassword"
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
                        <button type="button" className="btn btn-outline-info float-right" onClick={this.props.switchForm}>
                            Login instead
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}