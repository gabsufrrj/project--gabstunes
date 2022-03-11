import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      requestMusic: [],
      isLoading: true,
    };
    this.handleMusic = this.handleMusic.bind(this);
  }

  componentDidMount() {
    this.handleMusic();
  }

  async handleMusic() {
    const { match } = this.props;
    const { id } = match.params;
    const request = await getMusics(id);
    this.setState(
      {
        requestMusic: request,
        isLoading: false,
      },
    );
  }

  render() {
    const { requestMusic, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? (
          <Carregando />)
          : (
            <div>
              <img
                src={ requestMusic[0].artworkUrl100 }
                alt={ requestMusic[0].collectionName }
              />
              <h1 data-testid="artist-name">
                {requestMusic[0].artistName}
              </h1>
              <h2 data-testid="album-name">{requestMusic[0].collectionName}</h2>
            </div>
          )}
        {
          requestMusic.map((music, index) => (
            index > 0 && (
              <MusicCard
                key={ index }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                requestMusic={ requestMusic }
              />)
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
