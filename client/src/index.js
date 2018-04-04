import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.msg = new SpeechSynthesisUtterance();
    speechSynthesis.addEventListener('voiceschanged', () => {
        let voice = speechSynthesis.getVoices().filter(sy => sy.lang === "en-US" && sy.name ==="Samantha");
        this.msg.voice = voice[0];
    });
    this.msg.onend = (e) => {
        this.recognition.start();
    };
    this.context = null;
    this.sendMessage = this.sendMessage.bind(this);
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.addEventListener('result', e => {
        if(!speechSynthesis.speaking) {
            const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
            if(e.results[0].isFinal){ 
                this.sendMessage(transcript)
            }
        };
    })

    this.recognition.addEventListener('end', () => {
        if(!speechSynthesis.speaking) {
            this.recognition.start();
        } else {
            this.recognition.stop();
        }
    });
  }

  componentDidMount(){
    this.sendMessage('', null);
  }

  sendMessage(message) {
    const convo = {
        input: {
            text: message
        },
        context: this.context,
    }

    fetch('api/message', {
        body: JSON.stringify(convo),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        this.context = data.context;
        this.msg.text = data.output.text.join(" ");
        this.recognition.stop();
        speechSynthesis.speak(this.msg); 
    });
  }

  render() {
    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '5em', textAlign: 'center'}}>
            Hello, feel free to speak to me!
        </div>
    );
    
  }
}

// App.propTypes = {
//   itemFunction: PropTypes.func.isRequired,
// };

// App.defaultProps = {
//   item: '',
// };

ReactDOM.render(<App />, document.getElementById('app'));
