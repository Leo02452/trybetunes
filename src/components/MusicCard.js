import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from 'react-icons/md';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      trackInfo: props.trackInfo,
      favoritesSongsList: [],
      isFavorite: false,
    };
  }

  componentDidMount = async () => {
    const { trackId } = this.props;
    this.setState({ loading: true });
    const favoritesSongsList = await getFavoriteSongs();
    this.setState({ loading: false, favoritesSongsList },
      () => this.isFavoriteSong(trackId));
  }

  handleCheck = async ({ target }) => {
    const { trackInfo } = this.state;
    const { onFavoriteChange } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      // Ajuda de Thiago Medeiros - T19A com a lógica de mudar o isFavorite no click
      this.setState({ isFavorite: true });
      await addSong(trackInfo);
    } else {
      this.setState({ isFavorite: false });
      await removeSong(trackInfo);
    }
    this.setState({ loading: false });
    onFavoriteChange();
  }

  isFavoriteSong = (id) => {
    const { favoritesSongsList } = this.state;
    this.setState({
      isFavorite: favoritesSongsList.some((favoriteSong) => (
        favoriteSong.trackId === id)),
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isFavorite } = this.state;
    return (
      <div className="music-card">
        <h3>{ trackName }</h3>
        <div className="music">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label
            htmlFor={ trackId }
          >
            {/* { Ajuda da Wanny - T19A com a lógica de substituir o icon pelo checkbox sem perder toda a lógica } */}
            { isFavorite
              ? (
                <MdOutlineRemoveCircle
                  className="fav-icon"
                />)
              : (
                <MdOutlineAddCircle
                  className="fav-icon"
                />)}
            {loading && <Loading />}
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name={ `checkbox-music-${trackId}` }
              id={ trackId }
              className="checkbox-input"
              checked={ isFavorite }
              onChange={ this.handleCheck }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  onFavoriteChange: () => {},
};

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // Solução vista no PR da Luá - T19A para não precisar detalhar todo o objeto.
  trackInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  onFavoriteChange: PropTypes.func,
};

export default MusicCard;
