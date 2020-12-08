import React from "react";
import {UserFullObject} from "../../../common/UserObjects";
import {photoUrl} from "../../../common/util";

type ProfileImageProps = { editable: boolean, profile: Exclude<UserFullObject, null> }

// const ProfileImage: React.FC<ProfileImageProps> = (props) => {
//     // this.state = {
//     //     fileInput: React.createRef(),
//     // }
//     const fileInput = React.useRef(null);
//
//     if (props.editable) {
//         return (
//             <div>
//                 <img src={photoUrl(props.profile.photoUrl)}
//                      alt={props.profile.name}/>
//                 <input type="file" accept="image/x-png,image/gif,image/jpeg" className="form-control-file"
//                        id="imageInput" style={{'cursor': 'pointer'}} ref={fileInput}/>
//             </div>
//         )
//     } else {
//         return (
//             <div>
//                 <img src={photoUrl(props.profile.photoUrl)}
//                      alt={props.profile.name}/>
//             </div>
//         )
//     }
// }

class ProfileImage extends React.Component<ProfileImageProps, { fileInput: React.RefObject<HTMLInputElement> }> {
    constructor(props: ProfileImageProps, context: any) {
        super(props, context);
        this.state = {
            fileInput: React.createRef(),
        }
    }

    render() {
        if (this.props.editable) {
            return (
                <div>
                    <div className="img-wrapper">
                        <img src={photoUrl(this.props.profile.photoUrl)}
                             alt={this.props.profile.name}/>
                    </div>
                    <input type="file" accept="image/x-png,image/jpeg" className="form-control-file"
                           id="imageInput" style={{'cursor': 'pointer'}} ref={this.state.fileInput}/>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="img-wrapper">
                        <img src={photoUrl(this.props.profile.photoUrl)}
                             alt={this.props.profile.name}/>
                    </div>
                </div>
            )
        }
    }
}

export default ProfileImage;