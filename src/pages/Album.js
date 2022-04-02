import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import './Album.css';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      tracks: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const tracks = await getMusics(id);
    this.setState({ loading: false, tracks });
  }

  render() {
    const { tracks, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading
          ? <Loading />
          : (
            <>
              <section className="artist-album-info">
                <span data-testid="artist-name">{tracks[0].artistName}</span>
                <span data-testid="album-name">{tracks[0].collectionName}</span>
              </section>
              <section className="music-container">
                {tracks.map((track, index) => (
                  // Ajuda Eduardo Muchak - T19A com a lógica do index > 0
                  index > 0
                  && <MusicCard
                    key={ track.trackId }
                    trackName={ track.trackName }
                    previewUrl={ track.previewUrl }
                    trackId={ track.trackId }
                    trackInfo={ track }
                  />
                ))}
              </section>
            </>
          )}
        <Footer />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
