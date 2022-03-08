import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Carregando from './Carregando';

class Login extends React.Component {
  render() {
    const { isDisabled, onInputChange, clickButton, loading, saved } = this.props;
    return (
      <div data-testid="page-login">
        { loading
          ? (
            <Carregando />
          ) : (
            <form>
              <label htmlFor="name-input">
                Nome:
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="logName"
                  onChange={ onInputChange }
                />
              </label>
              <button
                disabled={ isDisabled }
                type="submit"
                data-testid="login-submit-button"
                onClick={ clickButton }
              >
                Entrar
              </button>
            </form>
          ) }
        {
          saved && <Redirect to="/search" />
        }
      </div>
    );
  }
}

Login.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  clickButton: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
};

export default Login;
