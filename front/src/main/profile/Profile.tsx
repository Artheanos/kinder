import React, {FormEvent} from "react";
import {RouteComponentProps} from "react-router";
import ProfileSection from "./components/ProfileSection";
import ProfileImage from "./components/ProfileImage";
import AddFriendButton from "./components/AddFriendButton";
import {KINDER_BACK_URL} from "../../common/util";
import {SaveButton} from "./components/SaveButton";

async function getProfileByUrlId(urlId: string): Promise<Kinder.UserFullObject> {
    let x = await fetch(`${KINDER_BACK_URL}/users/${urlId}/full`);
    return JSON.parse(await x.text());
}

type ProfileState = {
    profileId: string,
    profile: Kinder.UserFullObject | null,
    editing: boolean,
    saving: boolean,
    isMe: boolean,

    inputAbout: React.RefObject<ProfileSection>,
    inputFrom: React.RefObject<ProfileSection>,
    profileImage: React.RefObject<ProfileImage>,
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
            saving: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.updateProfile();
    }

    updateProfile() {
        getProfileByUrlId(this.props.match.params.profileId).then((i) => {
            this.setState({profile: i});
            console.log(i);
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
        let files = this.state.profileImage.current!.state.fileInput.current!.files;
        let formData = new FormData();
        if (files && files.length) {
            formData.append('file', files[0])
        }
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

        this.setState({saving: true});

        fetch(`${KINDER_BACK_URL}/user/data/edit`,
            {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            }
        ).then(i => {
            if (i.status === 200) {
                this.updateProfile();
                this.state.profile!.description = this.state.inputAbout.current!.state.inputValue;
                this.state.profile!.city = this.state.inputFrom.current!.state.inputValue;
            } else {
                alert("ERROR " + i.status)
            }
        }).finally(() => {
                this.setState({editing: false, saving: false})
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


    render() {
        if (this.state.profile === null) {
            return (<div>Loading</div>)
        } else {
            return (
                <div className="Profile m-auto container-md">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="row d-sm-flex">
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
                            <div className="right-pane col-sm-6">
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
                                            <SaveButton saving={this.state.saving} onClick={this.handleSubmit}/>
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
                            <AddFriendButton profile={this.state.profile} isMe={this.state.isMe}/>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default Profile;