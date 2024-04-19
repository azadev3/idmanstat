import React from 'react'
import '../../../../../styles/userprofile/userprofile.scss';
import { Link } from 'react-router-dom';
import { useNavigatorContext } from '../../../../../context/NavigatorContextOnTheContentItems';
import Flow from './mainpageroutes/Flow';
import Cup from './mainpageroutes/Cup';
import Fav from './mainpageroutes/Fav';
import Liked from './mainpageroutes/Liked';
import News from './mainpageroutes/News';

type navTypeInMainPage = {
  id: number, 
  title: string,
}

const Mainpage = () => {

  const [hide, setHide] = React.useState<boolean>(false);
  const hideNotification = () => {
    setHide(!hide);
  }

  //navigation on main page 
  const NavItemsInMainPage:navTypeInMainPage[] = [
    {
      id: 1,
      title: 'Axış',
    },
    {
      id: 2,
      title: 'Kupon',
    },
    {
      id: 3,
      title: 'Favorit',
    },
    {
      id: 4,
      title: 'Bəyəndim',
    },
    {
      id: 5,
      title: 'Xəbər',
    },
  ]

  const { activePageActiving, navigatorActiving, toggleNavigatorActiving } = useNavigatorContext();


  //active page rendered routes components: 
  const RenderActivePageRoutes = () => {
    return (
      navigatorActiving === 'Axış' ? (
        <Flow />
      )
      : navigatorActiving === 'Kupon' ? (
        <Cup />
      )
      : navigatorActiving === 'Favorit' ? (
        <Fav />
      )
      : navigatorActiving === 'Bəyəndim' ? (
        <Liked />
      )
      : navigatorActiving === 'Xəbər' ? (
        <News />
      ) : null
    );
  }
  
  return (
    <div className="main-page-profile-content">
      <div className='activing'>
        <div className='header-area'>
          <span id='title'>Aktivlik</span>
          <div className='hide-notifications'>
            <span>Bildirişləri Gizlə</span>
            <div className='notification-box'
            style={{background: hide ? 'rgb(90, 223, 90)' : ''}}
            >
              <span 
              onClick={() => hideNotification()} 
              className={hide ? 'rectangle-open' : 'rectangle-close'}
              >
              </span>
            </div>
          </div>
        </div>

        <div className='content-activing'>
          <div className='top-navigation'>
          {NavItemsInMainPage.map((items) => (
            <Link to='' 
            style={{
              backgroundColor: 
              items.id === 1 && activePageActiving === 'Axış' ? '#292744' :
              items.id === 2 && activePageActiving === 'Kupon' ? '#292744' :
              items.id === 3 && activePageActiving === 'Favorit' ? '#292744' : 
              items.id === 4 && activePageActiving === 'Bəyəndim' ? '#292744' : 
              items.id === 5 && activePageActiving === 'Xəbər' ? '#292744' : "",
              color: 
              items.id === 1 && activePageActiving === 'Axış' ? '#fff' :
              items.id === 2 && activePageActiving === 'Kupon' ? '#fff' :
              items.id === 3 && activePageActiving === 'Favorit' ? '#fff' : 
              items.id === 4 && activePageActiving === 'Bəyəndim' ? '#fff' : 
              items.id === 5 && activePageActiving === 'Xəbər' ? '#fff' : "",
              
            }}
            key={items.id} 
            className='links'
            onClick={() => toggleNavigatorActiving(items.title)}
            >
              {items.title}
            </Link>
          ))}
          </div>

          <div className='rendered-comp'>
            {/* <img src='./empty.svg' alt='empty-icon' />
            <span>Hal-hazırda bura boşdur.</span> */}
            {RenderActivePageRoutes()} 
          </div>
        </div>
      </div>

      <div className='about-me'>
            <div className="about">
              <div className='top-title'>
                <span>Haqqımda</span>
              </div>

              <div className='informations'>
                <div className='country-me'>
                  <img src='./azflag.svg' alt='azflag' />
                  <article className="title">
                  <span>{localStorage.getItem('nationality')}</span>
                  <span id='country'>Ölkə</span>
                  </article>
                </div>

                <div className='register-date'>
                  <strong>{localStorage.getItem('reg_date')}</strong>
                  <span>Qeydiyyat Tarixi</span>
                </div>
              </div>
            </div>

            <div className='connect-discussion'>
              <div className='input-area'>
                <img src='./profile.svg' alt='user-profile' />
                <div className='input'>
                <input type='text' name='text' placeholder='Müzakirəyə Qoşul' />
                <img src="./inputimg.svg" alt="input-image" />
                </div>
              </div>
            </div>
      </div>

    </div>
  )
}

export default Mainpage