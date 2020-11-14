import React from "react";
import {capitalize} from "../../common/util";

type FormInputProps = {
    name: string,
    label?: string,
    placeholder?: string,
    type?: string,
}

type FormInputState = FormInputProps & { value: string }

abstract class FormInput extends React.Component<FormInputProps, FormInputState> {
    readonly input: React.RefObject<any>;

    protected constructor(props: FormInputProps, context: React.Context<any>) {
        super(props, context);

        this.input = React.createRef();

        this.state = {
            name: props.name,
            label: props.label || capitalize(props.name),
            placeholder: props.placeholder || '',
            type: props.type || 'text',
            value: '',
        }

        this.alert = this.alert.bind(this);
        this.removeAlert = this.removeAlert.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    abstract alert(): void;

    abstract removeAlert(): void;

    handleChange() {
        this.setState({value: this.input.current.value})
    }

    handleSubmit() {
        if (!this.state.value.length) {
            this.alert();
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.state.name}>{this.state.label}</label>
                <input className="form-control" type={this.state.type} name={this.state.name}
                       placeholder={this.state.placeholder}
                       ref={this.input}
                       value={this.state.value}
                       onChange={this.handleChange}
                       onFocus={this.removeAlert}
                />
            </div>
        );
    }
}

export default FormInput;
