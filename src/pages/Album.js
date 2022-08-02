import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      music: [],
      artistName: '',
      albumName: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const test = await getMusics(id);
    this.setState({
      music: test,
      artistName: test[0].artistName,
      albumName: test[0].collectionName,
    });
  }

  render() {
    const { music, artistName, albumName } = this.state;
    console.log(music);
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
