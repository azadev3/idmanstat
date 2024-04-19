import React from 'react'
import '../../../../styles/container/container.scss';
import CarouselInner from './RightSidebarUitils/CarouselInner';
import ActiveCups from './RightSidebarUitils/ActiveCups';
import Top10 from './RightSidebarUitils/Top10';
import News from './RightSidebarUitils/News';
import RegisterBanner from './RightSidebarUitils/RegisterBanner';
import SocialMedia from './RightSidebarUitils/SocialMedia';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import '../../../../styles/container/container.scss';
import NewComponentResponsive from './RightSidebarUitils/NewComponentResponsive';

const RightSidebar = () => {

  //if innerwidth shorted is the 968pixels show bottom new component
  const [newComponent, setNewComponent] = React.useState<boolean>(false);

  React.useEffect(() => {
    const resizedNewComponent = () => {
      if(window.innerWidth <= 968) {
        setNewComponent(true);
      } else {
        setNewComponent(false);
      }
    }

    resizedNewComponent();

    window.addEventListener('resize', resizedNewComponent);
 
    return () => window.removeEventListener('resize', resizedNewComponent);
  }, [newComponent])

  return (
    <div className="right-sidebar">
      <CarouselInner />
      <ActiveCups />
      <div className='top-10-title'>
        <span id='rectangle'></span>
        <span id='title'>Top 10 - Analizçilər</span>
        <span id='rectangle'></span>
      </div>
      <Top10 />
      <News />
      <RegisterBanner />
      <SocialMedia />
      {newComponent && <NewComponentResponsive />}
    </div>
  )
}

export default RightSidebar