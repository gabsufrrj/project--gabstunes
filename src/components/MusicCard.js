import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      checked: false,
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async handleFavorite() {
    const { requestMusic } = this.props;
    const { checked } = this.state;
    this.setState(
      { loaded: true },
    );
    await addSong(requestMusic);
    this.setState(
      { loaded: false },
    );
    if (checked === false) {
      this.setState(
        { checked: true },
      );
    } else {
      this.setState(
        { checked: false },
      );
    }
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loaded, checked } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento;
          <code>audio</code>
        </audio>
        <div>
          {!loaded ? (
            <label htmlFor="checkbox-music">
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id="checkbox-music"
                name="checkbox-music"
                onChange={ this.handleFavorite }
                checked={ checked }
              />
              Favorita
            </label>)
            : (
              <Carregando />
            )}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  requestMusic: PropTypes.arrayOf(PropTypes.object).isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
