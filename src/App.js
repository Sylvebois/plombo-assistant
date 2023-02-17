import { useState } from 'react';
import Map from './Components/PlomboZone/Map';
import PlomboImg from './Components/PlomboZone/PlomboImg';
import PlomboSpeech from './Components/TextZone/PlomboSpeech';
import PlomboText from './Components/TextZone/PlomboText';
import Dictaphone from './Components/TextZone/Dictaphone';
import ListenButton from './Components/TextZone/ListenButton';

import './App.css';

const App = () => {
  const [page, setPage] = useState('home');
  const [listen, setListen] = useState(false);

  const navClick = navTo => setPage(navTo);
  const listenClick = () => setListen(!listen);

  let borderStyle = '10px solid rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';

  return (
    <div className="App">
      {
        page.startsWith('lookingFor') ? <Map page={page} /> : <PlomboImg page={page} />
      }
      <ListenButton listenState={listen} handleClick={listenClick} />
      <div className="textZone" style={{ border: borderStyle }}>
        <PlomboSpeech page={page} />
        <div className="choiceButton">
          <PlomboText page={page} handleClick={navClick} />
        </div>
      </div>
      <Dictaphone page={page} onClick={navClick} />
    </div>
  );
}

export default App;
