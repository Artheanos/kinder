import React from "react";
import {capitalize} from "../../common/util";

type FormInputProps = {
    name: string,
    label?: string,
    placeholder?: string,
    type?: string,
}

type FormInputState = FormInputProps & { value: string }

abstract class FormInput<T = {}> extends React.Component<T & FormInputProps, FormInputState> {
    readonly input: React.RefObject<HTMLInputElement> = React.createRef();

    protected constructor(props: T & FormInputProps, context: React.Context<any>) {
        super(props, context);

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
        this.isValid = this.isValid.bind(this);
    }

    abstract alert(): void;

    abstract removeAlert(): void;

    handleChange() {
        this.setState({value: this.input.current!.value})
    }

    isValid() {
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
                <div className="input-wrapper">
                    <input className="form-control" type={this.state.type} name={this.state.name}
                           placeholder={this.state.placeholder}
                           ref={this.input}
                           value={this.state.value}
                           onChange={this.handleChange}
                           onFocus={this.removeAlert}
                    />
                </div>
            </div>
        );
    }
}

export default FormInput;
