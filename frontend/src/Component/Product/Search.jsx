import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Search.css';

const Search = () => {
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const [keyword, setKeyword] = useState('');

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`); // Use navigate instead of history.push
    } else { 
      navigate('/products'); // Use navigate instead of history.push
    }
  };

  return (
    <Fragment>
      <form className='SearchBox' onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder='Type to search Product..'
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input type='submit' value='Search' />
      </form>
    </Fragment>
  );
};

export default Search;
