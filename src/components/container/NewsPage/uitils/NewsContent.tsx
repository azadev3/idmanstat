import React, { ChangeEvent } from "react";
import "../../../../styles/newspage/news.scss";
import { CiTimer } from "react-icons/ci";
import LikeAndComment from "../../LikeAndComment";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiModal from "../../EmojiModal";
import { FaArrowUp } from "react-icons/fa";


interface NewsInterface {
  id: number;
  title: string;
  content: string;
  lasttime: string;
  image: string;
}

const NewsContent = () => {
  //DEFINE NEWS ITEMS
  const NewsItems: NewsInterface[] = [
    {
      id: 1,
      title: "European Super League gets major boost as EU court rules against FIFA and UEFA",
      content:
        "1The European Super League project has been handed a major boost as the European Court of Justice has ruled that FIFA and UEFA are unable to punish breakaway clubs and players. Twelve clubs - including six from the Premier League - put forward a proposal in 2021 to drop out of the UEFA-run Champions League and Europa League and form a new European Super League. UEFA and FIFA subsequently threatened to ban players who opted to participate in the European Super League from playing for their national teams at World Cup and European Championship tournaments.But in a statement on Thursday morning, the EU Court of Justice has declared that the threat from FIFA and UEFA is 'contrary to EU law'.La Liga trio Barcelona, Real Madrid and Atletico Madrid also signed up for the European Super League, along with Italian sides Juventus, Inter and AC Milan.In a statement release after the EU court's ruling, La Liga said: 'Today more than ever we remember that the 'Super League' is a selfish and elitist model.'Any format that is not totally open, with direct access, year after year, via domestic leagues, is a closed model.",
      lasttime: "3 saat öncə",
      image: "./examplenewback.svg",
    },
    {
      id: 2,
      title: "European Super League gets major boost as EU court rules against FIFA and UEFA",
      content:
        "2The European Super League project has been handed a major boost as the European Court of Justice has ruled that FIFA and UEFA are unable to punish breakaway clubs and players.Twelve clubs - including six from the Premier League - put forward a proposal in 2021 to drop out of the UEFA-run Champions League and Europa League and form a new European Super League.UEFA and FIFA subsequently threatened to ban players who opted to participate in the European Super League from playing for their national teams at World Cup and European Championship tournaments.But in a statement on Thursday morning, the EU Court of Justice has declared that the threat from FIFA and UEFA is 'contrary to EU law'.La Liga trio Barcelona, Real Madrid and Atletico Madrid also signed up for the European Super League, along with Italian sides Juventus, Inter and AC Milan.In a statement release after the EU court's ruling, La Liga said: 'Today more than ever we remember that the 'Super League' is a selfish and elitist model.'Any format that is not totally open, with direct access, year after year, via domestic leagues, is a closed model.",
      lasttime: "3 saat öncə",
      image: "./examplenewback.svg",
    },
    {
      id: 3,
      title: "European Super League gets major boost as EU court rules against FIFA and UEFA",
      content:
        "3The European Super League project has been handed a major boost as the European Court of Justice has ruled that FIFA and UEFA are unable to punish breakaway clubs and players.Twelve clubs - including six from the Premier League - put forward a proposal in 2021 to drop out of the UEFA-run Champions League and Europa League and form a new European Super League.UEFA and FIFA subsequently threatened to ban players who opted to participate in the European Super League from playing for their national teams at World Cup and European Championship tournaments.But in a statement on Thursday morning, the EU Court of Justice has declared that the threat from FIFA and UEFA is 'contrary to EU law'.La Liga trio Barcelona, Real Madrid and Atletico Madrid also signed up for the European Super League, along with Italian sides Juventus, Inter and AC Milan.In a statement release after the EU court's ruling, La Liga said: 'Today more than ever we remember that the 'Super League' is a selfish and elitist model.'Any format that is not totally open, with direct access, year after year, via domestic leagues, is a closed model.",
      lasttime: "3 saat öncə",
      image: "./examplenewback.svg",
    },
    {
      id: 4,
      title: "European Super League gets major boost as EU court rules against FIFA and UEFA",
      content:
        "4The European Super League project has been handed a major boost as the European Court of Justice has ruled that FIFA and UEFA are unable to punish breakaway clubs and players.Twelve clubs - including six from the Premier League - put forward a proposal in 2021 to drop out of the UEFA-run Champions League and Europa League and form a new European Super League.UEFA and FIFA subsequently threatened to ban players who opted to participate in the European Super League from playing for their national teams at World Cup and European Championship tournaments.But in a statement on Thursday morning, the EU Court of Justice has declared that the threat from FIFA and UEFA is 'contrary to EU law'.La Liga trio Barcelona, Real Madrid and Atletico Madrid also signed up for the European Super League, along with Italian sides Juventus, Inter and AC Milan.In a statement release after the EU court's ruling, La Liga said: 'Today more than ever we remember that the 'Super League' is a selfish and elitist model.'Any format that is not totally open, with direct access, year after year, via domestic leagues, is a closed model.",
      lasttime: "3 saat öncə",
      image: "./examplenewback.svg",
    },
    {
      id: 5,
      title: "European Super League gets major boost as EU court rules against FIFA and UEFA",
      content:
        "5The European Super League project has been handed a major boost as the European Court of Justice has ruled that FIFA and UEFA are unable to punish breakaway clubs and players.Twelve clubs - including six from the Premier League - put forward a proposal in 2021 to drop out of the UEFA-run Champions League and Europa League and form a new European Super League.UEFA and FIFA subsequently threatened to ban players who opted to participate in the European Super League from playing for their national teams at World Cup and European Championship tournaments.But in a statement on Thursday morning, the EU Court of Justice has declared that the threat from FIFA and UEFA is 'contrary to EU law'.La Liga trio Barcelona, Real Madrid and Atletico Madrid also signed up for the European Super League, along with Italian sides Juventus, Inter and AC Milan.In a statement release after the EU court's ruling, La Liga said: 'Today more than ever we remember that the 'Super League' is a selfish and elitist model.'Any format that is not totally open, with direct access, year after year, via domestic leagues, is a closed model.",
      lasttime: "3 saat öncə",
      image: "./examplenewback.svg",
    },
  ];

  //clicked emoji icon and open modal
  const [emojiModal, setEmojiModal] = React.useState<{ [key: number]: boolean }>({});

  const toggleEmojiModal = (id: number) => {
    setEmojiModal((prevModal) => ({
      ...prevModal,
      [id]: !prevModal[id],
    }));
  };

  //if user clicked on NEWS, then open other NEWS content
  const [openNews, setOpenNews] = React.useState<{ [key: number]: boolean }>({});

  //trimmed paragraph text states variables
  const [trimmedText, setTrimmedText] = React.useState<{ [key: number]: string }>({});
  const maxParagraph: number = 110; //maximum text content number if openNews === false;

  //function open news content others
  const showNewsContent = (id: number) => {
    setOpenNews((prevNews) => ({
      ...prevNews,
      [id]: !prevNews[id],
    }));
  };

  //referance to <p> and so, that's change between by textContent to new my Trim text content
  React.useEffect(() => {
    //we entering used with forEach method in NewsItems array
    //and trimmed the text
    NewsItems.forEach((el) => {
      const currentText = el.content; //NewsItems.content element (so, this is Current Main Text)
      if (currentText && currentText.length > maxParagraph) {
        const trimmedText = currentText.trim().slice(0, maxParagraph) + " ... ";
        setTrimmedText((prevText) => ({
          ...prevText,
          [el.id]: trimmedText,
        }));
      }
    });
  }, []);

  //selected emoji showed to in the textarea content
  const [selectedemoji, setSelectedemoji] = React.useState<{ [key: string]: string }>({});

  //textarea element onchange => event
  const [textareaValue, setTextareaValue] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextareaValue(value);
  };

  //which one selected emoji, keep up the selectedemoji state variable
  const handleSelectEmoji = (emoji: string) => {
    setSelectedemoji({ emoji: emoji });
    setTextareaValue((prevMsg) => prevMsg + emoji);
  };

  //textarea auto scroll if content larging
  const Auto_Grow = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "40px";
      textarea.style.height = `${textarea.scrollHeight}px`;
      if (textarea.scrollHeight > 200) {
        textarea.style.overflowY = "scroll";
        textarea.style.overflowX = "hidden";
      } else {
        textarea.style.overflow = "hidden";
      }
    }
  };

  return (
    <div className="container-newspage">
      <div className="top-title-news">
        <span>Xəbərlər</span>
      </div>

      <div className="news-items">
        {NewsItems.map((news) => (
          <React.Fragment key={news.id}>
            <div className="news-wrap" onClick={() => showNewsContent(news.id)}>
              <div className="news">
                <div className="news-image-container">
                  <img src={news.image} alt="news-image" />
                </div>

                <div className="right-titles">
                  <article className="news-title">
                    <span>{news.title}</span>
                  </article>

                  <article className="news-content">
                    {/* TRIMMED TEXT CONTENT (NEWS) */}
                    <p className="news-p">
                      {trimmedText[news.id] && trimmedText[news.id] !== null && trimmedText[news.id]}
                    </p>
                  </article>

                  <div className="news-last-time">
                    <CiTimer id="timeicon" />
                    <span>{news.lasttime}</span>
                    <span id="tags">Teqlər</span>
                  </div>
                </div>
              </div>
            </div>

            {openNews[news.id] && (
              <div className="add-comment">
                {/* IF openNews true show news content paragraph (see: news.content) */}
                <div className="news-content-pg-main">
                  <p>{news.content}</p>
                </div>

                <LikeAndComment />

                <div className="please-write-comment-input">
                  <div className="profile">
                    <img src="./idmanstatlog.svg" alt="userprofile" />
                  </div>

                  <div className="input">
                    <textarea
                      className="comment-textarea"
                      name={`comment-${news.id}`}
                      id={`comment-${news.id}`}
                      ref={(textarea) => Auto_Grow(textarea)}
                      onChange={(e) => {
                        Auto_Grow(document.getElementById(`comment-${news.id}`) as HTMLTextAreaElement); //autogrow function
                        handleChange(e); //function puts emoji here
                      }}
                      placeholder="Zəhmət olmasa şərhinizi yazın..."
                      value={textareaValue}
                    />
                    <div className="emoji">
                      <MdOutlineEmojiEmotions id="emojicon" onClick={() => toggleEmojiModal(news.id)} />
                    </div>
                  </div>
                  
                  <div className={`submit ${textareaValue ? 'submit-active' : ''}`}>
                    <FaArrowUp className="send-btn"/>
                  </div>
                </div>

                {/* OPEN EMOJI MODAL */}
                {emojiModal[news.id] && (
                  <EmojiModal
                    id={news.id}
                    setEmojiModal={setEmojiModal}
                    emojiModal={emojiModal}
                    handleSelectEmoji={handleSelectEmoji}
                    selectedemoji={selectedemoji}
                    setSelectedEmoji={setSelectedemoji}
                  />
                )}
                {/* OPEN EMOJI MODAL */}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NewsContent;
