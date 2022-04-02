import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
      isButtonEnabled: false,
      isUpdated: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
    this.handleVerification();
  }

  handleChange = ({ target }) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [target.name]: target.value,
      },
    }), this.handleVerification);
  }

  handleVerification = () => {
    const { user } = this.state;
    const isUserNameEmpty = user.name.length <= 0;
    const isUserEmailEmpty = user.email.length <= 0;
    const isUserDescriptionEmpty = user.description.length <= 0;
    const isUserImageEmpty = user.image.length <= 0;
    this.setState({ isButtonEnabled:
        (!isUserNameEmpty
          && !isUserEmailEmpty
          && !isUserDescriptionEmpty
          && !isUserImageEmpty) });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({ loading: true }, async () => {
      await updateUser(user);
      this.setState({ isUpdated: true, loading: false });
    });
  }

  render() {
    const { loading, user, isButtonEnabled, isUpdated } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          {loading
            ? <Loading />
            : (
              <form className="edit-profile-form">
                <label htmlFor="name" className="edit-profile-label">
                  Name
                  <input
                    data-testid="edit-input-name"
                    name="name"
                    className="edit-profile-input"
                    onChange={ this.handleChange }
                    value={ user.name }
                  />
                </label>
                <label htmlFor="email" className="edit-profile-label">
                  Email
                  <input
                    data-testid="edit-input-email"
                    name="email"
                    className="edit-profile-input"
                    onChange={ this.handleChange }
                    value={ user.email }
                  />
                </label>
                <label htmlFor="description" className="edit-profile-label">
                  About
                  <input
                    data-testid="edit-input-description"
                    name="description"
                    className="edit-profile-input"
                    onChange={ this.handleChange }
                    value={ user.description }
                  />
                </label>
                <label htmlFor="image" className="edit-profile-label">
                  URL to image
                  <input
                    data-testid="edit-input-image"
                    name="image"
                    className="edit-profile-input"
                    onChange={ this.handleChange }
                    value={ user.image }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="edit-button-save"
                  className="edit-button-save"
                  disabled={ !isButtonEnabled }
                  onClick={ this.handleClick }
                >
                  Update
                </button>
              </form>
            )}
        </div>
        <Footer />
        { isUpdated && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
