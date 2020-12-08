import React, {FormEvent} from "react";
import RegisterInput from "../../welcome/auth/Register/RegisterInput";
import {KINDER_BACK_URL} from "../../common/util";

type Inputs = {
    [key: string]: React.RefObject<RegisterInput>
}

class EditEmail extends React.Component<{}, { inputs: Inputs }> {
    constructor(props: any, context: any) {
        super(props, context);
        let inputNames = ['email'];
        let inputs: Inputs = {};
        inputNames.forEach((key) => inputs[key] = React.createRef());
        this.state = {
            inputs
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`${KINDER_BACK_URL}/users/${localStorage.getItem('urlId')}/basic`).then(r => {
            r.text().then(value => {
                let data = JSON.parse(value);
                for (let i in this.state.inputs) if (this.state.inputs.hasOwnProperty(i)) {
                    this.state.inputs[i].current!.setState({value: data[i]});
                }
            })
        })
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
                <h2 className="header">Change your email</h2>
                <form onSubmit={this.handleSubmit}>
                    <RegisterInput ref={this.state.inputs.email} name="email" type="email"
                                   getInvalidMessage={(v: string) => null}
                    />
                    <input type="submit" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}

export default EditEmail;