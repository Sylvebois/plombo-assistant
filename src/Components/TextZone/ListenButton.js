const ListenButton = ({ listenState, handleClick }) => {
    return(
      <button 
      className={'listenButton' + (listenState? ' listening' : '')}
      onClick={handleClick}>
        test
      </button>
    );
  };

export default ListenButton;