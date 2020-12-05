import '../../App.css';
import React, {FormEvent} from "react";
import {RouteComponentProps} from "react-router";
import ProfileSection from "./ProfileSection";
import ProfileImage from "./ProfileImage";

export type UserFullObject = {
    name: string,
    surname: string,
    urlId: string,
    photoUrl: string | null,
    description: string | null,
    city: string | null,
} | null;

async function getProfileByUrlId(urlId: string): Promise<UserFullObject> {
    let x = await fetch(`http://89.68.129.242:3080/users/${urlId}/full`);
    return JSON.parse(await x.text());
}

type ProfileState = {
    profileId: string,
    profile: UserFullObject,
    editing: boolean,
    isMe: boolean,

    inputAbout: React.RefObject<ProfileSection>,
    inputFrom: React.RefObject<ProfileSection>,
    submitButton: React.RefObject<HTMLButtonElement>,
    profileImage: React.RefObject<ProfileImage>
};

type ProfileUrlParams = {
    profileId: string
}
export type ProfileProps = RouteComponentProps<ProfileUrlParams>;

class Profile extends React.Component<ProfileProps, ProfileState> {

    constructor(props: ProfileProps, context?: any) {
        super(props, context);
        this.state = {
            profileId: this.props.match.params.profileId,
            profileImage: React.createRef(),
            profile: null,
            editing: false,
            isMe: props.match.params.profileId === localStorage.getItem('urlId'),

            inputAbout: React.createRef(),
            inputFrom: React.createRef(),
            submitButton: React.createRef(),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.invite = this.invite.bind(this);
    }

    componentDidMount() {
        this.updateProfile();
    }

    updateProfile() {
        getProfileByUrlId(this.props.match.params.profileId).then((i) => {
            this.setState({profile: i})
        });
    }

    componentDidUpdate(prevProps: Readonly<ProfileProps>, prevState: Readonly<ProfileState>, snapshot?: any) {
        if (prevProps.match.params.profileId !== this.props.match.params.profileId) {
            this.setState({
                profileId: this.props.match.params.profileId,
                profile: null,
                editing: false,
                isMe: this.props.match.params.profileId === localStorage.getItem('urlId')
            });
            this.updateProfile();
        }
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();
        let formData = new FormData();
        let files = this.state.profileImage.current!.state.fileInput.current!.files;
        if (files && files.length) {
            formData.append('file', files[0])
        }
        // formData.append(
        //     "data",
        //     JSON.stringify({
        //         "city": "a",
        //         "description": "b",
        //         "urlId": "Jan.Kowalski928"
        //     })
        // )
        formData.append("data",
            new Blob(
                [JSON.stringify({
                    "city": this.state.inputFrom.current!.state.inputValue,
                    "description": this.state.inputAbout.current!.state.inputValue,
                    "urlId": localStorage.getItem('urlId')
                })],
                {type: "application/json"}
            )
        )
        fetch(`http://89.68.129.242:3080/user/data/edit`,
            {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            }
        ).then(i => {
            if (i.status === 200) {
                this.state.profile!.description = this.state.inputAbout.current!.state.inputValue;
                this.state.profile!.city = this.state.inputFrom.current!.state.inputValue;
            } else {
                alert("ERROR " + i.status)
            }
        }).finally(() => {
                if (this.state.submitButton) {
                    this.state.submitButton.current!.classList.remove('loading');
                    this.state.submitButton.current!.innerHTML = 'Save';
                }
                this.setState({editing: false})
            }
        )

        // this.state.submitButton.current!.classList.add('loading');
        // this.state.submitButton.current!.innerHTML = 'Saving...';
        // setTimeout(() => {
        //     // SUCCEEDED
        //     this.state.submitButton.current!.classList.remove('loading');
        //     this.state.submitButton.current!.innerHTML = 'Save';
        //     this.state.profile.about = this.state.inputAbout.current!.state.inputValue;
        //     this.state.profile.city = this.state.inputFrom.current!.state.inputValue;
        //     alert(this.state.profile.about + '\n' + this.state.profile.city);
        //     this.setState({editing: false});
        // }, 1000);
    }

    // componentWillReceiveProps(nextProps: any) {
    //     this.setState({
    //         profileId: this.props.match.params.profileId,
    //         profile: getProfileByUrlId(this.props.match.params.profileId),
    //         editing: false
    //     })
    // }

    invite(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (this.state.profile) {
            fetch(`http://89.68.129.242:3080/friends/${this.state.profile.urlId}/add`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res => {
                if (res.status === 200) {
                    alert("User invited");
                } else {
                    alert("ERROR\n" + res.status)
                }
            })
        } else {
            alert("wait a bit")
        }
    }

    render() {
        if (this.state.profile !== null) {
            return (
                <div className="Profile m-auto container-md">
                    <form>
                        <div className="d-sm-flex">
                            <div className="left-pane col-sm-6">
                                <div className="card">
                                    <div className="card-header">
                                        <ProfileImage profile={this.state.profile!} editable={this.state.editing}
                                                      ref={this.state.profileImage}/>
                                    </div>
                                    <div className="card-body">
                                        <div className="name">
                                            <h2>{this.state.profile.name}</h2>
                                            <h2>{this.state.profile.surname}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right-pane m-auto col-sm-6">
                                <ProfileSection ref={this.state.inputAbout} title="About"
                                                text={this.state.profile.description || ''}
                                                editable={this.state.editing}/>
                                <ProfileSection ref={this.state.inputFrom} title="From"
                                                text={this.state.profile.city || ''}
                                                editable={this.state.editing}/>
                            </div>
                        </div>
                        <div className="bottom-pane row">
                            <div className="col justify-content-end d-flex">
                                {this.state.isMe ?
                                    this.state.editing ?
                                        <div>
                                            <button className="btn btn-success mr-5" ref={this.state.submitButton}
                                                    onClick={this.handleSubmit}>
                                                Save
                                            </button>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.setState({editing: false})}>
                                                Cancel
                                            </button>
                                        </div>
                                        :
                                        <button className="btn btn-secondary" onClick={() => {
                                            this.setState({editing: !this.state.editing});
                                        }}>
                                            Edit Profile
                                        </button>
                                    : null
                                }
                            </div>
                            <div className="col justify-content-end d-flex">
                                <button className="btn btn-dark" onClick={this.invite}>Add friend</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (<div/>)
        }
    }
}

export default Profile;
