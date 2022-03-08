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
      searchInput: '',
      searchDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.generalValidation = this.generalValidation.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      () => this.generalValidation(),
    );
  }

  generalValidation() {
    const { logName, searchInput } = this.state;
    const searchLength = 2;
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
    if (searchInput.length >= searchLength) {
      this.setState(
        { searchDisabled: false },
      );
    } else {
      this.setState(
        { searchDisabled: true },
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
    const { logName,
      isDisabled, loading, saved, searchInput, searchDisabled } = this.state;
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
          <Route
            exact
            path="/search"
            render={
              (props) => (<Search
                { ...props }
                name={ searchInput }
                searchDisabled={ searchDisabled }
                onInputChange={ this.onInputChange }
              />)
            }
          />
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
