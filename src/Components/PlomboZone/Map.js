import React from 'react';
import PropTypes from 'prop-types';

import './PlomboZone.css';

const Map = ({ page }) => {
  const images = {
    lookingFor: { path: require('./assets/baseMap.jpg'), alt: 'Carte de base' },
    lookingForSpareParts: { path: require('./assets/wayToSpareParts.gif'), alt: 'Chemin vers le comptoir' },
    lookingForSanitary: { path: require('./assets/baseMap.jpg'), alt: 'Chemin vers le sanitaire' },
    lookingForKitchen: { path: require('./assets/baseMap.jpg'), alt: 'Chemin vers les cuisines' },
    lookingForHeating: { path: require('./assets/baseMap.jpg'), alt: 'Chemin vers le chauffage' },
  }

  return (<img src={images[page].path} alt={images[page].alt} />)
}

Map.propTypes = {
  page: PropTypes.string.isRequired
}

export default Map