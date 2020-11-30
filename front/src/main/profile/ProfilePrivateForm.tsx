import React, {FormEvent} from "react";
import RegisterInput from "../../welcome/auth/Register/RegisterInput";

type Inputs = {
    [key: string]: React.RefObject<RegisterInput>
}

class ProfilePrivateForm extends React.Component<{}, { inputs: Inputs }> {
    constructor(props: any, context: any) {
        super(props, context);
        let inputNames = ['name', 'surname'];
        let inputs: Inputs = {};
        inputNames.forEach((key) => inputs[key] = React.createRef());
        this.state = {
            inputs: inputs
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`http://192.168.1.93:3080/users/${localStorage.getItem('userId')}/basic`).then(r => {
            r.text().then(value => {
                let data = JSON.parse(value);
                for (let i in data) if (data.hasOwnProperty(i) && i in this.state.inputs) {
                    this.state.inputs[i].current!.setState({value: data[i]})
                }
            })
        })
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();

        for (let inputComponent of Object.values(this.state.inputs)) if (inputComponent.current) {
            if (!inputComponent.current.isValid())
                return;
        }

        let body: { [key: string]: string } = {};
        for (let i in this.state.inputs) if (this.state.inputs.hasOwnProperty(i)) {
            body[i] = this.state.inputs[i].current!.state.value;
        }
        alert("I want to send : (\n" + JSON.stringify(body));
    }

    render() {
        return (
            <div className="Auth">
                <h2 className="header">Change your info</h2>
                <form onSubmit={this.handleSubmit}>
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

                    {/*<RegisterInput ref={this.state.inputs.password} name="password" type="password"*/}
                    {/*               getInvalidMessage={(v: string) => {*/}
                    {/*                   let rules: { [key: string]: string } = {*/}
                    {/*                       ".{8,}": "This password is shorter than 8 characters",*/}
                    {/*                       "^.{0,100}$": "This password is longer than 100 characters",*/}
                    {/*                       "[a-z]": "This password doesn't contain a lowercase",*/}
                    {/*                       "[A-Z]": "This password doesn't contain a uppercase",*/}
                    {/*                       "\\d": "This password doesn't contain a digit"*/}
                    {/*                   }*/}

                    {/*                   for (let regex in rules) {*/}
                    {/*                       if (v.match(regex) === null) {*/}
                    {/*                           return rules[regex];*/}
                    {/*                       }*/}
                    {/*                   }*/}
                    {/*               }}*/}
                    {/*/>*/}

                    {/*<RegisterInput ref={this.state.inputs.confirmPassword} name="confirmPassword"*/}
                    {/*               label="Confirm Password" type="password"*/}
                    {/*               getInvalidMessage={(v: string) => {*/}
                    {/*                   if (v !== this.state.inputs.password.current!.state.value)*/}
                    {/*                       return "Two passwords must match!"*/}
                    {/*               }}*/}
                    {/*/>*/}
                    <input type="submit" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}

export default ProfilePrivateForm;