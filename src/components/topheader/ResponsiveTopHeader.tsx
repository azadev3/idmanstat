import React from 'react'
import './responsiveheader.scss';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import { useHamburgerContext } from '../../context/responsivecontext/HamburgerContext';
import '../../styles/responsive/responsive.css';

const ResponsiveTopHeader = () => {

     const { toggleHamburgerMenu, hamburgerMenu } = useHamburgerContext();

  return (
     <React.Fragment>
     {hamburgerMenu && <HamburgerMenu />}
    <div className='top-header-responsive'>
     <div className="left">
          <div className="hamburger-icon">
               <img src='./responsive/listiconpng.png' alt='hamburger-icon'
               onClick={toggleHamburgerMenu}
               />
          </div>

          <div className="idmanstat-logo-icon">
               <Link to='/' id='img'>
               <img src="./responsive/iconidmanstat.svg" alt="icon-idmanstat" />
               </Link>
          </div>
     </div>

     <div className="right">
          <div className="profile">
               <img src="./responsive/profiletemplate.svg" alt="user-profile" />
          </div>

          <div className="star-fav">
               <img src="./responsive/favouritestaricon.svg" alt="fav-star-icon" />
          </div>

          <div className="search">
               <img src="./responsive/searchicon.svg" alt="search-icon" />
          </div>
     </div>
    </div>
    </React.Fragment>

  )
}

export default ResponsiveTopHeader