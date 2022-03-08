import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logName: '',
      isDisabled: true,
      loading: false,
      saved: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.nameValidation = this.nameValidation.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      () => this.nameValidation(),
    );
  }

  nameValidation() {
    const { logName } = this.state;
    const nameLength = 3;
    if (logName.length >= nameLength) {
      this.setState(
        { isDisabled: false },
      );
    } else {
      this.setState(
        { isDisabled: true },
      );
    }
  }

  async clickButton() {
    const { logName } = this.state;
    this.setState(
      { loading: true },
    );
    await createUser({ name: logName });
    this.setState(
      { saved: true },
    );
  }

  render() {
    const { logName, isDisabled, loading, saved } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={
              (props) => (<Login
                { ...props }
                name={ logName }
                isDisabled={ isDisabled }
                onInputChange={ this.onInputChange }
                clickButton={ this.clickButton }
                loading={ loading }
                saved={ saved }
              />)
            }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
