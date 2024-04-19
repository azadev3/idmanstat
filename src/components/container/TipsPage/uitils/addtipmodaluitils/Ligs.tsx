import React, { SetStateAction } from 'react'
import '../../../../../styles/tipspage/addtipmodal.scss';
import { useLigApi } from '../../../../../context/LigContext';
import { VList } from 'virtua';
import { League } from '../../../HomePage/uitils/LeftSidebarUitils/Ligs';

type props = {
     searchedItems: string | null,
     setSelectedLig: React.Dispatch<SetStateAction<string | null>>;
     ////
     setLeagueImage: React.Dispatch<SetStateAction<string | null>>;
     setLeagueType: React.Dispatch<SetStateAction<string | null>>;
     ////
     setLeagueID: React.Dispatch<SetStateAction<number | null>>;
}

const Ligs = ({searchedItems, setSelectedLig, setLeagueImage, setLeagueType, setLeagueID}:props) => {

     //get leagues
     const { addTipLeagues, setLigCountry } = useLigApi();
  
     //filtered leagues for Search items
     const filteredLeagues = addTipLeagues.filter((lig: any) =>
     lig.name.toLowerCase().includes((searchedItems || '').toLowerCase()));
     
     const handleSelectLig = (ligname: string, ligImage: string, ligType: string, id: number, ligCountry: string) => {
          setSelectedLig(ligname);
          setLeagueType(ligType);
          setLeagueImage(ligImage);
          setLeagueID(id);
          setLigCountry(ligCountry);
     }

     

  return (
     <div className="list">
      {/* Filtered leagues lists */}
      {searchedItems && filteredLeagues.length === 0 ? ( //if does result show dont-result-msg 
        <div className="dont-result-msg">
          <span>Axtardığın bəlkə bu deyil? 🤓</span> 
        </div>
      ) : ( //else if show searched items
        <VList style={{height: '429px'}}>
          {filteredLeagues.map((ligs: League) => (
            <div key={ligs.id} className="list-ligs" 
            onClick={() => handleSelectLig(ligs.name, ligs.logo, ligs.type, ligs.id, ligs.country)}>
              <img src={ligs.logo} alt="lig-logo" />
              <span>{ligs.name}</span>
            </div>
          ))}
        </VList>
      )}
    </div>
  )
}

export default Ligs