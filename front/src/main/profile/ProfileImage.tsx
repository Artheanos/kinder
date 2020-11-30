import React from "react";
import {ProfileObject} from "./Profile";
import default_image from './default_image.jpg';

class ProfileImage extends React.Component<{ editable: boolean, profile: ProfileObject }> {
    // constructor(props: { editable: boolean; profile: ProfileObject }, context: any) {
    //     super(props, context);
    // }

    render() {
        if (this.props.editable) {
            return (
                <div>
                    <img src={this.props.profile.user.image_url || default_image} alt={this.props.profile.user.name}/>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg" className="form-control-file" id="imageInput"/>
                </div>
            )
        } else {
            return (
                <img src={this.props.profile.user.image_url || default_image} alt={this.props.profile.user.name}/>
            )
        }
    }
}

export default ProfileImage;