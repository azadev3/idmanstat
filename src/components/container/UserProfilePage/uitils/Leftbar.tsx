import React from 'react'
import '../../../../styles/userprofile/userprofile.scss';
import { useAddTeamContext } from '../../../../context/AddTeamContext';
import { useTeamSelectModal } from '../../../../context/RegisterOptionContext';
import { useLigApi } from '../../../../context/LigContext';
import { useChangedBoolean } from '../../../../context/IsChanged';

const Leftbar = () => {

  //if user clicked "Dəyiş" span, and true isChangedBoolean value and 
  //allow user for fav lig or team values changed, deleted or any
  const { setIsChanged } = useChangedBoolean();

  const { fetchDataLeague } = useLigApi();

  //get added teams (favourite) and show in the leftbar;
  const { addTeam } = useAddTeamContext();

  const { setTeamModal, setLigModal } = useTeamSelectModal();

  const [addedTeams, setAddedTeams] = React.useState<string[]>([]);
  const [addedLigs, setAddedLigs] = React.useState<string[]>([]);

  React.useEffect(() => {
    const addedfavteams = localStorage.getItem('favteams');
    if(addedfavteams !== null){
      const parsedData = JSON.parse(addedfavteams);
      setAddedTeams(parsedData); 
    } 
  }, [addTeam]);  

  React.useEffect(() => {
    const addedfavligs = localStorage.getItem('favligs');
    if(addedfavligs !== null){
      const parsedData = JSON.parse(addedfavligs);
      setAddedLigs(parsedData);
    }
  }, []);

  return (
    <div className="left-bar-container">
      <div className='fav-team-add-box'>
        <div className='title'>
          <span>Favorit Komanda</span>
          <span className='change-fav-team' onClick={() => setTeamModal(true)}>Dəyiş</span>
        </div>

        {addedTeams.map((favteams, index) => (
          <div key={index} className='favteam'>
            <div className="logo-wrapper-fav-team">
              <img src={favteams[1]} alt="" />
            </div>
            <span className="fav-team-name">{favteams[0]}</span>
          </div>
        ))}

        <div className="add-button">
          <button onClick={() => setTeamModal(true)}>+</button>
          <span>Əlavə et</span>
        </div>
      </div>

      <div className='fav-lig-add-box'>
        <div className='title'>
          <span>Favorit Liqa</span>
          <span className='change-fav-team' onClick={() => {setLigModal(true), setIsChanged(true), fetchDataLeague()}}>Dəyiş</span>
        </div>

        {addedLigs.map((favligs, index) => (
          <div key={index} className='favteam'>
            <div className="logo-wrapper-fav-team">
              <img src={favligs[1]} alt="" />
            </div>
            <span className="fav-team-name">{favligs[0]}</span>
          </div>
        ))}

        <div className="add-button">
          <button onClick={() => {setLigModal(true), fetchDataLeague()}}>+</button>
          <span>Liga Əlavə Et</span>
        </div>
      </div>

      <div className='analise-panel'>
        <div className='title'>
          <span>Analiz paneli</span>
        </div>

        <div className="title-two">
          <span>Maç analiz paneli</span>
        </div>
      </div>

    </div>
  )
}

export default Leftbar