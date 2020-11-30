import React from "react";
import Auth from "./auth";

export class TopBar extends React.Component<{}, { pressed: boolean }> {

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {pressed: !!sessionStorage.getItem('skipAnimation')}
        this.collapse = this.collapse.bind(this);
    }

    collapse() {
        sessionStorage.setItem('skipAnimation', 'true');
        this.setState({pressed: true});
    }

    render() {
        if (this.state.pressed) {
            return (
                <div className="Top-bar">
                    <div className="jumbotron">
                        <div className="test-wrapper">
                            <h1>Kinder</h1>
                        </div>
                    </div>
                    <div className="behind">
                        <Auth/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Top-bar">
                    <div className="jumbotron initial">
                        <div className="test-wrapper">
                            <h1>Kinder</h1>
                        </div>
                        <h2>One map - Endless possibilities</h2>
                        <h3 onClick={this.collapse}>Create account</h3>
                    </div>
                    <div className="behind">
                        <Auth/>
                    </div>
                </div>
            );
        }

    }
}

export default TopBar;