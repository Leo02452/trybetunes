import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      searchedArtist: '',
      isButtonDisabled: true,
      loading: false,
      fetchAlbum: false,
      albums: [],
    };
  }

  handleChange = ({ target }) => {
    const minCharacter = 2;
    this.setState({ artist: target.value }, () => {
      const { artist } = this.state;
      this.setState({
        isButtonDisabled: minCharacter > artist.length });
    });
  }

  handleSearch = async () => {
    this.setState({ loading: true });
    const { artist } = this.state;
    const albums = await searchAlbumsAPI(artist);
    this.setState({ loading: false, fetchAlbum: true, albums, searchedArtist: artist });
    this.setState({ artist: '' });
  }

  render() {
    const { artist, isButtonDisabled, loading,
      fetchAlbum, albums, searchedArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading
          ? <Loading />
          : (
            <form className="search-artist-form">
              <input
                type="text"
                data-testid="search-artist-input"
                name="search-artist-input"
                placeholder="Search an artist"
                className="search-artist-input"
                value={ artist }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                className="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.handleSearch }
              >
                Search
              </button>
            </form>
          )}
        { fetchAlbum
            && (
              <>
                <span className="search-result-title">
                  Found albuns of:
                  {' '}
                  { searchedArtist }
                </span>
                <section className="albuns-container">
                  { albums.length === 0
                    ? 'Nenhum álbum foi encontrado'
                    : (
                      albums.map((album) => (
                        <Link
                          key={ album.collectionId }
                          data-testid={ `link-to-album-${album.collectionId}` }
                          to={ `/album/${album.collectionId}` }
                          className="album-card"
                        >
                          <img
                            src={ album.artworkUrl100 }
                            alt={ `album ${album.collectionName}` }
                          />
                          <span>{ album.collectionName }</span>
                        </Link>
                      ))
                    )}
                </section>
              </>
            )}
        <Footer />
      </div>
    );
  }
}

export default Search;
