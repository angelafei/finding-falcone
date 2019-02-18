import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

import { Vehicles } from '../components/vehicles-component';

export class PlanetSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedPlanet: '',
      disablePlanetsSelection: false,
      disableVehiclesSelection: true
    };
  }

  componentDidMount() {
    this.props.isPlanetSelected(false);
  }

  findSelectedPlanet = value => this.props.planets.filter(planet => planet.name === value)[0];

  onInputChange = (e, value) => {
    this.setState({ value, disableVehiclesSelection: true });
    const planet = this.props.planets.find(planet => planet.name === value);
    if (!planet) this.props.deselectPlanet(this.state.selectedPlanet);
  }

  onPlanetSelect = value => {
    const selectedPlanet = this.findSelectedPlanet(value);
    this.setState({ value, selectedPlanet, disableVehiclesSelection: false });
    this.props.isPlanetSelected(true);
    this.props.selectPlanet(selectedPlanet);
  }

  sortPlanetsByName() {
    const sortedPlanets = this.props.planets.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedPlanets;
  }

  disablePlanetsSelection = (bool) => {
    this.setState({ disablePlanetsSelection: bool });
  }

  render() {
    return (
      <div className="planet-selection-container">
        <Autocomplete
          items={this.sortPlanetsByName()}
          shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.name}>
              {item.name}
            </div>
          }
          getItemValue={item => item.name}
          value={this.state.value}
          onChange={e => this.onInputChange(e, e.target.value)}
          onSelect={this.onPlanetSelect}
          inputProps={{ disabled: this.state.disablePlanetsSelection }}
        />
        {!this.state.disableVehiclesSelection && 
          <Vehicles 
            planet={this.state.selectedPlanet} 
            vehicles={this.props.vehicles} 
            selectVehicle={this.props.selectVehicle} 
            deselectVehicle={this.props.deselectVehicle}
            isVehicleSelected={this.props.isVehicleSelected}
            disablePlanetsSelection={this.disablePlanetsSelection}
          />}
      </div>
    );
  }
}

PlanetSelection.propTypes = {
  planets: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  selectPlanet: PropTypes.func.isRequired,
  deselectPlanet: PropTypes.func.isRequired,
  isPlanetSelected: PropTypes.func.isRequired,
  isVehicleSelected: PropTypes.func.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  deselectVehicle: PropTypes.func.isRequired,
};