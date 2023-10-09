import PropTypes from 'prop-types'

import { USERANSWERS } from '../text'

const ChoiceButtons = ({ currPage, handleClick }) => {
  const style = { 
    display: 'block',
    marginTop: '2vh',
    marginBottom: '2vh',
    marginLeft: '1vw',
    marginRight:'1vw',
    fontSize: '3vh',
    backgroundColor: 'darkgrey',
    borderWidth: '0',
    borderRadius: '5px'
  }

  return (<>
    {
      USERANSWERS[currPage].map(({ id, text, navTo }) => (
        <button style={style} key={id} onClick={() => handleClick(navTo)}>
          {text}
        </button>
      ))
    }
  </>)
}

ChoiceButtons.propTypes = {
  currPage: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ChoiceButtons