import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { onInputChange,
      searchDisabled,
      searchClick,
      searchLoading,
      searchLoadedFinish,
      artistData,
      artistName } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        { searchLoadedFinish
          && (
            <div>
              <ul>{`Resultado de álbuns de: ${artistName}`}</ul>
              {artistData.length === 0 ? (
                <li>Nenhum álbum foi encontrado</li>
              )
                : (
                  artistData
                    .map(
                      (artist, index) => (
                        <Link
                          key={ index }
                          data-testid={ `link-to-album-${artist.collectionId}` }
                          to={ `/album/${artist.collectionId}` }
                        >
                          <li key={ artist.collectionId }>
                            <img
                              src={ artist.artworkUrl100 }
                              alt={ `Capa do álbum: ${artist.collectionName}` }
                            />
                            {artist.collectionName}
                          </li>
                        </Link>
                      ),
                    ))}
            </div>)}
        {
          searchLoading
            ? (
              <div>
                <Carregando />
              </div>
            ) : (
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
                  onClick={ searchClick }
                >
                  Pesquisar
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  searchDisabled: PropTypes.bool.isRequired,
  searchClick: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  searchLoadedFinish: PropTypes.bool.isRequired,
  artistData: PropTypes.arrayOf(PropTypes.object).isRequired,
  artistName: PropTypes.string.isRequired,
};

export default Search;
