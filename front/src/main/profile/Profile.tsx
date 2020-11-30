import '../../App.css';
import React from "react";
import {RouteComponentProps} from "react-router";
import ProfileSection from "./ProfileSection";
import ProfileImage from "./ProfileImage";

type UserObject = {
    name: string,
    surname: string,
    user_id: string,
    image_url: string | null
}

export type ProfileObject = {
    user: UserObject,
    about: string,
    city: string,
}

function getProfileByEmail(email: string): ProfileObject {
    if (email === 'admin@admin.pl') {
        return {
            about: "I like eggs",
            city: "Gdansk",
            user: {
                image_url: "http://127.0.0.1/test_profile_photo.jpg",
                name: "Jan",
                surname: "Kowalski",
                user_id: ""
            }
        }
    } else {
        return {
            about: "I am Adrian",
            city: "Krakow",
            user: {
                image_url: null,
                name: "Adrian",
                surname: "Malinowski",
                user_id: ""
            }
        }
    }
}

type ProfileState = {
    profileId: string,
    profile: ProfileObject,
    editing: boolean,
    isMe: boolean,

    inputAbout: React.RefObject<ProfileSection>,
    inputFrom: React.RefObject<ProfileSection>,
    submitButton: React.RefObject<HTMLButtonElement>,
}

type ProfileUrlParams = {
    profileId: string
}
type ProfileProps = RouteComponentProps<ProfileUrlParams>;

class Profile extends React.Component<ProfileProps, ProfileState> {

    constructor(props: ProfileProps, context?: any) {
        super(props, context);
        this.state = {
            profileId: this.props.match.params.profileId,
            profile: getProfileByEmail(this.props.match.params.profileId),
            editing: false,
            isMe: this.props.match.params.profileId === localStorage.getItem('email'),

            inputAbout: React.createRef(),
            inputFrom: React.createRef(),
            submitButton: React.createRef(),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getDerivedStateFromProps(props: ProfileProps, state: ProfileState) {
        if (props.match.params.profileId === state.profileId) {
            return null;
        }
        return {
            profileId: props.match.params.profileId,
            profile: getProfileByEmail(props.match.params.profileId),
            editing: false,
            isMe: props.match.params.profileId === localStorage.getItem('email')
        }
    }

    async handleSubmit() {
        this.state.submitButton.current!.classList.add('loading');
        this.state.submitButton.current!.innerHTML = 'Saving...';
        setTimeout(() => {
            // SUCCEEDED
            this.state.submitButton.current!.classList.remove('loading');
            this.state.submitButton.current!.innerHTML = 'Save';
            this.state.profile.about = this.state.inputAbout.current!.state.inputValue;
            this.state.profile.city = this.state.inputFrom.current!.state.inputValue;
            alert(this.state.profile.about + '\n' + this.state.profile.city);
            this.setState({editing: false});
        }, 1000);
    }

    // componentWillReceiveProps(nextProps: any) {
    //     this.setState({
    //         profileId: this.props.match.params.profileId,
    //         profile: getProfileByEmail(this.props.match.params.profileId),
    //         editing: false
    //     })
    // }

    render() {
        return (
            <div className="Profile m-auto container-md">
                <div className="d-sm-flex">
                    <div className="left-pane col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                <ProfileImage profile={this.state.profile} editable={this.state.editing}/>
                            </div>
                            <div className="card-body">
                                <div className="name">
                                    <h2>{this.state.profile.user.name}</h2>
                                    <h2>{this.state.profile.user.surname}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-pane m-auto col-sm-6">
                        <ProfileSection ref={this.state.inputAbout} title="About" text={this.state.profile.about}
                                        editable={this.state.editing}/>
                        <ProfileSection ref={this.state.inputFrom} title="From" text={this.state.profile.city}
                                        editable={this.state.editing}/>
                    </div>
                </div>
                <div className="bottom-pane row">
                    <div className="col">
                        {this.state.isMe ?
                            this.state.editing ?
                                <div className="col">
                                    <button className="btn btn-success" ref={this.state.submitButton}
                                            onClick={this.handleSubmit}>
                                        Save
                                    </button>
                                    <button className="btn btn-danger" onClick={() => this.setState({editing: false})}>
                                        Cancel
                                    </button>
                                </div>
                                :
                                <button className={"btn btn-secondary"} onClick={() => {
                                    this.setState({editing: !this.state.editing});
                                }}>
                                    Edit
                                </button>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
