import './App.css';
import React from "react";

class HelloWorldApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: 'TEST'};
        this.submitText = this.submitText.bind(this);
    }

    componentDidMount() {
        this.getTexts();
    }

    getTexts() {
        let newLine = this.addLine();

        fetch('http://192.168.1.93:3080/word/').then((x) => {
            x.json().then((data) => {
                newLine.remove();
                for (let word of data) {
                    this.addLine(word.word);
                    console.log(word.word);
                }
            })
        }).catch((reason => {
            console.log(reason);
            newLine.remove();
        }))
    }

    addLine(str, timeout = 0) {
        let parent = document.getElementsByClassName('my-box')[1];
        let newLine;

        if (str === undefined) {
            newLine = document.createElement('a');
            newLine.classList.add('spin');
            parent.insertBefore(newLine, parent.firstElementChild);
        } else {
            newLine = document.createElement('a');
            newLine.innerText = str;
            parent.insertBefore(newLine, parent.firstElementChild).appendChild(document.createElement('hr'));
        }
        return newLine;
    }

    submitText() {
        let newLine = this.addLine();

        fetch('http://192.168.1.93:3080/word/', {
            method: 'POST',
            body: JSON.stringify({'word': this.state.text}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((e) => {
            if (e.status === 201) {
                newLine.innerText = this.state.text;
            } else {
                newLine.innerText = "ERROR";
                console.log(e);
                setTimeout(() => newLine.remove(), 1000);
            }
            newLine.classList.remove('spin');
            newLine.appendChild(document.createElement('hr'));
        }).catch((e) => {
            console.log("NO", e);
            newLine.remove();
            alert('Server error!');
        });
    }

    render() {
        return (
            <div className="Hello-world">
                <div className="my-box" style={{height: "300px"}}>
                    <input type="text" value={this.state.text}
                           onChange={
                               (x) => {
                                   this.setState({text: x.target.value});
                               }
                           }
                           onKeyDown={
                               (e) => {
                                   if (e.key === "Enter") {
                                       this.submitText();
                                   }
                               }
                           }
                    />
                    <button onClick={this.submitText}>
                        Send it
                    </button>
                </div>
                <div className="my-box" style={{padding: "30px 0"}}>
                </div>
            </div>
        );
    }
}

export default HelloWorldApp;
