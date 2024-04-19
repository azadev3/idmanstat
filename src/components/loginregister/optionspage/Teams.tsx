import React from "react";
import { TeamType } from "./TeamModal";
import { useAddTeamContext } from "../../../context/AddTeamContext";

type PropsType = {
  teams: TeamType[];
};

const Teams = ({ teams }: PropsType) => {
  const { addFavouriteTeam, addTeam } = useAddTeamContext();

  
  //selected teams add to the localstorage
  React.useEffect(() => {
    const data = JSON.stringify(addTeam);
    localStorage.setItem('favteams', data);
  }, [addTeam])

 



  return (
    <div className="right-teams">
      {teams.map((teams) => (
        <div
          key={teams.id}
          className={`team-wrapper ${addTeam.some(team => team[0] === teams.name) ? "added" : ""}`}
          onClick={() => addFavouriteTeam(teams.name, teams.logo)}>
          <img src={teams.logo} alt="" />
          <span>{teams.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Teams;
