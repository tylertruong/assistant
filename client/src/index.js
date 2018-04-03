import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
        <div>Hello World</div>
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
