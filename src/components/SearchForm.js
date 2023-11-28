import { testQuery } from '../services/ai'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const SearchForm = () => {
  const inputStyle = { width: '90%', height: '30px', display: 'inline-block' }
  const buttonStyle = { width: '8%', height: '35px', display: 'inline-block' }
  return (
    <>
      <label htmlFor="productSearchInput">
        Produit cherché (id Sanidel, description ou référence de la marque):
      </label>
      <br />
      <input type="text" id="productSearchInput" style={inputStyle} />
      <button style={buttonStyle}><FaMagnifyingGlass /></button>
    </>
  );
}

export default SearchForm;