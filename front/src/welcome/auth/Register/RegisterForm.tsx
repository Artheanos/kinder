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

    inputs: Array<React.RefObject<RegisterInput>> = [this.nameInput, this.surnameInput, this.emailInput, this.passwordInput, this.confirmPasswordInput];

    state = {
        registrationErrors: ''
    }

    constructor(props: FormProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();

        for (let inputComponent of this.inputs) {
            if (inputComponent.current)
                if (!inputComponent.current.isValid()) {
                    return;
                }
        }

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

                            <RegisterInput ref={this.nameInput} name="name" placeholder="John"
                                           getInvalidMessage={(v: string) => {
                                               if (v.length === 0 || v.match(/\S/) === null) {
                                                   return "Name is empty";
                                               }
                                               if (v.length > 100) {
                                                   return "Name is too long";
                                               }
                                           }}
                            />

                            <RegisterInput ref={this.surnameInput} name="surname" label="Last Name" placeholder="Smith"
                                           getInvalidMessage={(v: string) => {
                                               if (v.length === 0 || v.match(/\S/) === null) {
                                                   return "Last name is empty";
                                               }
                                               if (v.length > 100) {
                                                   return "Last name is too long";
                                               }
                                           }}
                            />

                            <RegisterInput ref={this.emailInput} name="email" type="email"
                                           placeholder="email@website.com"
                                           getInvalidMessage={(v: string) => null}
                            />

                            <RegisterInput ref={this.passwordInput} name="password" type="password"
                                           placeholder="********"
                                           getInvalidMessage={(v: string) => {
                                               let rules: { [key: string]: string } = {
                                                   "[a-z]": "Password must contain at least one lowercase",
                                                   "[A-Z]": "Password must contain at least one uppercase",
                                                   "\\d": "Password must contain at least one digit"
                                               }

                                               for (let regex in rules) {
                                                   if (v.match(regex) === null) {
                                                       return rules[regex];
                                                   }
                                               }
                                           }}
                            />

                            <RegisterInput ref={this.confirmPasswordInput} name="confirmPassword"
                                           label="Confirm Password" type="password" placeholder="*******"
                                           getInvalidMessage={(v: string) => {
                                               if (v !== this.passwordInput.current!.state.value)
                                                   return "Two passwords must match!"
                                           }}
                            />
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