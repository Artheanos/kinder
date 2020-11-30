import React from "react";
import {ProfileObject} from "./Profile";
import default_image from './default_image.jpg';

class ProfileImage extends React.Component<{ editable: boolean, profile: Exclude<ProfileObject, null> }> {
    // constructor(props: { editable: boolean; profile: ProfileObject }, context: any) {
    //     super(props, context);
    // }

    render() {
        if (this.props.editable) {
            return (
                <div>
                    <img src={this.props.profile.image_url || default_image} alt={this.props.profile.name}/>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg" className="form-control-file"
                           id="imageInput" style={{'cursor': 'pointer'}}/>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={this.props.profile.image_url || default_image} alt={this.props.profile.name}/>
                </div>
            )
        }
    }
}

export default ProfileImage;