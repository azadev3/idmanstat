import React from "react";
import "../../../../../styles/container/container.scss";
import { PopiLigType, otherLigs } from "../../../../../types/PopularLigTypes";
import { Link } from "react-router-dom";
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import axios from "axios";
import { VList } from "virtua";
import { useLigApi } from "../../../../../context/LigContext";
import { useLiveMatchShowContext } from "../../../../../context/AccordingLeagueLiveMatchs";
import LoadingAnimInGames from "../../../../loadingandlazy/LoadingAnimInGames";

export interface League {
  country: string,
  aze_name: any,
  type: string,
  logo: string,
  name: string,
  id: any,
}

const LigsWrapper = ({searchedItems}:{searchedItems:string}) => {
  //close and open the icons
  const [open, setOpen] = React.useState<string>("");
  const [openMore, setOpenMore] = React.useState<string>("closed");

  //click and change state
  const handleToggle = (value: string) => {
    setOpen(value);
  };

  //click and change state
  const handleToggleMore = (value: string) => {
    setOpenMore(value);
  };

  //GET LEAGUES from API
  const { fetchDataLeague, mainLigs } = useLigApi();
  const [loadingLeagues, setLoadingLeagues] = React.useState<boolean>(false);
  React.useEffect(() => {
    setLoadingLeagues(fetchDataLeague.isLoading);
  }, [fetchDataLeague.isLoading]);

  //if user clicked any league, set live games content on according to league live games
  const { setShowed, setSelectedIndex, setLigidForLiveMatchUpdated, setLiveGamesByLeagueClicked } = useLiveMatchShowContext();

  const [activedLig, setActivedLig] = React.useState<{[key:number]: boolean}>({});
  
  const handleActive = (index:number) => {
    setActivedLig(() => ({
      [index]: true
    }));
  }
  
  const showLiveMatchByLeagues = (index:number, ligname:string) => {
    setShowed({[index]: true});
    setSelectedIndex(index);
    setLigidForLiveMatchUpdated(ligname);
  }


  //If user select on left sidebar in anyone leage, or country leage running this function
  const setLiveGames = async (ligID:number | string) => {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: {
        live: 'all',
        league: ligID
      },
      headers: {
        'X-RapidAPI-Key': '698e7cd394msha86e95346496330p10602ejsn518dfc936671',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      if(response.data) {
        console.log(response.data);
        setLiveGamesByLeagueClicked(response.data.response);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log('lige gore live games endpoint err', error);
    }
  }

  //searched leagues
  const filteredLeagues = mainLigs.filter((lig: any) => lig.name.toLowerCase().includes((searchedItems || '').toLowerCase()));

  return (
    <div className="sidebar-pop-ligs">
      {/* TOP TITLE */}
      <div className="top-titles">
        {open === "closed" ? (
          <MdOutlineKeyboardArrowDown id="open" onClick={() => handleToggle("opened")} />
        ) : (
          <MdOutlineKeyboardArrowUp id="close" onClick={() => handleToggle("closed")} />
        )}

        <strong id="title">
          Məşhur Ligalar <MdOutlineStar id="staricon" />
        </strong>
        <span id="sec-title">Futbol</span>
      </div>

      {/* TOP LIGS (important) */}
      <div className={`ligs ${open === "closed" ? "ligs-deactive" : ""}`}>
         {loadingLeagues ? <LoadingAnimInGames /> : ''}

         {searchedItems && filteredLeagues.length === 0 ? (
          <span className="no-find-item">Heçnə tapılmadı</span>
         ) : (
        <VList style={{ height: "400px" }}>
         {filteredLeagues.map((ligs, index) => (
            <Link to="" key={index} className="links"
            style={{background: activedLig[index] ? 'rgba(218, 211, 211, 1)' : ''}} 
            onClick={() => {
              showLiveMatchByLeagues(index, ligs.id);
              setLiveGames(ligs.id);
              handleActive(index);
            }}>
              <img src={ligs.logo} alt="ligs-icon" style={{ width: "6%" }} />
              {ligs.name}
            </Link>
          ))}
        </VList>
         )}
      </div>

     
    </div>
  );
};

export default LigsWrapper;
