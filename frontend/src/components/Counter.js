import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class Counter extends Component {
  render() {
    const { value, onIncrement } = this.props
    return (
      <div className="counter">
        <p>
          Until next win: {value} clicks
        </p>
        <button className="button" onClick={onIncrement}>
          WIN!!!
        </button>
      </div>

    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
}

export default Counter
