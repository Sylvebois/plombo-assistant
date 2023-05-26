import React from 'react';
import PropTypes from 'prop-types';

import { USERANSWERS } from './text';

import './TextZone.css';

const PlomboText = ({ page, handleClick }) => {
  return (
    <div className="answerText">
      { USERANSWERS[page].map(({ id, text, navTo }) => (<button key={id} onClick={() => handleClick(navTo)}>{text}</button>))}
    </div>
  );
}

PlomboText.propTypes = {
  page: PropTypes.string.isRequired
}

export default PlomboText;
