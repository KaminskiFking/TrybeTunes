import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistValue: '',
      loading: '',
      nameArtist: '',
      album: [],
    };
  }

  onChange = ({ target }) => {
    this.setState({
      artistValue: target.value,
    });
  }

  artistLength = () => {
    const nameLength = 2;
    const { artistValue } = this.state;
    return artistValue.length < nameLength;
  }

  clickPesquisar = async (event) => {
    event.preventDefault();
    const {
      artistValue,
    } = this.state;
    this.setState({
      loading: true,
    });
    const test = await searchAlbumsAPI(artistValue);
    this.setState((prevState) => ({
      nameArtist: `Resultado de álbuns de: ${prevState.artistValue}`,
      artistValue: '',
      loading: false,
    }));
    this.setState({
      album: test,
    });
  }

  render() {
    const { artistValue, loading, nameArtist, album } = this.state;
    console.log(album);
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artistBand">
            <input
              name="artistBand"
              value={ artistValue }
              data-testid="search-artist-input"
              type="text"
              onChange={ this.onChange }
            />
          </label>
          { loading ? (<Loading />) : (
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ this.artistLength() }
              onClick={ this.clickPesquisar }
            >
              Pesquisar
            </button>)}
        </form>
        {album.length < 1
          ? <p>Nenhum álbum foi encontrado</p> : album.map((element, index) => (
            <div key={ index }>
              <img src={ element.artworkUrl100 } alt={ element.collectionName } />
              <br />
              <span>{element.collectionName}</span>
              <br />
              <span>{element.collectionPrice}</span>
              <br />
              <Link
                to={ `/album/${element.collectionId}` }
                data-testid={ `link-to-album-${element.collectionId}` }
              >
                Album Link
              </Link>
            </div>))}
        <br />
        <br />
        {nameArtist}
      </div>
    );
  }
}

export default Search;
