import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  selectPlanet,
  deselectPlanet,
  selectVehicle,
  deselectVehicle,
  findResult 
} from '../redux/search-redux';
import { searchSelector } from '../selector/selectors';
import { PlanetSelection } from '../components/planet-selection-component';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlanetNumber: 0,
      isPlanetSelected: false,
      isVehicleSelected: false,
      selectChance: 4,
      timeTaken: 0
    }
  }

  isPlanetSelected = bool => this.setState({ isPlanetSelected: bool });
  isVehicleSelected = bool => this.setState({ isVehicleSelected: bool });

  createPlanetSelectionComponents() {
    const components = [];
    for (let i = 0; i < this.state.selectChance; i++){
      components.push(
        this.state.selectedPlanetNumber === i && 
        <div className="selection-container" key={i}>
          <span className="selection-container__title">{`destination ${i+1}`}</span>
          <PlanetSelection
            planets={this.props.planets}
            vehicles={this.props.vehicles}
            selectPlanet={this.props.selectPlanet}
            deselectPlanet={this.props.deselectPlanet}
            isPlanetSelected={this.isPlanetSelected}
            isVehicleSelected={this.isVehicleSelected}
            selectVehicle={this.props.selectVehicle}
            deselectVehicle={this.props.deselectVehicle}
          />
        </div>
      );
    }
    return components;
  }

  nextStep = () => {
    if (this.state.selectedPlanetNumber === this.state.selectChance -1) {
      const planetNames = this.props.selectedPlanets.map(planet => planet.name);
      const vehicleNames = this.props.selectedVehicles.map(vehicle => vehicle.name);
      this.props.findResult(this.props.token, planetNames, vehicleNames);
      this.props.history.push('/result');
    }
    this.setState({ selectedPlanetNumber: this.state.selectedPlanetNumber + 1 });
  }

  getDisplayWords() {
    return this.state.selectedPlanetNumber < this.state.selectChance - 1 ? 'next': 'find falcone';
  }

  render() {
    return (
      <div className="search-container">
        <p className="search-container__title">Select Planets you want to search in:</p>
        {this.props.planets && this.state.selectedPlanetNumber <= 4 && this.createPlanetSelectionComponents()}
        {this.props.timeTaken && <p className="search-container__time-taken">{`Time taken: ${this.props.timeTaken}`}</p>}
        <div className="search-container__button-wrapper">
          <button className="search-container__button button" onClick={this.nextStep} disabled={!this.state.isPlanetSelected || !this.state.isVehicleSelected}>{this.getDisplayWords()}</button>
        </div>
      </div>
    );
  }
}

SearchContainer.propTypes = {
  planets: PropTypes.array,
  vehicles: PropTypes.array,
  token: PropTypes.string,
  selectedPlanets: PropTypes.array,
  selectedVehicles: PropTypes.array,
  timeTaken: PropTypes.number,
  selectPlanet: PropTypes.func.isRequired,
  deselectPlanet:PropTypes.func.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  deselectVehicle: PropTypes.func.isRequired,
  findResult: PropTypes.func.isRequired,
};

export default connect(
  searchSelector,
  {
    selectPlanet,
    deselectPlanet,
    selectVehicle,
    deselectVehicle,
    findResult
  },
)(SearchContainer);