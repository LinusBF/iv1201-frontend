import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import InputField from './components/login/inputField/InputField';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <InputField />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
