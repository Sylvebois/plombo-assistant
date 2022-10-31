import React from 'react';
import PropTypes from 'prop-types';

import { USERANSWERS } from './text';

import './TextZone.css';

const PlomboText = ({ page, onClick }) => {
  return (
    <div className="answerText">
      { USERANSWERS[page].map(({ id, text, navTo }) => (<button key={id} onClick={() => onClick(navTo)}>{text}</button>))}
    </div>
  );
}

PlomboText.propTypes = {
  page: PropTypes.string.isRequired
}

export default PlomboText;
