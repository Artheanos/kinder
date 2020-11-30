import RegisterInput from "../RegisterInput";

class SurnameInput extends RegisterInput {
    constructor(props: any, context: any) {
        let newProps = {
            name: "Last Name",
            getInvalidMessage: (v: string) => {
                if (v.length === 0 || v.match(/\S/) === null) {
                    return "Last name is empty";
                }
                if (v.length > 100) {
                    return "Last name is too long";
                }
            }
        };
        super(newProps, context);
    }
}

export default SurnameInput;