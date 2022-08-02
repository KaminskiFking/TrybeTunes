import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      music: [],
      favoriteMusic: [],
      artistName: '',
      albumName: '',
      loading: '',
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const testTwo = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteMusic: testTwo,
    });
    const { match: { params: { id } } } = this.props;
    const test = await getMusics(id);
    this.setState({
      music: test,
      artistName: test[0].artistName,
      albumName: test[0].collectionName,
    });
  }

  render() {
    const { music, artistName, albumName, loading, favoriteMusic } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{albumName}</p>
        {music.map((element, index) => index !== 0 && (
          <MusicCard
            key={ index }
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
            trackId={ element.trackId }
            checkedFavorites={ favoriteMusic }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
