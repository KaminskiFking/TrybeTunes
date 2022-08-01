import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistValue: '',
    };
  }

  onChange = ({ target }) => {
    this.setState({
      artistValue: target.value });
  }

  artistLength = () => {
    const nameLength = 2;
    const { artistValue } = this.state;
    return artistValue.length < nameLength;
  }

  render() {
    const { artistValue } = this.state;
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
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ this.artistLength() }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
