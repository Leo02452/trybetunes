import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading
          ? <Loading />
          : (
            <section className="user-container">
              <div className="user-image">
                <img
                  src={ user.image }
                  data-testid="profile-image"
                  alt={ `Foto de ${user.name}` }
                />
              </div>
              <div className="user-info">
                <h4 className="user-title">Name</h4>
                <span className="user-text">{ user.name }</span>
                <h4 className="user-title">Email</h4>
                <span className="user-text">{user.email}</span>
                <h4 className="user-title">About</h4>
                <span className="user-text">{user.description}</span>
                <Link
                  to="/profile/edit"
                  className="edit-profile-link"
                >
                  Edit profile
                </Link>
              </div>
            </section>
          )}
        <Footer />
      </div>
    );
  }
}

export default Profile;
