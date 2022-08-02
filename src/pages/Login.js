import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameText: '',
      loading: '',
    };
  }

   apiLoading = async (event) => {
     event.preventDefault();
     const { nameText } = this.state;
     const { history } = this.props;
     this.setState({
       loading: true,
     });
     await createUser({ name: nameText });
     this.setState({
       loading: false,
     });
     history.push('/search');
   }

  onChange = ({ target }) => {
    this.setState({
      nameText: target.value });
  }

  loginLength = () => {
    const nameLength = 3;
    const { nameText } = this.state;
    return nameText.length < nameLength;
  }

  render() {
    const { nameText, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login" className="form-login">
        <div className="login-name">
          <img
            className="imagem-fone"
            src="https://cdn-icons-png.flaticon.com/512/1563/1563475.png"
            alt="fone"
          />
          <form className="formulario">
            login
            <label htmlFor="nameLogin">
              <input
                name="nameLogin"
                value={ nameText }
                data-testid="login-name-input"
                type="text"
                onChange={ this.onChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ this.loginLength() }
              onClick={ this.apiLoading }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
