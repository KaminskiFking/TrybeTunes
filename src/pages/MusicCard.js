import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: '',
      checked: '',
    };
  }

  componentDidMount() {
    const { checkedFavorites, trackId } = this.props;
    const filterFavorites = checkedFavorites.find(
      (element) => element.trackId === trackId,
    );
    this.setState({
      checked: filterFavorites,
    });
  }

  checkSongFavorite = async () => {
    const { checked } = this.state;
    const { trackId } = this.props;
    if (checked) {
      this.setState({
        loading: true,
      });
      await removeSong(trackId);
      return this.setState({
        loading: false,
        checked: false,
      });
    }
    this.setState({
      loading: true,
      checked: true,
    });
    await addSong(trackId);
    this.setState({
      loading: false,
    });
    this.setState({
      loading: true,
    });
    const favoriteUpdate = await getFavoriteSongs();
    this.setState({
      loading: false,
      checked: favoriteUpdate,
    });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, checked } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          { `O seu navegador não suporta o elemento ${trackName}`}
          <code>audio</code>
        </audio>
        <label htmlFor="favorita">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="favorita"
            checked={ checked }
            onChange={ this.checkSongFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  songObj: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
  }).isRequired,
  checkedFavorites: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    find: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MusicCard;
