import React, { Component } from 'react';
import Map from './Components/PlomboZone/Map';
import PlomboImg from './Components/PlomboZone/PlomboImg';
import PlomboSpeech from './Components/TextZone/PlomboSpeech';
import PlomboText from './Components/TextZone/PlomboText';
import Dictaphone from './Components/TextZone/Dictaphone';
import ListenButton from './Components/TextZone/ListenButton';

import './App.css';

class App extends Component {
  state = { page: 'home', listening: false }

  handleButtonClick = navTo => this.setState({ page: navTo });

  render() {
    const page = this.state.page;
    const listen = this.state.listening;
    let borderStyle = '10px solid rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')';

    return (
      <div className="App">
        { page.startsWith('lookingFor') ? <Map page={page} /> : <PlomboImg page={page} />}
        <ListenButton page={page} listen={listen} />
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
