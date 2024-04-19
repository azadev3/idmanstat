import React from "react";
import "../../../styles/loginregister/optionspage.scss";
import { Formik, Form, Field } from "formik";
import { OptionSchema } from "./OptionSchema";
import { FaPlus } from "react-icons/fa6";
import LoadingAnimation from "../../loadingandlazy/LoadingAnimation";
import { useTeamSelectModal } from "../../../context/RegisterOptionContext";
import Confetti, { ConfettiConfig, ConfettiProps } from 'react-dom-confetti'
import { useRegisterContext } from "../../../context/RegisterContext";
import { useCountryApi } from "../../../context/CountriesContext";
import { CountryAndCupsType } from "../../../types/PopularLigTypes";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";

const Options = ({setLoadBtn, loadBtn}:{setLoadBtn:(value:boolean) => void, loadBtn: boolean}) => {

    //show countires in selected country options
    const { countries, mainCountries } = useCountryApi();

    //add lig and favourite team page after reg ===>> setPageChanged and pageChanged;
    const { toggleTeamModal, pageChanged, setPageChanged, toggleLigModal } = useTeamSelectModal();

    //if button clicked (davam et)
    const handleClicked = () => {
    setLoadBtn(true); //true at first clicked button

    //after false and change page
    const timeout:NodeJS.Timeout = setTimeout(() => {
      setLoadBtn(false); //load btn false
      setPageChanged(true); //page changed true if we are rendered new "Tebrikler" page (<Options />)
    }, 1400);

    return () => clearTimeout(timeout); //clear interval after settimeout
    }

    //confetti options
    const config: ConfettiConfig = {
      angle: 168,
      spread: 600,
      startVelocity: 60,
      elementCount: 50,
      dragFriction: 0.31,
      duration: 10000,
      stagger: 50,
      width: "15px",
      height: "30px",
      colors: ["#7711F5", "#4441FF", "#00FF0D", "#FF0738", "#FBFF00"]
    };
    
    // State to control the confetti
    const [confettiActive, setConfettiActive] = React.useState<boolean>(false);

    // Function to stop the confetti after it explodes once
    const toggleConfetti = () => {
      setConfettiActive(true);
    };

    //when component did mount then true confetti after stop confetti 
    React.useEffect(() => {
      toggleConfetti();
    }, []);


    //select your profile
    const [selectedImage, setSelectedImage] = React.useState<any>("");

    const handleSelectProfileImage = () => {  
      const fileInput = document.getElementById('file_input');
      fileInput?.click();
    }

    const handleFileSelected = async (e: any) => {
      const selected_image = await e.target.files[0];
      if(selected_image) {
        setSelectedImage(selected_image.name);
      }
    }
    

    const saveImage = async () => {
      const token = localStorage.getItem('authtoken');
      const api = 'http://127.0.0.1:8000/account/api/change-avatar/';

      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
    
      try {
        const response = await axios.patch(api, config, selectedImage);
        if (response.data) {
          console.log(response.data);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error, 'profile update endpoint')
      }
    }
    
    React.useEffect(() => {
      saveImage();
    }, [selectedImage]);

    




    return (
      <div className="after-user-registered" style={{overflow: 'hidden'}}>
     
      {/* CONFETTI */}
      <Confetti config={config} active={confettiActive} />
      {/* CONFETTI */}

      <div className="user-particles-message">
          <div className="suprise-title">
               <span id="tip-1">T</span>
               <span id="tip-2">Ə</span>
               <span id="tip-3">B</span>
               <span id="tip-4">R</span>
               <span id="tip-5">İ</span>
               <span id="tip-6">K</span>
               <span id="tip-7">L</span>
               <span id="tip-8">Ə</span>
               <span id="tip-11">Ə</span>
               <span id="tip-12">Ə</span>
               <span id="tip-13">R</span>
          </div>
          <h3>Hesabınızı hazırlamağa davam edin</h3>

          <div className="profile-wrapper">
               <div className="image">
               <img src="./userprof.svg" alt="user-profile-example" />
               <span>
                    <FaPlus id="plus-icon" 
                    onClick={handleSelectProfileImage}
                    />
                    <input 
                    type="file" 
                    style={{display: 'none'}}
                    accept="image/*"
                    id="file_input"
                    onChange={handleFileSelected}
                    />
               </span>
               </div>
          {/* IF USER SET THE USERNAME and COUNTRY SHOW HERE USERNAME and COUNTRY */}
               {pageChanged && 
               <div className="userinfo">
                <span id="username">Idmanstat</span>
                <span id="countryname">
                  <img src="./azflag.svg" alt="azerbaijan-flag" />
                  Azerbaijan
                </span>
               </div>
               }
          </div>
      </div>

      {/* IF USER CLICKED ("DAVAM ET") BUTTON, RENDERING ACCORDING IT's */}
      {pageChanged ? (
        <div className="set-ligs-and-teams-section">
          <div className="add-team">
          <section className="whatis-your-fav-title">
            <h3>Favorit Komandanız Hansıdır?</h3>
            <p>
            Favorit komandanızı seçin. Həmin komandanın 
            oyunları və təxminləri hesabınızda görünəcək.
            </p>
          </section>
          <button id="add-team"
          onClick={() => toggleTeamModal()} //open team select modal
          >+</button>
          </div>

          <div className="add-lig">
          <section className="whatis-your-fav-title">
            <h3>Favorit Liganız Hansıdır?</h3>
            <p>
            Favorit liganızı seçin. Həmin liganın oyunları və 
            təxminləri hesabınızda görünəcək.
            </p>
          </section>
          <button id="add-lig"
          onClick={() => toggleLigModal()} //open lig select modal
          >+</button>
          </div>

          <button type="submit">
            Davam et
          </button>
        </div>
      ) : (
        <Formik
        initialValues={{
          username: '',
          nationality: '',
        }}
        onSubmit={ async (values) => {
          const api = 'http://localhost:8000/account/api/change-nationality-username/';
          const token = localStorage.getItem('authtoken');
          const options = {
            validateStatus: (status:any) => {
              if(status <= 200 || status >= 200) {
                return status;
              }
            },
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          };

          const data: { username: string, nationality: string | number } = {
            username: values.username,
            nationality: values.nationality,
          }
          const response = await axios.put(api, data, options);
          try {
            if(response.data && response.status === 200) {
              toast.success('İstifadəçi adınız və ölkəniz müvəffəqiyyətlə tətbiq olundu.', {
                position: 'top-center',
                delay: 100,
              });
              handleClicked();
              localStorage.setItem('username', values.username);
              localStorage.setItem('nationality', values.nationality);
            } else if(response.data && response.status !== 200){
              toast.error('Server xətası var yenidən yoxlayın.', {
                position: 'top-center',
                delay: 100,
              });
            } else {
              console.log(response.status, 'error username nationality')
            }
          }catch(error){
            console.log('tebrikler page endpoint error');
          }
        }}
        validationSchema={OptionSchema}>
        {(props) => (
          <Form className="form-in-user-after-registered">
            <ToastContainer autoClose={2500} transition={Zoom} pauseOnHover={false}/>
            <div className="field-area">
              <label htmlFor="username">Sizə necə müraciət etsinlər ?</label>
              <Field type="text" name="username" id="username" placeholder="İstifadəçi adı təyin et" />
              {props.values.username && props.errors.username && props.touched.username && 
              <span id="err-msg">{props.errors.username}</span>}
            </div>
            
            {/* OLKE SECIMI / COUNTRY SELECT */}
            <div className="field-area checkinput" style={{overflowY: 'auto'}}>
              <label htmlFor="country">Siz hardansınız?</label>
              <Field as="select" name="nationality" id="country">
                <option value="" disabled>
                  Ölkənizi seçin
                </option>
                {mainCountries.concat(countries).map((country:CountryAndCupsType, index) => (
                  <option value={country.name} key={index}>
                    {country.name}
                  </option>
                ))}
              </Field>
            </div>

            <div className="button-and-skip">
               {loadBtn ? (
                <LoadingAnimation />
               ) : (
                <button id="button" type="submit">
                    Davam et
               </button>
               )}

            </div>
          </Form>
        )}
        </Formik>
      )}
    </div>
  );
};

export default Options;
