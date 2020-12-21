import React from "react";
import {String_capitalize} from "../../common/util";

type FormInputProps = {
    name: string,
    label?: string,
    placeholder?: string,
    type?: string,
    initialValue?: string,
}

type FormInputState = FormInputProps & { value: string }

abstract class FormInput<T = {}> extends React.Component<T & FormInputProps, FormInputState> {
    readonly input: React.RefObject<HTMLInputElement> = React.createRef();
    readonly inputWrapper: React.RefObject<HTMLDivElement> = React.createRef();
    readonly warning: React.RefObject<HTMLParagraphElement> = React.createRef();

    constructor(props: T & FormInputProps, context: any) {
        super(props, context);

        this.state = {
            name: props.name,
            label: props.label || String_capitalize(props.name),
            placeholder: props.placeholder || '',
            value: props.initialValue || '',
            type: props.type || 'text'
        }

        this.showWarning = this.showWarning.bind(this);
        this.clearWarning = this.clearWarning.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    abstract showWarning(): void;

    abstract clearWarning(): void;

    abstract isValid(): boolean;

    handleChange() {
        this.clearWarning();
        this.setState({value: this.input.current!.value})
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.state.name}>{this.state.label}</label>
                <div className="input-wrapper" ref={this.inputWrapper}>
                    <input className="form-control" type={this.state.type} name={this.state.name}
                           placeholder={this.state.placeholder}
                           ref={this.input}
                           value={this.state.value}
                           onChange={this.handleChange}
                    />
                    <div className="warning alert-warning">
                        <p ref={this.warning}>Wrong!</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormInput;
