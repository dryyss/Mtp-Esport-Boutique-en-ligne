import React, { useState } from 'react';
import Fuse from 'fuse.js'
import { useSelector } from 'react-redux';
import { SEARCH_QUERY } from '../constants/routes';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const [displayResults, setDisplayResults] = useState(false);
  const productList = useSelector(state => state.productList);
  const {products = []} = productList;

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`${SEARCH_QUERY}=${name}`);
  };
  const onChangeInput = (e) => {
    setDisplayResults(true);
    setName(e.target.value);
  };
  const onClick = (item) => {
    setDisplayResults(false);
    setName(item.name);
  }

  const options = {
    includeScore: true,
    isCaseSensitive: true,
    keys: ['name', 'category']
  }
  
  const fuse = new Fuse(products, options)
  const results = fuse.search(name)

  return (
    <div className="search">
      <form onSubmit={submitHandler}>
        <input
          autoComplete="off"
          value={name}
          type="text"
          name="query"
          placeholder="Recherche..."
          onChange={onChangeInput}
        />
        <div className="actions">
          {!!name.length && <i className="fa fa-times" onClick={() => setName('')} />}
          <i className="fa fa-search" onClick={submitHandler} />
        </div>
      </form>
      {displayResults && (
        <div className="results">
          {results.map((product) => (
            <div
              key={product.item._id}
              onClick={() => onClick(product.item)}
            >
              {product.item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}