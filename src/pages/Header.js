import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: '',
      userName: '',
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const object = await getUser();
    const { name } = object;
    this.setState({
      loading: false,
      userName: name,
    });
  }

  render() {
    const { userName, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="header-component">
        <p data-testid="header-user-name">{userName}</p>
        <Link data-testid="link-to-search" to="/search">Ir ao Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Ir ao Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Ir ao Profile</Link>
      </div>
    );
  }
}

export default Header;
