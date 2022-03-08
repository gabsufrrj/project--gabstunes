import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { isDisabled, onInputChange, createUser, logName } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name-input">
            Nome:
            <input
              data-testid="login-name-input"
              type="text"
              name="logName"
              onChange={ onInputChange }
              value={ logName }
            />
          </label>
          <button
            disabled={ isDisabled }
            type="submit"
            data-testid="login-submit-button"
            onClick={ createUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
};

export default Login;
