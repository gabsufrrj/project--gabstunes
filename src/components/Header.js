import React from 'react';
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
          <h1 data-testid="header-user-name">{user}</h1>
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
