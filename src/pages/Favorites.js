import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      favoritesSongsList: [],
    };
  }

  componentDidMount = () => {
    this.handleUpdate();
  }

  handleUpdate = async () => {
    this.setState({ loading: true });
    const favoritesSongsList = await getFavoriteSongs();
    this.setState({ loading: false, favoritesSongsList });
  }

  render() {
    const { loading, favoritesSongsList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading
          ? <Loading />
          : (
            <section className="music-container">
              {favoritesSongsList.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  trackId={ song.trackId }
                  trackInfo={ song }
                  onFavoriteChange={ this.handleUpdate }
                />
              ))}
            </section>)}
        <Footer />
      </div>
    );
  }
}

export default Favorites;
