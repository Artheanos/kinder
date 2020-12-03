import React from "react";
import {ProfileObject} from "./Profile";
import default_image from './default_image.jpg';

class ProfileImage extends React.Component<{ editable: boolean, profile: Exclude<ProfileObject, null> },
    { fileInput: React.RefObject<HTMLInputElement> }> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            fileInput: React.createRef()
        }
    }

    render() {
        if (this.props.editable) {
            return (
                <div>
                    <img src={('http://192.168.1.93:3080/photos/' + this.props.profile.photoUrl) || default_image}
                         alt={this.props.profile.name}/>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg" className="form-control-file"
                           id="imageInput" style={{'cursor': 'pointer'}} ref={this.state.fileInput}/>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={('http://192.168.1.93:3080/photos/' + this.props.profile.photoUrl) || default_image} alt={this.props.profile.name}/>
                </div>
            )
        }
    }
}

export default ProfileImage;