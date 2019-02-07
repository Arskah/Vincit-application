import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
  render() {
    const { value, onIncrement } = this.props
    return (
      <p>
        Until next win: {value} clicks
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
      </p>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
}

export default Counter
