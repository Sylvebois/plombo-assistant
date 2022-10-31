import React, { Component } from 'react';
import Speech from 'react-speech';
import PropTypes from 'prop-types';

import { PLOMBOSPEECH } from './text';

class PlomboSpeech extends Component {
  constructor(props) {
    super(props);
    this.playText = React.createRef();
  }

  componentDidMount() {
    this.playText.current.play()
  }

  componentDidUpdate() {
    this.playText.current.play()
  }

  render() {
    return (
      <Speech
        text={PLOMBOSPEECH[this.props.page]}
        textAsButton={true} 
        //pitch={2}
        lang="Fr-BE"
        displayTextAsButton={true}
        ref={this.playText}
      />
    )
  }
}

PlomboSpeech.propTypes = {
  page: PropTypes.string.isRequired
}

export default PlomboSpeech;