import React from 'react'
import '../../../styles/newspage/news.scss';
import TopHeader from '../../topheader/TopHeader';
import SecondHeader from '../../secondheader/SecondHeader';
import { TopNavigation } from '../HomePage/uitils/TopNavigation';
import NewsContainer from './uitils/NewsContainer';
import Footer from '../../footer/Footer';
import { ModalOverlayStyle } from '../../../styles/ModalBackgroundStyle';
import { useContactModal } from '../../../context/ContactUsModal';
import ContactModal from '../../footer/ContactModal';

const NewsPage = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const { contact } = useContactModal();

  return (
    // news page
    <div className='news-container'>
      {contact && <div style={ModalOverlayStyle}><ContactModal /></div>}

     <TopHeader />
     <SecondHeader />
     <TopNavigation>
       <img src='./footballicon.svg' alt='football-icon'/>
       / Tips
     </TopNavigation>
     <NewsContainer />

     <Footer />
    </div>
  )
}

export default NewsPage