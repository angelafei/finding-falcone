import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { loadPlanetDetails, loadVehiclesDetails, getToken } from '../redux/search-redux';

class SplashContainer extends Component {
  componentDidMount() {
    this.props.loadPlanetDetails();
    this.props.loadVehiclesDetails();
    this.props.getToken();
  }

  render() {
    return (
        <div className="splash-container">
          <h1 className="splash-container__title">Finding Falcone!</h1>
          <Link className="splash-container__link button" to="/search">Start</Link>
        </div>
    );
  }
}

export default connect(
  null,
  {
    loadPlanetDetails,
    loadVehiclesDetails,
    getToken
  },
)(SplashContainer);