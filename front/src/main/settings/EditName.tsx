import React, {FormEvent} from "react";
import RegisterInput from "../../welcome/auth/Register/RegisterInput";
import {KINDER_BACK_URL} from "../../common/util";

type Inputs = {
    [key: string]: React.RefObject<RegisterInput>
}

class EditName extends React.Component<{}, { inputs: Inputs }> {
    constructor(props: any, context: any) {
        super(props, context);
        let inputNames = ['name', 'surname'];
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
                <h2 className="header">Change your name</h2>
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
                    <input type="submit" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}

export default EditName;