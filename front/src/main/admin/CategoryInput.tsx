import React from "react";
import {KINDER_BACK_URL} from "../../common/util";
import Category from "./Category";

type InputState = {
    id: number
    title: string,
    description: string
}
type Props = {
    onSubmit: (f: void) =>  void
}

class CategoryInput extends React.Component<Props, InputState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            description: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e: any) {
        e.preventDefault()
        fetch(`${KINDER_BACK_URL}/category`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((r) => {
            if (r.status === 201) {
                this.props.onSubmit()
            } else {
                alert("ERROR " + r.status)
            }
        }).catch(reason => alert("ERROR\n" + reason))
        this.setState({
            id: 0,
            title: "",
            description: ""
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="title" type="text" className="form-control" value={this.state.title} onChange={(x) => {
                        this.setState(prevState => ({
                            ...prevState,
                            ["title"]: x.target.value
                        }));
                    }}/>
                    <input name="description" type="text" className="form-control" value={this.state.description} onChange={(x) => {
                        this.setState(prevState => ({
                            ...prevState,
                            ["description"]: x.target.value
                        }));
                    }}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default CategoryInput
