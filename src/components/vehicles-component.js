import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicle: ''
    };
  }

  componentDidMount() {
    this.props.isVehicleSelected(false);
  }

  vehicleSelected = (e, selectedVehicle) => {
    this.props.disablePlanetsSelection(true);
  
    if (this.state.selectedVehicle) {
      this.props.deselectVehicle(this.state.selectedVehicle);
    }

    this.setState({ selectedVehicle });
    this.props.selectVehicle(selectedVehicle);
    this.props.isVehicleSelected(true);
  }

  isRadioButtonChecked = vehicle => this.state.selectedVehicle && vehicle.name === this.state.selectedVehicle.name;
    

  render() {
    const { planet, vehicles } = this.props;
    const availableVehicles = vehicles.filter(vehicle => vehicle.max_distance >= planet.distance);

    return (
      <div className="vehicles-container">
        {availableVehicles.map(vehicle => 
          (this.isRadioButtonChecked(vehicle) || vehicle.total_no > 0) && <div className="vehicles-container__option" key={vehicle.name}>
            <input type="radio" name={planet.name} checked={this.isRadioButtonChecked(vehicle)} onChange={e => this.vehicleSelected(e, vehicle)} value={vehicle} />
              <span>{`${vehicle.name}(${vehicle.total_no})`}</span>
          </div>)}
      </div>
    );
  }
}

Vehicles.propTypes = {
  planet: PropTypes.object.isRequired,
  vehicles: PropTypes.array.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  deselectVehicle: PropTypes.func.isRequired,
  isVehicleSelected: PropTypes.func.isRequired,
  disablePlanetsSelection: PropTypes.func.isRequired
};