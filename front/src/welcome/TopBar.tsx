import React from "react";
import Auth from "./auth";

export class TopBar extends React.Component {
    jumbotron: React.RefObject<HTMLDivElement> = React.createRef();
    h2: React.RefObject<HTMLHeadingElement> = React.createRef();
    h3: React.RefObject<HTMLHeadingElement> = React.createRef();

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {'pressed': false};

        this.collapse = this.collapse.bind(this);
    }

    collapse() {
        if (this.h2.current)
            this.h2.current.remove();
        if (this.h3.current)
            this.h3.current.remove();
        if (this.jumbotron.current) {
            this.jumbotron.current.style.flexDirection = 'row';
            this.jumbotron.current.classList.remove('initial');
        }
    }

    render() {
        return (
            <div className="Top-bar">
                <div ref={this.jumbotron} className="jumbotron initial">
                    <div className="test-wrapper">
                        <h1>Kinder</h1>
                    </div>
                    <h2 ref={this.h2}>One map - Endless possibilities</h2>
                    <h3 ref={this.h3} onClick={this.collapse}>Create account</h3>
                </div>
                <div className="behind">
                    <Auth/>
                </div>
            </div>
        );
    }
}

export default TopBar;