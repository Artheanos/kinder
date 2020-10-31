import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";

function App() {
    const [text, setText] = useState("hello world");
    useEffect(() => getTexts(), []);

    function getTexts() {
        let newLine = addLine();

        fetch('http://localhost:5000/texts').then((x) => {
            x.json().then((data) => {
                newLine.remove();
                for (let i of data) {
                    addLine(i);
                }
            })
        })
    }

    function addLine(str, timeout = 0) {
        let parent = document.getElementsByClassName('my-box')[1];
        let newLine;

        if (str === undefined) {
            newLine = document.createElement('a');
            newLine.classList.add('spin');
            parent.appendChild(newLine);
        } else {
            newLine = document.createElement('a');
            newLine.innerText = str;
            parent.appendChild(newLine).appendChild(document.createElement('hr'));
        }
        return newLine;
    }

    const submitText = function () {
        let newLine = addLine();
        fetch('http://localhost:5000/texts/' + text).then((e) => {
            if (e.status === 200) {
                newLine.innerText = text;
            } else {
                newLine.innerText = "ERROR";
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

    return (
        <div className="App">
            <div className="my-box" style={{height: "300px"}}>
                <input type="text" value={text} onChange={
                    (x) => setText(x.target.value)
                }/>
                <button onClick={submitText}>Send it</button>
            </div>
            <div className="my-box" style={{padding: "30px 0"}}>
                {/*<a>text text text*/}
                {/*    <hr/>*/}
                {/*</a>*/}
            </div>
        </div>
    );
}

export default App;
