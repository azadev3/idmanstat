import React from 'react'
import '../../styles/lazyloading.scss';

const LazyLoadingGames = () => {

   

  return (
    <div className='lazy-loading-games'>
     <div className="container-skeleton">
          <div className='content'>

          {[...Array(7)].map((_, index) => (
               <div key={index}>
               <div className='header-skeleton'>
                    <span></span>
                    <span></span>
                   
               </div>
               <div className='section'>
                    {[...Array(10)].map((_, index) => (
                         <span key={index} className='title'>
                         </span>
                    ))}
               </div>
               </div>
          ))}


 
          </div>
     </div>
    </div>
  )
}

export default LazyLoadingGames