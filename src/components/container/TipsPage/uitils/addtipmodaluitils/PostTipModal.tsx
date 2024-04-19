import React from "react";
import "../addtipmodaluitils/PostTipModal.scss";
import { IoCloseOutline } from "react-icons/io5";
import { PiCaretDownBold } from "react-icons/pi";
import { FixtureData, useMatchStatusContext } from "../../../../../context/MatchStatusContext";
import { usePostTipModal } from "../../../../../context/PostTipModalContext";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useLigApi } from "../../../../../context/LigContext";

//tip_type: BTS, OU, 1X2, DC

const PostTipModal = ({ selectedlig }: { selectedlig: string | null }) => {
  const { matchstatus } = useMatchStatusContext();
  const { setPostTipModal, selectedOddValue, selectedIndex, setSelectedOddValue } = usePostTipModal();

  //collapse modal
  const [turn, setTurn] = React.useState<boolean>(false);

  const handleCollapse = () => {
    setTurn((prevturn) => !prevturn);
  };

  React.useEffect(() => {
    const post_tip_modal = document.getElementById("post_tip_modal");
    if (post_tip_modal) {
      if (turn) {
        post_tip_modal.style.minHeight = "60px";
      } else {
        post_tip_modal.style.minHeight = "450px";
      }
    }
  }, [turn]);

  const DeleteOdd = (index: any) => {
    setSelectedOddValue((prevValue) => {
      const newValue = { ...prevValue };
      delete newValue[index];
      return newValue;
    });
  };

  const calculateTotalCount = (selectedOddValue: any) => {
    let total = 1;
    Object.keys(selectedOddValue).forEach((value: any, i: any) => {
      const oddValueString = selectedOddValue[value][0];
      const oddValueWithoutOverUnder = oddValueString?.replace("Over:", "")?.replace("Under:", "").trim(); // remove "Over:" and "Under:"
      const oddValue = parseFloat(oddValueWithoutOverUnder);
      console.log(oddValue);
      if (!isNaN(oddValue)) {
        total *= oddValue;
      }
    });
    return total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };


  const ShareTips = async () => {
    
    const api = "http://localhost:8000/flash/api/match-tip/";

    const selected_values = Object.keys(selectedOddValue).map((item: any, i: any) => {
      return selectedOddValue[item];
    });
  
    const token = localStorage.getItem("authtoken");
  
    const postDataArray = [];
  
    for (let i = 0; i < selected_values.length; i++) {
      const value = selected_values[i][0];
      const numVal = parseFloat(value);
      const half = selected_values[i][3];
      const column = selected_values[i][8];
      const type = selected_values[i][9];
      const home_team = selected_values[i][2];
      const away_team = selected_values[i][1];
      const league = selected_values[i][10];
      const country = selected_values[i][11];
  
      const data = {
        home_team: home_team,
        away_team: away_team,
        country: country,
        league: league,
        tip: {
          type: type,
          column: column,
          half: half,
          value: value,
        },
      };
  
      postDataArray.push(axios.post(api, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }));
    }
  
    try {
      const responses = await Promise.all(postDataArray);
  
      for (const response of responses) {
        if (response.status === 200 || response.status === 201) {
          console.log("Post successfully", response.data);
        } else {
          console.log("Bir xeta oldu:", response.status);
        }
      }
        
    } catch (error) {
      console.log("İstekler yapılırken bir hata oluştu:", error);
    }
  };

  
  return (
    <div className="post-tip-modal" id="post_tip_modal">
      <div className={`header-post-tip-modal ${turn ? "turnedposttipmodal" : ""}`}>
        {Object.keys(selectedOddValue).length > 1 ? (
          <div className="added-over-length-odd">
            <div className="wrapper-added-number">
              <img src="oddback.svg" alt="" />
              <span>{Object.keys(selectedOddValue).length}</span>
            </div>
            <span className="title">Təxminin tərkibi</span>
          </div>
        ) : (
          <div className="left">
            <div className="team-logos-wrapper">
              {matchstatus.map((item: FixtureData, index: number | string) => (
                <React.Fragment key={index}>
                  <img src={item?.homelogo} alt={`${index}-homelogo`} />
                  <img src={item?.awaylogo} alt={`${index}-awaylogo`} />
                </React.Fragment>
              ))}
            </div>

            <div className="left-right-col">
              <div className="team-names">
                {matchstatus.map((item: FixtureData, index: number | string) => (
                  <React.Fragment key={index}>
                    <span className="leftteam">{item?.home}</span>
                    <span>-</span>
                    <span className="rightteam">{item?.away}</span>
                  </React.Fragment>
                ))}
              </div>

              <div className="selected-accord-names">
                <span className="accord-name">Təxmin tərkibi: {Object.values(selectedOddValue)}</span>

                <span className="odd-name">{selectedOddValue[selectedIndex]}</span>
              </div>
            </div>
          </div>
        )}

        <div className="right">
          <PiCaretDownBold className="opened" onClick={handleCollapse} />

          <IoCloseOutline className="close-modal" onClick={() => setPostTipModal(false)} />
        </div>
      </div>

      <div className="content-post-tip-modal" style={{ display: turn ? "none" : "flex" }}>
        {Object.keys(selectedOddValue).map((value: any, index: any) => (
          <div className="adding-odd-container" key={index}>
            <div className="left-content">
              <span className="select-value">
                {selectedOddValue[value][7] ? selectedOddValue[value][7] : selectedOddValue[value][0]}
              </span>

              <span className="added-match-time-category">
                {selectedOddValue[value][3] === "allmatch"
                  ? "Bütün maç"
                  : selectedOddValue[value][3] === "firsthalf"
                  ? "1ci Hissə"
                  : selectedOddValue[value][3] === "secondhalf"
                  ? "2ci Hissə"
                  : ""}
              </span>
              <span className="category">
                {selectedOddValue[value][1]} - {selectedOddValue[value][2]}
              </span>
            </div>
            <div className="right-value-content-and-icon">
              <span>{selectedOddValue[value][0]?.replace("Over:", "")?.replace("Under:", "")}</span>
              <IoCloseOutline className="delete-odd" onClick={() => DeleteOdd(value)} />
            </div>
          </div>
        ))}
        {Object.keys(selectedOddValue).length !== 0 && (
          <div className="coefficient-total-count">
            <span className="title-coef">Ümumi Əmsal</span>
            <span className="total-count">{calculateTotalCount(selectedOddValue)}</span>
          </div>
        )}

        {Object.keys(selectedOddValue).length !== 0 && (
          <input
            type="text"
            maxLength={1000}
            placeholder="Təxminzi detallı buradan yaza bilərsiniz. Digər izləyicilər üçün bu maraqlı ola bilər."
          />
        )}
      </div>

      <div className="bottom-post-tip-modal" style={{ display: turn ? "none" : "flex" }}>
        <button className="add-match" onClick={() => setTurn(true)}>
          <div className="icon">
            <FaPlus className="plus-icon" />
          </div>
          maç əlavə et
        </button>

        <button className="share-tip" onClick={ShareTips}>
          paylaş
        </button>
      </div>
    </div>
  );
};

export default PostTipModal;
