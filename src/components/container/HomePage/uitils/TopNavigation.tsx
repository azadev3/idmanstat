import React from 'react'

type childrenType = {
     children: React.ReactNode,
};

export const TopNavigation:React.FC<childrenType> = ({ children }) => {
     return (
          <div className='navigation-top'>
               <span id='nav-title'>{children}</span>
          </div>
     )
}