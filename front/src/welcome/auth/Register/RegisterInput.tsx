import FormInput from "../FormInput";

/** Return a string describing what's wrong with the value or return falsy if it's okay */

type RegisterInputProps = {
    getInvalidMessage: (value: string) => any;
}

class RegisterInput extends FormInput<RegisterInputProps> {
    showWarning(str?: string): void {
        const classList = this.inputWrapper.current!.classList;

        if (classList.contains('expanded')) {
            classList.remove('single-shake');
            setTimeout(() => classList.add('single-shake'), 0);
        }
        if (str) {
            classList.add('expanded');
            this.warning.current!.innerText = str;
        }
    }

    clearWarning(): void {
        this.inputWrapper.current!.classList.remove('expanded', 'shake');
    }

    isValid(): boolean {
        let invalidMessage = this.props.getInvalidMessage(this.state.value);
        if (invalidMessage) {
            this.showWarning(invalidMessage);
            return false;
        }
        return true;
    }
}

export default RegisterInput;