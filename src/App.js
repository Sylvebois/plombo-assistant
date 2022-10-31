import React, { Component } from 'react';
import Map from './Components/PlomboZone/Map';
import PlomboImg from './Components/PlomboZone/PlomboImg';
import PlomboSpeech from './Components/TextZone/PlomboSpeech';
import PlomboText from './Components/TextZone/PlomboText';
import Dictaphone from './Components/TextZone/Dictaphone';

import './App.css';

class App extends Component {
  state = { page: 'home' }

  handleButtonClick = navTo => {
    this.setState({ page: navTo });
  }

  render() {
    const page = this.state.page;
    let borderStyle = '20px solid rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')';

    return (
      <div className="App">
        {page.startsWith('lookingFor')? <Map page={page} /> : <PlomboImg page={page} />}
        <div className="textZone" style={{ border: borderStyle}}>
          <PlomboSpeech page={page} />
          <div className="choiceButton">
            <PlomboText page={page} onClick={this.handleButtonClick} />
          </div>
        </div>
        <Dictaphone page={page} onClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default App;
