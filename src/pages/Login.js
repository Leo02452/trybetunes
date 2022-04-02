import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isButtonDisabled: true,
      loading: false,
      login: false,
    };
  }

  handleChange = ({ target }) => {
    const minCharacter = 3;
    this.setState({ name: target.value }, () => {
      const { name } = this.state;
      this.setState({
        isButtonDisabled: minCharacter > name.length });
    });
  }

  // Ajuda do Imar Mendes - T19A com a lógica de Loading e Redirect
  handleLogin = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, login: true });
  }

  render() {
    const { isButtonDisabled, loading, login } = this.state;
    return (
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <form className="login-form">
              <input
                data-testid="login-name-input"
                name="name"
                className="login-input"
                placeholder="Enter your username"
                onChange={ this.handleChange }
              />
              <button
                data-testid="login-submit-button"
                type="submit"
                className="login-button"
                disabled={ isButtonDisabled }
                onClick={ this.handleLogin }
              >
                Enter
              </button>
            </form>
          )}
        { login && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
