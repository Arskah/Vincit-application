import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Winners extends Component {
  render() {
    const { winners } = this.props;
    return (
      <div className='winners'>
        {winners.map((winner, index) => {
          return <p key={index}>
            {winner.ip} won at {winner.ts}!
          </p>
        })}
      </div>

    )
  }
}

Winners.propTypes = {
  winners: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Winners
