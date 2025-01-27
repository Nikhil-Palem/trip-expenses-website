import React, { useContext, useState ,useEffect} from 'react';
import './ForgotPage.css';
import { RecoveryContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// thiss forgot page it not working need to fix at backend
function ForgotPage() {
  const { Email, setEmail, setOTP,BackendUrl } = useContext(RecoveryContext);
  const [sucess, setSucess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
      if(sucess){
        navigate('/OtpPage');
      }
    }, [sucess,navigate])
    

    const handleForgot = async (e) => {
      e.preventDefault();
      if (Email) {
          const OTP = Math.floor(Math.random() * 9000 + 1000);
          setOTP(OTP);
          console.log("Generated OTP:", OTP);
          try {
              const response = await axios.post(`${BackendUrl}/send_recovery_email`, {
                  OTP,
                  Email,
              });
  
              if (response.data.error) {
                  setErrorMessage(response.data.error);
                  console.error('Error response :', response.data.error);
              } else {
                  console.log('Email sent successfully:', response.data);
                  navigate("/OtpPage");
                  setSucess(true);
              }
          } catch (error) {
              console.error('Request failed:', error);
              setErrorMessage('An error occurred. Please try again');
          }
      } else {
          setErrorMessage('Please enter a valid email address');
      }
  };
  
  return (
    <form action="" onSubmit={handleForgot}>
    <div className='forgotPage-container boxes'>
      <div className="forgot-div small-Boxes">
        <strong>Forgot Password? </strong>
        <p>Enter your email address to reset your password</p>
        <div className="email-forgot-input">
          <input
            type="text"
            placeholder='Enter your email'
            value={Email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
            autoComplete="email"
          />
        </div>
        <button type='submit' >Submit</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
    </form>
  );
}

export default ForgotPage;
