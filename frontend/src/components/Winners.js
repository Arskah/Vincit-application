import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Winners extends Component {
  render() {
    const { winners } = this.props;
    return (
      <div>
        <h3>
          All winners:
        </h3>
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
