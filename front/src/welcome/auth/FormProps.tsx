import {RouteComponentProps} from "react-router";

type FormProps = RouteComponentProps & { switchForm: (() => void) }

export default FormProps;