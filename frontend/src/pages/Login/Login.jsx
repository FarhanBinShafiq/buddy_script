import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Attempting login for email:", email);

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.token) {
          console.log("Login successful! Storing token and user details.");
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/feed');
        } else {
          console.warn("Login failed: invalid credentials.");
          alert(data.message || 'Invalid email or password');
        }
      })
      .catch(err => {
        setLoading(false);
        console.error("Network error during login:", err);
        alert('Something went wrong. Please check your connection.');
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const displayName = user.displayName || '';
        const nameParts = displayName.split(' ');
        const firstName = nameParts[0] || 'Google';
        const lastName = nameParts.slice(1).join(' ') || 'User';
        const email = user.email;

        console.log("Firebase Google Authentication successful:", email);

        fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ firstName, lastName, email })
        })
          .then(res => res.json())
          .then(data => {
            setLoading(false);
            if (data.token) {
              localStorage.setItem('authToken', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              navigate('/feed');
            } else {
              alert(data.message || 'Google Sign-In failed on backend.');
            }
          })
          .catch(err => {
            setLoading(false);
            console.error("Backend Google Auth Error:", err);
            alert("Could not sync Google login with backend server.");
          });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Firebase Sign-In Error:", error);
        alert(error.message || "Google sign-in popup closed or failed.");
      });
  };

  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <img src="/assets/images/login.png" alt="Image" className="_left_img" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <img src="/assets/images/logo.svg" alt="Image" className="_left_logo" />
                </div>
                <p className="_social_login_content_para _mar_b8">Welcome back</p>
                <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
                <button 
                  type="button" 
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="_social_login_content_btn _mar_b40"
                >
                  <img src="/assets/images/google.svg" alt="Image" className="_google_img" /> <span>{loading ? 'Connecting...' : 'Or sign-in with google'}</span>
                </button>
                <div className="_social_login_content_bottom_txt _mar_b40"> <span>Or</span>
                </div>
                <form className="_social_login_form" onSubmit={handleLogin}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">Email</label>
                        <input 
                          type="email" 
                          className="form-control _social_login_input" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">Password</label>
                        <input 
                          type="password" 
                          className="form-control _social_login_input" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="form-check _social_login_form_check">
                        <input className="form-check-input _social_login_form_check_input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                        <label className="form-check-label _social_login_form_check_label" htmlFor="flexRadioDefault2">Remember me</label>
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="_social_login_form_left">
                        <p className="_social_login_form_left_para">Forgot password?</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_login_form_btn _mar_t40 _mar_b60">
                        <button type="submit" className="_social_login_form_btn_link _btn1" disabled={loading}>
                          {loading ? 'Logging in...' : 'Login now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_bottom_txt">
                      <p className="_social_login_bottom_txt_para">Dont have an account? <Link to="/register">Create New Account</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;