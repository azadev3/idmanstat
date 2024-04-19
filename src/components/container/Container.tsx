import React from 'react'
import '../../styles/container/container.scss';
import { useRegisterContext } from '../../context/RegisterContext';

type ChildrenType = {
     children: React.ReactNode,
};

const Container:React.FC<ChildrenType> = ({ children }) => {

  
  return (
    <div className="container">
     {children}
    </div>
  )
}

export default Container