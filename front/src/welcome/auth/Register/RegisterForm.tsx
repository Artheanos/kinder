import React from "react";
import {withRouter} from "react-router-dom";
import FormProps from "../FormProps";
import RegisterInput from "./RegisterInput";


type Inputs = {
    [key: string]: React.RefObject<RegisterInput>
}

class RegisterForm extends React.Component<FormProps, { inputs: Inputs, registrationErrors: string }> {

    constructor(props: FormProps) {
        super(props);

        let inputNames = ['name', 'surname', 'email', 'password', 'confirmPassword'];
        let inputs: Inputs = {};
        inputNames.forEach((key) => inputs[key] = React.createRef());

        this.state = {
            registrationErrors: '',
            inputs: inputs
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        for (let inputComponent of Object.values(this.state.inputs)) if (inputComponent.current) {
            if (!inputComponent.current.isValid())
                return;
        }

        let body: { [key: string]: string } = {};
        for (const [key, value] of Object.entries(this.state.inputs)) {
            body[key] = value.current!.state.value;
        }

        fetch('http://89.68.129.242:3080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    response.text().then((resString) => {
                        alert('You have successfully registered\nYou can now log in!');
                        this.props.switchForm();
                    }).catch((err) => {
                        alert('RESPONSE ERROR\n' + err);
                    })
                } else if (response.status === 400) {
                    response.text().then((resString) => {
                        let errorMessage = JSON.parse(resString).message;
                        if (errorMessage === "Email already in use!") {
                            this.state.inputs.email.current!.input.current!.focus();
                            this.state.inputs.email.current!.showWarning(errorMessage);
                        } else {
                            alert('Error\n' + errorMessage);
                        }
                    }).catch((err) => {
                        alert('RESPONSE ERROR\n' + err);
                    })
                } else if (response.status === 401) {
                    alert("IDK");
                } else {
                    alert("Wrong credentials");
                }
            }
        ).catch((err) => {
            alert("ERROR\n" + err);
        })
    }

    render() {
        return (
            <div className="base-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="header">Register</h1>
                    <div className="content">
                        <div className="form">
                            <RegisterInput ref={this.state.inputs.name} name="name"
                                           getInvalidMessage={(v: string) => {
                                               if (v.length === 0 || v.match(/\S/) === null) {
                                                   return "Name is empty";
                                               }
                                               if (v.length > 100) {
                                                   return "Name is too long";
                                               }
                                           }}
                            />

                            <RegisterInput ref={this.state.inputs.surname} name="surname" label="Last Name"
                                           getInvalidMessage={(v: string) => {
                                               if (v.length === 0 || v.match(/\S/) === null) {
                                                   return "Last name is empty";
                                               }
                                               if (v.length > 100) {
                                                   return "Last name is too long";
                                               }
                                           }}
                            />

                            <RegisterInput ref={this.state.inputs.email} name="email" type="email"
                                           getInvalidMessage={(v: string) => null}
                            />

                            <RegisterInput ref={this.state.inputs.password} name="password" type="password"
                                           getInvalidMessage={(v: string) => {
                                               let rules: { [key: string]: string } = {
                                                   ".{8,}": "This password is shorter than 8 characters",
                                                   "^.{0,100}$": "This password is longer than 100 characters",
                                                   "[a-z]": "This password doesn't contain a lowercase",
                                                   "[A-Z]": "This password doesn't contain a uppercase",
                                                   "\\d": "This password doesn't contain a digit"
                                               }

                                               for (let regex in rules) {
                                                   if (v.match(regex) === null) {
                                                       return rules[regex];
                                                   }
                                               }
                                           }}
                            />

                            <RegisterInput ref={this.state.inputs.confirmPassword} name="confirmPassword"
                                           label="Confirm Password" type="password"
                                           getInvalidMessage={(v: string) => {
                                               if (v !== this.state.inputs.password.current!.state.value)
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