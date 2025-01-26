
import React, { useState, useEffect, useContext } from 'react' //change in functions
import './SignIn.css'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NavLink } from 'react-router-dom';
import { RecoveryContext } from '../../App';
import { GoogleLogin } from '@react-oauth/google';

function SignIn({ SignIn }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [visibility, setVisibility] = useState(false)
  const [id, setId] = useState(1)
  const navigate = useNavigate();
  const { imageUrl, setImageUrl, BackendUrl } = useContext(RecoveryContext);

  const handleVisibility = () => {
    setVisibility(!visibility);
  }

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BackendUrl}/signIn`, {
        username: username,
        password: password
      });
      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        setId(response.data.user_id);
        SignIn(response.data.user_id, response.data.username);
        setImageUrl(response.data.profile_url);
        console.log("login page", response.data.user_id);
        navigate("/Trips");
      }

    } catch (error) {
      console.log("this is catch error", error.message);
    }
    setPassword('');
    setUsername('');

  }

  const handleGoogleLoginSuccess = async (response) => {
    const token = response.credential;
    console.log(token);
    try {
      const res = await axios.post(
        `${BackendUrl}/google-signIn`,
        { token: token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        setId(res.data.user_id);
        SignIn(res.data.user_id, res.data.username);
        setImageUrl(res.data.profile_url);
        console.log('login page', res.data.user_id);
        navigate('/Trips');
      } else {
        setErrorMessage(res.data.message || 'Google SignIn failed');
      }
    } catch (error) {
      console.log('Error during Google Sign-In', error.message);
      setErrorMessage('Google Sign-In failed');
    }
  };

  const handleGoogleLoginFail = (error) => {
    console.log(error);
    setErrorMessage('Google signIn failed');
  }

  return (
    <div className="sigin_centered_conatiner boxes">
      <div className='container small-Boxes'>
        <h1>Hello Welcome back!</h1>
        <p><span className='signin-hylyt'>Sign In </span> to continue</p>
        <form action="" className='signin-form' onSubmit={submitLogin}>

          <label htmlFor="signin-username">username</label>
          <div className='signin-input-username'>
            <input type="text" name="username" placeholder='Enter username' required autoComplete="username" onChange={(e) => setUsername(e.target.value)} value={username} />
          </div>

          <label htmlFor="signin-password">password</label>
          <div className='sigin-input-password'>
            <input type={visibility ? "text" : "password"} value={password} name="password" placeholder='Enter 8 characters or more' required autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
            <span onClick={handleVisibility}>{!visibility ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}</span>
          </div>

          <NavLink to="/ForgotPage"><span>Forgot Password?</span></NavLink>
          <input type="submit" value="Sign In" className="submit" />

          <div className="hr-container">
            <hr />
            <span className="or-text boxP">or</span>
          </div>

          <div className="login-container">
            <GoogleLogin onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFail} className="custom-googleButton" />
          </div>

          <span className='signin-span'>Don't have an Account? <NavLink to="/Signup">Sign Up</NavLink> </span>
          {errorMessage && <p style={{ color: "red", fontSize: "12px" }}> {errorMessage} </p>}
        </form>
      </div>
    </div>
  )
}

export default SignIn