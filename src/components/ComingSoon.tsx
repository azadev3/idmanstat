import React from 'react'
import '../styles/comingsoon.scss';

type PropType = {
  children: React.ReactNode,
}

const ComingSoon:React.FC<PropType> = ({ children }) => {
  return (
    <div className='comingsoon-message'>
      {children}
    </div>
  )
}

export default ComingSoon