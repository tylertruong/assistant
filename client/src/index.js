import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        message: "",
    };
    this.changeMessage = this.changeMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  changeMessage(e) {
    this.setState({message: e.target.value});
  }
  sendMessage(e) {
    e.preventDefault();
    const convo = {
        input: {
            text: this.state.message
        },
        context: {},
    }

    this.setState({message: ""});
    console.log('convo', convo);
    fetch('api/message', {
        body: JSON.stringify(convo),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }

  render() {
    return(
        <div>
            <form onSubmit={e => this.sendMessage(e)}>
                <input onChange={this.changeMessage} value={this.state.message} type="text" />
            </form>
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
