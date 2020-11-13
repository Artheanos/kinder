import React from "react";
import {capitalize} from "../../common/util";

class LoginInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: ''
        }

        this.input = React.createRef();

        this.name = this.props.name;
        this.label = this.props.label || capitalize(this.props.name);
        this.placeholder = this.props.placeholder || '';
        this.type = this.props.type || 'text';

        this.removeAlert = this.removeAlert.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    alert() {
        this.input.current.classList.remove('single-shake');
        setTimeout(() => {
            this.input.current.classList.add('alert-danger', 'single-shake');
            this.input.current.placeholder = '';
        }, 0);
    }

    removeAlert() {
        this.input.current.classList.remove('alert-danger', 'single-shake');
        this.input.current.placeholder = this.placeholder;
    }

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
                <label htmlFor={this.name}>{this.label}</label>
                <input className="form-control" type={this.type} name={this.name}
                       placeholder={this.placeholder}
                       ref={this.input}
                       value={this.state.value}
                       onChange={this.handleChange}
                       onFocus={this.removeAlert}
                />
            </div>
        );
    }
}

export default LoginInput;