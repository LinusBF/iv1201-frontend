import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import NameForm from './components/ApplicationRegForm';

const Index = () => {
  return (
    <div>
      Welcome to React! <br />
      <NameForm />
    </div>
  );
};

// eslint-disable-next-line no-undef
ReactDOM.render(<Index />, document.getElementById('root'));
