import React from 'react'
import '../../../../../styles/container/container.scss';
import { HeaderBottomNavType } from '../../../../../types/ContentTypes';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useNavigatorContext } from '../../../../../context/NavigatorContextOnTheContentItems';

const Header = () => {
  

  const NavigationHeaderContentItems:HeaderBottomNavType[] = [
    {
      id: 1,
      title: 'Oyunlar',
    },
    {
      id: 2,
      title: 'Xəbərlər',
    },
    {
      id: 3,
      title: 'Kuponlar',
    },
    {
      id: 4,
      title: 'Əmsal',
    },
  ]

  //Navigations on the content items
  const { toggleNavigator, activePage } = useNavigatorContext();

  //if navigator === (anything path?) rendered path;
  const checkNavigatorContent = (id:number) => {
    if(id === 1){
      toggleNavigator('oyunlar');
    } else if (id === 2){
      toggleNavigator('xeberler');
    } else if (id === 3){
      toggleNavigator('kuponlar');
    } else if (id === 4){
      toggleNavigator('emsal');
    }
  }



  return (
    <div className='header-content'>
      <div className='head'>
        <div className='left'>
          <img src='./ball2.svg' alt='ball' loading='lazy'/>
          <span>Futbol</span>
        </div>
        <div className='right'>
          <span>Təqdim edir</span>
        </div>
      </div>

      <div className="navigation-header-content">
         {NavigationHeaderContentItems.map((item) => (
          <Link to='' key={item.id} className='links'
          onClick={() => checkNavigatorContent(item.id)}
          style={{
            backgroundColor: 
            item.id === 1 && activePage === 'oyunlar' ? '#484564' :
            item.id === 2 && activePage === 'xeberler' ? '#484564' :
            item.id === 3 && activePage === 'kuponlar' ? '#484564' : 
            item.id === 4 && activePage === 'emsal' ? '#484564' : undefined,
            borderTop: 
            item.id === 1 && activePage === 'oyunlar' ? '3px solid #dbd644' :
            item.id === 2 && activePage === 'xeberler' ? '3px solid #dbd644' :
            item.id === 3 && activePage === 'kuponlar' ? '3px solid #dbd644' : 
            item.id === 4 && activePage === 'emsal' ? '3px solid #dbd644' : undefined
          }}
          >
            {item.title}
          </Link>
         ))}
      </div>
 

    </div>
  )
}

export default Header