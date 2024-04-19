import React from 'react'
import './responsivenewcomponent.scss';
import { Link } from 'react-router-dom';
import { IoFootballOutline, IoNewspaperOutline} from "react-icons/io5";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { GiCartwheel } from "react-icons/gi";
import { MdOutlineContactSupport } from "react-icons/md";

type navType = {
     id: number,
     title: string,
     icon: any
}

const NewComponentResponsive = () => {

     const topNavigationItems:navType[] = [
          {id: 1, title: 'Nəticələr', icon: <IoFootballOutline />},
          {id: 2, title: 'Xəbərlər', icon: <IoNewspaperOutline />},
          {id: 3, title: 'Əmsallar', icon: <TbSortAscendingNumbers />},
          {id: 4, title: 'Kuponlar', icon: <GiCartwheel />},
     ]

     const [active, setActive] = React.useState<{[key: number]: boolean}>({});

const handleActiveNav = (id: number) => {
  setActive((prevActive) => ({
    ...Object.fromEntries(
      Object.entries(prevActive).map(([key, value]) => [key, parseInt(key) === id])
    )
  }));
};
  return (
    <div className='new-component-responsive'>
          <div className="top-navigations-in-new-component">
          {topNavigationItems.map((items) => (
               <Link to='' className={`link-in-new-component ${active[items.id] ? 'activedlink' : ''}`} key={items.id} onClick={() => handleActiveNav(items.id)}>
                    <span id='icon-new-component-navigator'>{items.icon}</span>
                    <span>{items.title}</span>
               </Link>
          ))}
          </div>

          <div className="share-your-idea">
               <div className="left">
                    <h4>Fikirlərini Bölüş</h4>
                    <span>Daha yaxşı ola bilmək üçün sənin fikirlərinə ehtiyacımız var.</span>
               </div>
               <div className="right">
                    <button className="contact-btn">
                         Əlaqə
                         <MdOutlineContactSupport id='contact-icon'/>
                    </button>
               </div>
          </div>

          <div className="bottom">
               <span>© 2024 Oddspedia - All Rights Reserved.</span>
          </div>
    </div>
  )
}

export default NewComponentResponsive