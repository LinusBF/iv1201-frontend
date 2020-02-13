import React, {PureComponent} from 'react';
import FloatingLabel from 'react-styled-floating-label';

class InputField extends PureComponent {
  render() {
    return (
      <div>
        <FloatingLabel text={'Email'}>
          <input type={'email'} />
        </FloatingLabel>
      </div>
    );
  }
}

export default InputField;
