import React, { SetStateAction } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { TeamType } from "./TeamModal";
import LazyLoadingTeamItemsAnim from "../../loadingandlazy/LazyLoadingTeamItemsAnim";
const LazyLoadTeamItems = React.lazy(() => import('./Teams'));

type PropsType = {
  teams: TeamType[];
  setSelectedCountry: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCountry: string | null;
  selectedCountryFlag: string | null;
};

//teams in the countries
const TeamsAndLigsContainer = ({ setSelectedCountry, teams, selectedCountry, selectedCountryFlag }: PropsType) => {

  return (
    <div className="teams-and-ligs-container">
      <div className="toptitle">
        <div className="sidebar-left-title" onClick={() => setSelectedCountry(null)}>
          <FaChevronLeft id="lefticon" />
          <span>Hamısı</span>
        </div>

        <div className="team-title-right">
          <div className="img-wrapper">
            <img src={selectedCountryFlag ? selectedCountryFlag : ""} alt="ups.." />
          </div>
          <span>{selectedCountry}</span>
        </div>
      </div>

      <div className="bottom-area-in-main-area">
        <React.Suspense fallback={<LazyLoadingTeamItemsAnim />}>
          <LazyLoadTeamItems teams={teams}/>
        </React.Suspense>
      </div>
    </div>
  );
};

export default TeamsAndLigsContainer;
