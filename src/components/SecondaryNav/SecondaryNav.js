import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SecondaryNav.css';

class SecondaryNav extends Component {
  render() {
    return (
      <nav className='secondary-nav'>
        <ul className='flex-container'>
          <li className={this.props.active === 'perpetual-calendar' ? 'active' : ''} onClick={() => {this.props.update('perpetual-calendar')}}>
            <span>Calendars</span>
          </li>
          <li className={this.props.active === 'dials' ? 'active' : ''} onClick={() => {this.props.update('dials')}}>
            <span>Dials</span>
          </li>
          <li className={this.props.active === 'day-night-indicator' ? 'active' : ''} onClick={() => {this.props.update('day-night-indicator')}}>
            <span>Day/Night Indicator</span>
          </li>
          <li className={this.props.active === 'manual-time' ? 'active' : ''} onClick={() => {this.props.update('manual-time')}}>
            <span>Manual Time</span>
          </li>
          <li className={this.props.active === 'minute-repeater' ? 'active' : ''} onClick={() => {this.props.update('minute-repeater')}}>
            <span>Minute Repeater</span>
          </li>
          <li className={this.props.active === 'moonphase' ? 'active' : ''} onClick={() => {this.props.update('moonphase')}}>
            <span>Moonphase</span>
          </li>
          <li className={this.props.active === 'power-reserve' ? 'active' : ''} onClick={() => {this.props.update('power-reserve')}}>
            <span>Power Reserve</span>
          </li>
        </ul>
      </nav>
    );
  }
}

SecondaryNav.propTypes = {
  active: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default SecondaryNav;
