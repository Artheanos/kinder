import React from "react";

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
        console.log(email, password);
        e.preventDefault();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="base-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="header">Login</h1>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="email" name="email" placeholder="Email"
                                       value={this.state.email}
                                       onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" name="password" placeholder="password"
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
                        <button type="button" className="btn btn-outline-info float-right" onClick={this.props.switchForm}>
                            Register instead
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}