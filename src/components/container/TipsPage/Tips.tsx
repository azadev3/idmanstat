import React from "react";
import "../../../styles/tipspage/tips.scss";
import TopHeader from "../../topheader/TopHeader";
import SecondHeader from "../../secondheader/SecondHeader";
import RightSidebar from "../HomePage/uitils/RightSidebar";
import TipsContainer from "./uitils/TipsContainer";
import { TopNavigation } from "../HomePage/uitils/TopNavigation";
import { useTipModal } from "../../../context/AddTipModalContext";
import AddTipModal from "./uitils/AddTipModal";
import Footer from "../../footer/Footer";
import { useContactModal } from "../../../context/ContactUsModal";
import { ModalOverlayStyle } from "../../../styles/ModalBackgroundStyle";
import ContactModal from "../../footer/ContactModal";

const Tips = () => {
  //ADD TIP MODAL
  const { tipModal, setModal } = useTipModal();
  
  const { contact } = useContactModal();

  return (
    <React.Fragment>
      {/* OPEN TIP MODAL IF USER CLICKED (TİP ƏLAVƏ ET) */}
      {tipModal && <AddTipModal />}
      {/* if add tip modal open , add opacity other  */}

      {contact && <div style={ModalOverlayStyle}><ContactModal /></div>}

      <div
        className="tips-container"
        style={{
          opacity: tipModal ? "45%" : "100%",
          pointerEvents: tipModal ? "none" : "unset",
        }}>
        <TopHeader />
        <SecondHeader />
        <TopNavigation>
          <img src="./footballicon.svg" alt="football-icon" />/ Tips
        </TopNavigation>
        <TipsContainer />
        <Footer />
      </div> 

    </React.Fragment>
  );
};

export default Tips;
