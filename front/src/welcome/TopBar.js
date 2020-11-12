import React from "react";
import Auth from "./auth";

export class TopBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {'pressed': false};
    }

    lol() {
        let b = document.getElementsByClassName('jumbotron')[0];
        document.querySelector('.jumbotron h2').remove();
        document.querySelector('.jumbotron h3').remove();
        b.style.flexDirection = 'row';

        b.classList.remove('initial');
    }

    render() {
        return (
            <div className="Top-bar">
                <div className="jumbotron initial">
                    <div className="test-wrapper">
                        <h1>Kinder</h1>
                    </div>
                    <h2>One map - Endless possibilities</h2>
                    <h3 onClick={this.lol}>Create account</h3>
                </div>
                <div className="behind">
                    <Auth/>
                </div>
            </div>
        );
    }
}

export default TopBar;