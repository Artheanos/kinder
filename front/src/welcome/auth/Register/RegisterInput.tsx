import FormInput from "../FormInput";

/** Return a string describing what's wrong with the value or return falsy if it's okay */
type getInvalidMessageFunction = (value: string) => any;


class RegisterInput extends FormInput<{ getInvalidMessage: getInvalidMessageFunction }> {
    alert(): void {
    }

    removeAlert(): void {
    }

    isValid(): boolean {
        let invalidMessage = this.props.getInvalidMessage(this.state.value);
        if (invalidMessage) {
            alert(invalidMessage);
            // TODO replace alert with some nice warning
            return false;
        }
        return true;
    }
}

export default RegisterInput;