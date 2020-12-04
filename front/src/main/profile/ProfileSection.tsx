import React from "react";

type ProfileSectionProps = {
    title: string,
    text: string,
    editable: boolean,
}

class ProfileSection extends React.Component<ProfileSectionProps, { inputValue: string }> {
    constructor(props: ProfileSectionProps, context: any) {
        super(props, context);
        this.state = {
            inputValue: this.props.text
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<any>) {
        this.setState({inputValue: e.target.value})
    }

    render() {
        if (this.props.editable) {
            return (
                <div className="ProfileSection">
                    <div className="card mw-100">
                        <div className="card-header">
                            <h4>{this.props.title}</h4>
                        </div>
                        <textarea className="card-body form-control" onChange={this.handleChange}
                               value={this.state.inputValue}/>
                    </div>
                </div>
            );
        }
        return (
            <div className="ProfileSection">
                <div className="card">
                    <div className="card-header text-wrap">
                        <h4>{this.props.title}</h4>
                    </div>
                    <div className="card-body">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileSection;