import React from 'react'
import '../../styles/lazyloading.scss';

const LazyLoadingTeams = () => {
  return (
    <div className='lazy-loading-teams'>
     {[...Array(15)].map((_, items) => (
          <div key={items}></div>
     ))}
     </div>
  )
}

export default LazyLoadingTeams