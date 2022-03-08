import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { onInputChange, searchDisabled } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            Procurar artista:
            <input
              data-testid="search-artist-input"
              name="searchInput"
              type="text"
              onChange={ onInputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ searchDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  searchDisabled: PropTypes.bool.isRequired,
};

export default Search;
