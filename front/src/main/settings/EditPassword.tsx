import React, {FormEvent} from "react";
import RegisterInput from "../../welcome/auth/Register/RegisterInput";
import {KINDER_BACK_URL} from "../../common/util";

type Inputs = {
    [key: string]: React.RefObject<RegisterInput>
}

class EditPassword extends React.Component<{}, { inputs: Inputs }> {
    constructor(props: any, context: any) {
        super(props, context);
        let inputNames = ['password'];
        let inputs: Inputs = {};
        inputNames.forEach((key) => inputs[key] = React.createRef());
        this.state = {
            inputs
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();

        for (let i of Object.values(this.state.inputs)) if (i.current) {
            if (!i.current.isValid())
                return;
        }

        let body: { [key: string]: string } = {};

        for (let i in this.state.inputs) if (this.state.inputs.hasOwnProperty(i)) {
            body[i] = this.state.inputs[i].current!.state.value;
        }

        fetch(`${KINDER_BACK_URL}/user/fullname/edit`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((r) => {
            if (r.status === 200) {
                alert("Changes have been saved")
            } else {
                alert("ERROR " + r.status)
            }
        }).catch(reason => alert("ERROR\n" + reason))
    }

    render() {
        return (
            <div className="PrivateForm Auth">
                <h2 className="header">Change your password</h2>
                <form onSubmit={this.handleSubmit}>
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
                    <input type="submit" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}

export default EditPassword;