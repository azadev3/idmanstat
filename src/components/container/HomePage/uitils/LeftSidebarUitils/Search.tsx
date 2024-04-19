import React from 'react'
import '../../../../../styles/container/container.scss';

const Search = ({handleSearch}:{handleSearch: (e:React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <div className="sidebar-search-area">
      <input 
      type='search' 
      alt='input' 
      placeholder='Siyahıda Axtar'
      onChange={handleSearch}
      />
    </div>
  )
}

export default Search