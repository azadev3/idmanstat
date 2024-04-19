import React, { SetStateAction } from 'react'
import '../../styles/secondheader/secondheader.scss';
import { NavigationType } from '../../types/SecondHeaderTypes';
import { Link } from 'react-router-dom';
import { useSecHeadNavContext } from '../../context/SecondHeaderNavigationContext';
import { useHamburgerContext } from '../../context/responsivecontext/HamburgerContext';

type PropItems = {
  hiddenItems: boolean,
  setHiddenItems: React.Dispatch<SetStateAction<boolean>>;
}

const Navigation = ({hiddenItems, setHiddenItems}: PropItems) => {

  const { setHamburgerMenu } = useHamburgerContext();
  
  const Navigations:NavigationType[] = [
    {
      id: 1,
      title: 'Futbol',
      icon: '../secondheadericons/nav1icon.svg',
      notification: '300',
    },
    {
      id: 2,
      title: 'Basketbol',
      icon: '../secondheadericons/nav2icon.svg',
      notification: '300',
    },
    {
      id: 3,
      title: 'Tenis',
      icon: '../secondheadericons/nav3icon.svg',
      notification: '300',
    },
    {
      id: 4,
      title: 'Voleybol',
      icon: '../secondheadericons/nav4icon.svg',
      notification: '300',
    },
    {
      id: 5,
      title: 'Handbol',
      icon: '../secondheadericons/nav5icon.svg',
      notification: '300',
    },
    {
      id: 6,
      title: 'Kuponlar',
      icon: '../secondheadericons/nav6icon.svg',
      notification: '300',
    },
    {
      id: 7,
      title: 'Üzvlük',
      icon: '../secondheadericons/nav7icon.svg',
    },
    {
      id: 8,
      title: 'Kuponlar Yaz',
      icon: '../secondheadericons/nav8icon.svg',
    },
  ]
  
  //navigator according to navigation pages 
  //get on the link element
  const { setNavigate, navigate } = useSecHeadNavContext(); 
  //update setNavigate state according to getNavLink params

  const getNavLink = (navs:NavigationType) => {  
    if(navs.id === 1) {
      return '/';
    } else if (navs.id === 2){
      return '/basketball';
    } else if (navs.id === 3) {
      return '/tennis';
    } else if (navs.id === 4) {
      return '/volleyball';
    } else if (navs.id === 5) {
      return '/handball';
    } else if (navs.id === 6) {
      return '/tips';
    } else if (navs.id === 7){
      return '';
    } else if (navs.id === 8) {
      return '';
    }
    return '';
  };

  //if secondheader sized shorting the 968pixels hidden other navigation links 
  React.useEffect(() => {
    const secondHeaderResponsiveHiddenedItemsFunc = () => {
      if(window.innerWidth <= 968) {
        setHiddenItems(true);
      } else {
        setHiddenItems(false);
      }
    }

    secondHeaderResponsiveHiddenedItemsFunc();

    window.addEventListener('resize', secondHeaderResponsiveHiddenedItemsFunc);
    return () => window.removeEventListener('resize', secondHeaderResponsiveHiddenedItemsFunc);
  }, [hiddenItems]);
  

  return (
    <div className={`navigations-items ${hiddenItems ? 'hiddenedNavItems' : ''}`}>
      {Navigations.map((navs) => {
        //links background according to isActive status======
        const isActive = navs.title === navigate; //check matchs
        //active page example (just example)
        const styleProperty = {
          color: '#fff',
          background: '#1a3150',
        }
        const linkStyles = {
          backgroundColor: isActive ? styleProperty.background : '',
          color: isActive ? styleProperty.color : '',
        }
        //links svg icons according to isActive status=====
        const imgElementProperty = 
        isActive && navs.id === 1 ? './whiteicons/ballicon.svg' :
        isActive && navs.id === 2 ? './whiteicons/basketball.svg' :
        isActive && navs.id === 3 ? './whiteicons/tenis.svg' : 
        isActive && navs.id === 4 ? './whiteicons/voleybal.svg' :
        isActive && navs.id === 5 ? './whiteicons/handball.svg' : 
        isActive && navs.id === 7 ? './whiteicons/evene.svg' : 
        isActive && navs.id === 8 ? './whiteicons/cupons.svg' : navs.icon;

        return (
          <Link 
          style={linkStyles}
          to={getNavLink(navs)}
          onClick={() => {setNavigate(navs.title), setHamburgerMenu(false)}}
          className='links' key={navs.id} >
            <img src={imgElementProperty} alt='navicon' />
            {navs.title}
            {navs.id === 7 || navs.id === 8 ? null : <span>{navs.notification}</span>}
          </Link>
        )
      })}
    </div>
  )
}

export default Navigation