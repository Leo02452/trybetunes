import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
    };
  }

  fetchUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, userName: user.name });
  }

  componentDidMount = async () => {
    await this.fetchUser();
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component" className="header-container">
        {
          loading
            ? <Loading />
            : (
              <span
                data-testid="header-user-name"
                className="user-name"
              >
                { userName }
              </span>
            )
        }
        <nav className="nav-container">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="nav-link"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="nav-link"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="nav-link"
          >
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
