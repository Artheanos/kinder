import React, {FormEvent} from "react";
import RegisterInput from "../../welcome/auth/Register/RegisterInput";
import {KINDER_BACK_URL} from "../../common/util";
import LoginInput from "../../welcome/auth/Login/LoginInput";

type Inputs = {
    [key: string]: React.RefObject<RegisterInput>
}

class EditEmail extends React.Component<{}, { inputs: Inputs }> {
    constructor(props: any, context: any) {
        super(props, context);
        let inputNames = ['email', 'password'];
        let inputs: Inputs = {};
        inputNames.forEach((key) => inputs[key] = React.createRef());
        this.state = {
            inputs
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.state.inputs['email'].current!.setState({value: localStorage.getItem('email')!});
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

        console.log('SENDING', body);

        fetch(`${KINDER_BACK_URL}/user/email/edit`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => response.json())
            .then((r: any) => {
                alert("Changes have been saved");
                localStorage.setItem('email', body['email'])
                localStorage.setItem('token', r.token)
                console.log(r)
            }).catch(reason => {
                alert(reason)
        })
    }

    render() {
        return (
            <div className="PrivateForm Auth">
                <h2 className="header">Change your email</h2>
                <form onSubmit={this.handleSubmit}>
                    <RegisterInput ref={this.state.inputs.email} name="email" type="email"
                                   getInvalidMessage={(v: string) => null}
                    />
                    <LoginInput type="password" label={"Your password"} name="password" placeholder="*******"
                                ref={this.state.inputs.password}/>
                    <input type="submit" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}

export default EditEmail;