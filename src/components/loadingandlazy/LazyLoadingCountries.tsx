import React from 'react'
import '../../styles/lazyloading.scss';

const LazyLoadingCountries = () => {
  return (
    <div className='lazy-loading-countries'>
      <div className='list'>
          {[...Array(14)].map((_, index) => (
               <ul key={index}>
                    <li id='none2'></li>
                    <li id='list'></li>
               </ul>
          ))}
      </div>
    </div>
  )
}

export default LazyLoadingCountries