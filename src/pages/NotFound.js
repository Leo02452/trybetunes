import React, { Component } from 'react';
import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <section data-testid="page-not-found" className="not-found-container">
        <h1 className="not-found-error">404</h1>
        <h2 className="not-found-title">Not Found</h2>
        <p className="not-found-message">Woops. Looks like this page does not exist.</p>
      </section>
    );
  }
}

export default NotFound;
