import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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

  async componentDidMount() {
    const { trackId } = this.props;
    const savedSongs = await getFavoriteSongs();
    const checkVerify = savedSongs
      .some((song) => song.trackId === trackId);
    this.setState(
      { checked: checkVerify },
    );
  }

  async handleFavorite({ target }) {
    const { requestMusic } = this.props;
    const { checked } = this.state;
    this.setState(
      { loaded: true },
    );
    const foundMusic = requestMusic
      .find((music) => Number(music.trackId) === Number(target.name));
    await addSong(foundMusic);
    await getFavoriteSongs();
    this.setState(
      { loaded: false },
    );
    if (checked === false) {
      this.setState(
        { checked: true },
      );
    } else {
      removeSong(foundMusic);
      this.setState(
        { checked: false },
      );
    }
  }

  // async removeFavorite({ target }) {
  //   const { requestMusic } = this.props;
  //   const foundMusic = requestMusic
  //     .find((music) => Number(music.trackId) === Number(target.name));
  //   await removeSong(foundMusic);
  // }

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
                name={ trackId }
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
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
