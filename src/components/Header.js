import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const data = await getUser();
    this.setState({
      user: data.name,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        { !loading ? (
          <div>
            <h1 data-testid="header-user-name">{user}</h1>
            <Link to="/search" data-testid="link-to-search"> to Search </Link>
            <Link to="/favorites" data-testid="link-to-favorites"> to Favorites</Link>
            <Link to="/profile" data-testid="link-to-profile"> to Profile </Link>
          </div>
        )
          : (
            <p>
              <Carregando />
            </p>
          )}
      </header>
    );
  }
}

export default Header;
