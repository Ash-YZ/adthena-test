import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LogSelectionButton extends Component {
  logToConsole = (selected) => {
    console.log(`You clicked: ${selected}`);
  };

  handleClick = () => {
    new Promise((resolve, reject) => {
      const thisSelected = this.props.selected;
      setTimeout(() => this.logToConsole(thisSelected), 5000);
      resolve();
    })
  };

  render() {
    return (
      <button
        type="button"
        onClick={this.handleClick}
      >
        <span> Log my click to console</span>
      </button>
    );
  }
}

LogSelectionButton.propTypes = {
  selected: PropTypes.string.isRequired,
};

export default LogSelectionButton;
