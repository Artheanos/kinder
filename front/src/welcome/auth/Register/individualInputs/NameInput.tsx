import RegisterInput from "../RegisterInput";

class NameInput extends RegisterInput {
    constructor(props: RegisterInput['props'], context: any) {
        let newProps = {
            name: "Name",
            getInvalidMessage: (v: string) => {
                if (v.length === 0 || v.match(/\S/) === null) {
                    return "Name is empty";
                }
                if (v.length > 100) {
                    return "Name is too long";
                }
            }
        };
        super(newProps, context);
    }
}

export default NameInput;