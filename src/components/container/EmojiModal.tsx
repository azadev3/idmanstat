//LIST EMOJIES COMPONENT. WE RECEIVE FROM API EMOJI LISTS, DEFINE AND SHOWING ALL EMOJIES

import React, { SetStateAction } from "react";
import "../../styles/global.scss";
import { IoIosClose } from "react-icons/io";
import axios from "axios";

interface EmojiModalInt {
  id: number;
  emojiModal: { [key: number]: boolean };
  setEmojiModal: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;

  //selected emoji and show in the textarea element 
  setSelectedEmoji: React.Dispatch<SetStateAction<{ [key: string]: string }>>;
  selectedemoji: { [key: string]: string }
  handleSelectEmoji: (value: string) => void;
}

interface EmojiList {
  id: number;
  character: string;
}

const EmojiModal = ({ id, emojiModal, setEmojiModal, handleSelectEmoji }: EmojiModalInt) => { //PROPS GIVEN
  const [emojies, setEmojies] = React.useState<EmojiList[]>([]); //THIS STATES KEEP UP WE EMOJI LIST 
  const [loading, setLoading] = React.useState<boolean>(false);

  const GetEmojies = async () => {
    const api = "https://emoji-api.com/emojis?access_key=aaf150f2a4297709ed23426001ed2eec0943c2b3";
    const response = await axios.get(api);

    try {
      if (response.data) {
        setEmojies(response.data);
      }
    } catch (error) {
      console.log(error, "emojies api error");
    }
  };

  React.useEffect(() => {
    setLoading(true);
    GetEmojies().finally(() => {
      setLoading(false);
    });
  }, []);

 
  return (
    <div className="emoji-modal-container">
      <div className="header">
        <span>Emoji seçin</span>
        <IoIosClose
          id="closeicon"
          onClick={() => {
            if (emojiModal[id]) {
              setEmojiModal((prevEmoji) => {
                const newEmojiModal = { ...prevEmoji };
                newEmojiModal[id] = false;
                return newEmojiModal;
              });
            }
          }}
        />
      </div>

      <div className="emojies">
        {loading ? (
          <div className="loading-anim">
            <span id="rectangle1">
              <img src="./idmanstatlog.svg" alt="idmanstatlogo" loading="lazy"/>
            </span>
          </div>
        ) : (
          false
        )}
        {emojies.map((emoji: EmojiList) => (
          <span key={emoji.id}
          onClick={() => handleSelectEmoji(emoji.character)}
          >{emoji.character}</span>
        ))}
      </div>
    </div>
  );
};

export default EmojiModal;
