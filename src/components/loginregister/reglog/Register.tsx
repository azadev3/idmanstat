import React from "react";
import "../../../styles/loginregister/loginregister.scss";
import { Form, Formik, Field } from "formik";
import { LoginSchema } from "./schema/Schema";
import { Link } from "react-router-dom";
import { RegisterLoginProps } from "./Login";
import { FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import LoadingAnimation from "../../loadingandlazy/LoadingAnimation";
import { useRegisterContext } from "../../../context/RegisterContext";
import axios from "axios";
import { Zoom, ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';


const Register = ({loadBtn, setLoadBtn}:RegisterLoginProps) => {

  const { setNavRegister, setNavRegisterActivedPage } = useRegisterContext();

  //password show and hide options;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  //according to checked if true or false then button true or false
  const [checked, setChecked] = React.useState<boolean>(false);

  //example registered if true open new modal and accsess editing for the user;
  const handleRegister = () => {

    //if clicked register button true loading anim button after navigate to particles messages
    setLoadBtn(true);

    const timeout:NodeJS.Timeout = setTimeout(() => {
      setLoadBtn(false);
      setNavRegister("Daxil Ol");
      setNavRegisterActivedPage("Daxil Ol");
    }, 1500);
    
    return () => clearTimeout(timeout);
  }

  //format date on user register date
  function formatDate(date:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('tr-TR', options);
  }

  return (
    <div className="register-container">
      <div className="title">
        <h2>IdmanStata Xoş Gördük</h2>
        <p>
          Idmanstata üzv olmağına şadıq, burada hərgün yüzlərlə təxmin paylaşılır səndə qoşul və səndə öz təxminlərini
          paylaş.
        </p>
      </div>

      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          email: "",
          password: "",
          terms_and_conditions: undefined,
          newsletter: undefined,
        }}
        onSubmit={async (values) => {
          const api = 'http://127.0.0.1:8000/account/api/user-register/';
          const data = values;
          const options = {
            validateStatus: (status:any) => {
              if(status === 200 || status >= 200) {
                return status;
              }
            }
          }

          const request = await axios.post(api, data, options);

          try {
          
            if(request.data && request.status === 200 || request.status === 201){
                toast.success('Qeydiyyat uğurla tamamlandı. Zəhmət olmasa hesabınıza daxil olun.', {
                  position: 'top-center'
                });
                const registrationDate = formatDate(new Date());
                localStorage.setItem('reg_date', registrationDate);
                handleRegister(); //this function call the new page and register successfully
              } else if(request.data && request.status === 400){
                toast.error('Bu email ilə zatən bir qeydiyyat mövcuddur. Başqasını yoxlayın vəya Daxil olun', {
                  position: 'top-center'
                })
            } else {
                console.log('Bir xeta oldu', request.status);
            }

          }catch(error){
            console.log(error, 'register endpoint error')
          }
        }}>
        {(props) => (
          <Form className="form">
            <ToastContainer autoClose={1200} transition={Zoom} theme="colored"/>
            {props.touched.password && props.errors.password && <span id="err-msg">{props.errors.password}</span>}
            {props.touched.email && props.errors.email && <span id="err-msg">{props.errors.email}</span>}
            <div className="field-areas">
              <div className="field">
                <label htmlFor="email">Zəhmət olmasa e-mail ünvanınızı yazın</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  autoComplete="current-email"
                />
              </div>

              <div className="field">
                <label htmlFor="password">Şifrəni təyin edin</label>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="***"
                  autoComplete="current-password"
                />
                {/* ACCORDING TO SHOW PASSWORD RENDERED ICONS */}
                {showPassword ? (<FaRegEye id="close-eyes" onClick={() => {setShowPassword(false)}} />) : 
                (<FaRegEyeSlash id="open-eyes" onClick={() => {setShowPassword(true)}} />)}
                
              </div>

              <div className="checkbox-field">
                <div className="rules-check">
                  <Field type="checkbox" id="terms_and_conditions" name="terms_and_conditions" 
                   onClick={() => setChecked(!checked)}
                  />
                  <span>
                    Siz bu saytda qeydiyyatdan keçməklə,
                    <Link to="" id="rules-link">
                      qaydalar
                    </Link>
                    ilə razılaşmış olursunuz.
                  </span>
                </div>

                <div className="promotions-check">
                  <Field type="checkbox" id="newsletter" name="newsletter" />
                  <span>Məni xüsusi kampaniyalardan xəbərdar et</span>
                </div>
              </div>
            </div>

            <div className="additional-titles">
              <div className="primary-register-button">
                {/* LOADING ANIMATION IN THE BUTTON ELEMENT */}
                {loadBtn ? (
                  <LoadingAnimation />
                ):(
                  <button 
                  disabled={checked ? false : true}
                  className={checked ? 'activeBtn' : ''} id="primaryRegisterBtn" type="submit"
                  // onClick={() => {handleRegister()}}
                  >
                    Qeydiyyat
                  </button>
                )}
              </div>
              <div className="additional-title">
                <Link id="addition-login-link" to=""
                onClick={() => {
                  setNavRegister("Daxil Ol");
                  setNavRegisterActivedPage("Daxil Ol");
                }}
                >
                  Artıq hesabınız var? O zaman daxil ol
                </Link>
              </div>
              <div className="additional-title-social-media">
                <span id="addition-social-media-title">Sosial media hesabın ilə daxil ol</span>
              </div>

              <div className="login-in-social-media-accounts">
                <div className="login-to-facebook">
                  <img src="faceiconinregister.svg" alt="facebook-icon" loading="lazy"/>
                  <span id="sign-facebook">Facebook ilə daxil ol</span>
                </div>

                <div className="login-to-google">
                  <img src="googleinregister.svg" alt="google-icon" loading="lazy"/>
                  <span id="sign-google">Google ilə daxil ol</span>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
