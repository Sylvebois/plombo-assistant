import PropTypes from 'prop-types';

const MapImg = ({ currPage }) => {
  const images = {
    lookingFor: { path: require('../assets/baseMap.jpg'), alt: 'Carte de base' },
    lookingForSpareParts: { path: require('../assets/wayToSpareParts.gif'), alt: 'Chemin vers le comptoir' },
    lookingForSanitary: { path: require('../assets/baseMap.jpg'), alt: 'Chemin vers le sanitaire' },
    lookingForKitchen: { path: require('../assets/baseMap.jpg'), alt: 'Chemin vers les cuisines' },
    lookingForHeating: { path: require('../assets/baseMap.jpg'), alt: 'Chemin vers le chauffage' },
  }

  const style = {
    maxHeight: '45vh',
    maxWidth: '45vw',
    display: 'inline-block',
    verticalAlign: 'middle'
  }

  return (
    <img
      style={style}
      src={images[currPage].path}
      alt={images[currPage].alt}
    />)
}

MapImg.propTypes = {
  currPage: PropTypes.string.isRequired
}

export default MapImg