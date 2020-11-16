import FormInput from "../FormInput";

class LoginInput extends FormInput {

    showWarning() {
        this.input.current!.classList.remove('single-shake');
        setTimeout(() => {
            this.input.current!.classList.add('alert-danger', 'single-shake');
            this.input.current!.placeholder = '';
        }, 0);
    }

    clearWarning() {
        this.input.current!.classList.remove('alert-danger', 'single-shake');
        this.input.current!.placeholder = this.state.placeholder as string;
    }

    isValid() {
        if (!this.state.value.length) {
            this.showWarning();
            return false;
        }
        return true;
    }
}

export default LoginInput;