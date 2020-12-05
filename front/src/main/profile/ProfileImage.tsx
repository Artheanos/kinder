import React from "react";
import {UserFullObject} from "./Profile";
import {photoUrl} from "../../common/util";

class ProfileImage extends React.Component<{ editable: boolean, profile: Exclude<UserFullObject, null> },
    { fileInput: React.RefObject<HTMLInputElement>, imageSrc: string }> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            fileInput: React.createRef(),
            imageSrc: photoUrl(this.props.profile.photoUrl)
        }
    }

    render() {
        if (this.props.editable) {
            return (
                <div>
                    <img src={this.state.imageSrc}
                         alt={this.props.profile.name}/>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg" className="form-control-file"
                           id="imageInput" style={{'cursor': 'pointer'}} ref={this.state.fileInput}/>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={this.state.imageSrc}
                         alt={this.props.profile.name}/>
                </div>
            )
        }
    }
}

export default ProfileImage;