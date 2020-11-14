import React, {ChangeEvent, FormEvent} from "react";
import {withRouter} from "react-router-dom";
import FormProps from "../FormProps";
import RegisterInput from "./RegisterInput";

class RegisterForm extends React.Component<FormProps, { registrationErrors: string }> {

    nameInput: React.RefObject<RegisterInput> = React.createRef();
    surnameInput: React.RefObject<RegisterInput> = React.createRef();
    emailInput: React.RefObject<RegisterInput> = React.createRef();
    passwordInput: React.RefObject<RegisterInput> = React.createRef();
    confirmPasswordInput: React.RefObject<RegisterInput> = React.createRef();

    state = {
        registrationErrors: ''
    }

    constructor(props: FormProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: FormEvent) {
        // TODO Make this work
        // e.preventDefault();
        //
        // if (this.passwordInput.current)
        // const password = this.passwordInput.current.state.value;
        //
        // if (password !== confirmPassword) {
        //     alert("passwords dont match")
        // }
        //
        // fetch('http://192.168.1.93:3080/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: name,
        //         surname: surname,
        //         email: email,
        //         password: password
        //     })
        // }).then(response => {
        //         if (response.status === 200 || response.status === 201) {
        //             response.text().then((resString) => {
        //                 alert('You have successfully registered\nYou can now log in!');
        //                 this.props.switchForm();
        //             }).catch((err) => {
        //                 console.log('RESPONSE ERROR\n' + err);
        //             })
        //         } else if (response.status === 400) {
        //             response.text().then((resString) => {
        //                 alert('Error\n' + resString);
        //             }).catch((err) => {
        //                 console.log('RESPONSE ERROR\n' + err);
        //             })
        //         } else {
        //             alert("Wrong credentials");
        //         }
        //     }
        // ).catch((err) => {
        //     alert("ERROR\n" + err);
        // })
    }

    render() {
        return (
            <div className="base-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="header">Register</h1>
                    <div className="content">
                        <div className="form">

                            <RegisterInput ref={this.nameInput} name="name" placeholder="John"/>

                            <RegisterInput ref={this.surnameInput} name="surname" label="Last Name"
                                           placeholder="Smith"/>

                            <RegisterInput ref={this.emailInput} name="email" type="email"
                                           placeholder="email@website.com"/>

                            <RegisterInput ref={this.passwordInput} name="password" type="password"
                                           placeholder="********"/>

                            <RegisterInput ref={this.confirmPasswordInput} name="confirmPassword"
                                           label="Confirm Password"
                                           type="password" placeholder="*******"/>
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