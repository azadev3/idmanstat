import React from 'react'
import { Wrapper } from './components/Wrapper'
import TopHeader from './components/topheader/TopHeader'
import SecondHeader from './components/secondheader/SecondHeader'
import Container from './components/container/Container'
import Footer from './components/footer/Footer'
import { useRegisterContext } from './context/RegisterContext'
import Index from './components/loginregister/Index'
import LazyLoadingAnimation from './components/loadingandlazy/LazyLoadingAnimation'
import { useTeamSelectModal } from './context/RegisterOptionContext'
import TeamModal from './components/loginregister/optionspage/TeamModal'
import LigModal from './components/loginregister/optionspage/LigModal'
import { useContactModal } from './context/ContactUsModal'
import ContactModal from './components/footer/ContactModal'
import { ModalOverlayStyle, ModalOverlayWarningMsg } from './styles/ModalBackgroundStyle'
import { useFixtureModal } from './context/MatchFixturesModal'
import FixtureModal from './components/container/HomePage/uitils/ContentUitils/ContentRoutes/FixtureModal'
const LazyHomePage = React.lazy(() => import('./components/container/HomePage/Homepage')); //lazy loading at the homepage container


const App = () => {
  
  //global profile edit modal
  const { popup } = useRegisterContext(); 
  
  //team modal after user profile editing, and true this modal if user clicked "SELECT YOUR FAVOURITE TEAM"
  const { teamModal, ligModal } = useTeamSelectModal(); 

  //contact modal
  const { contact } = useContactModal();


  //fixture modal on the livegames content
  const { fixtureModal } = useFixtureModal();

  return (
    <React.Fragment>
      {/* REGISTER-LOGIN POPUP MODAL IF POPUP TRUE (SEE: RegisterContext.tsx) */}
      {popup && <Index />}

      {teamModal && <TeamModal />}

      {ligModal && <LigModal />}

      {contact && <div style={ModalOverlayStyle}><ContactModal /></div>}

      {fixtureModal && <div style={ModalOverlayWarningMsg}><FixtureModal /></div>}

  
    <Wrapper>
      <TopHeader />
      <SecondHeader />
      <Container>
        <React.Suspense fallback={<LazyLoadingAnimation />}>
        <LazyHomePage />
        </React.Suspense>
      </Container>
      <Footer />
    </Wrapper>
    </React.Fragment>
  )
}

export default App