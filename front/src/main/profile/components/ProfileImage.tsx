import React from "react";
import {UserFullObject} from "../../../common/UserObjects";
import {photoUrl} from "../../../common/util";

type ProfileImageProps = { editable: boolean, profile: Exclude<UserFullObject, null> }

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
                    <div className="custom-file" style={{maxWidth: '300px'}}>
                        <input type="file" name="file" className="custom-file-input" id="file_input" accept="image/*"
                               ref={this.state.fileInput} style={{cursor: 'pointer'}}
                               onChange={(e) => {
                                   let fileName = e.target.value.split('\\').pop()?.slice(0, 28) + '...';
                                   let label = e.target.nextElementSibling!;
                                   label.classList.add('selected');
                                   label.innerHTML = fileName!;
                               }} required/>
                        <label className="custom-file-label text-left" htmlFor="file_input">Choose File</label>
                    </div>
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