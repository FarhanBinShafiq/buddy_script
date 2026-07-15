import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';

const Register = () => {
  const navigate = useNavigate();

  // 1. Define React form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  // 2. Handle registration form submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!agree) {
      alert("You must agree to the terms & conditions");
      return;
    }

    const userData = { firstName, lastName, email, password };

    console.log("Registering user:", email);

    // Call the registration API endpoint
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log("Registration successful! Redirecting to login...");
          alert('Registration successful! Redirecting to login...');
          navigate('/login');
        } else {
          console.warn("Registration failed:", data.message);
          alert(data.message || 'Registration failed');
        }
      })
      .catch(err => {
        console.error('Registration Error:', err);
        alert('Something went wrong during registration.');
      });
  };

  const handleGoogleRegister = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const displayName = user.displayName || '';
        const nameParts = displayName.split(' ');
        const firstNameVal = nameParts[0] || 'Google';
        const lastNameVal = nameParts.slice(1).join(' ') || 'User';
        const emailVal = user.email;

        console.log("Firebase Google Registration successful:", emailVal);

        fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ firstName: firstNameVal, lastName: lastNameVal, email: emailVal })
        })
          .then(res => res.json())
          .then(data => {
            setLoading(false);
            if (data.token) {
              localStorage.setItem('authToken', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              navigate('/feed');
            } else {
              alert(data.message || 'Google Registration/Sign-In failed on backend.');
            }
          })
          .catch(err => {
            setLoading(false);
            console.error("Backend Google Auth Error:", err);
            alert("Could not sync Google registration with backend server.");
          });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Firebase Sign-In Error:", error);
        alert(error.message || "Google registration popup closed or failed.");
      });
  };

  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      {/*Registration Section Start*/}
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
      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <img src="/assets/images/registration.png" alt="Image" />
                </div>
                <div className="_social_registration_right_image_dark">
                  <img src="/assets/images/registration1.png" alt="Image" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_social_registration_right_logo _mar_b28">
                  <img src="/assets/images/logo.svg" alt="Image" className="_right_logo" />
                </div>
                <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
                <button 
                  type="button" 
                  onClick={handleGoogleRegister}
                  disabled={loading}
                  className="_social_registration_content_btn _mar_b40"
                >
                  <img src="/assets/images/google.svg" alt="Image" className="_google_img" /> <span>{loading ? 'Connecting...' : 'Register with google'}</span>
                </button>
                <div className="_social_registration_content_bottom_txt _mar_b40"> <span>Or</span>
                </div>
                <form className="_social_registration_form" onSubmit={handleRegisterSubmit}>
                  <div className="row">
                    {/* First Name */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">First Name</label>
                        <input 
                          type="text" 
                          className="form-control _social_registration_input" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {/* Last Name */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Last Name</label>
                        <input 
                          type="text" 
                          className="form-control _social_registration_input" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Email</label>
                        <input 
                          type="email" 
                          className="form-control _social_registration_input" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {/* Password */}
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Password</label>
                        <input 
                          type="password" 
                          className="form-control _social_registration_input" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {/* Repeat Password */}
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Repeat Password</label>
                        <input 
                          type="password" 
                          className="form-control _social_registration_input" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                      <div className="form-check _social_registration_form_check">
                        <input 
                          className="form-check-input _social_registration_form_check_input" 
                          type="checkbox" 
                          name="flexRadioDefault" 
                          id="flexRadioDefault2" 
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                        />
                        <label className="form-check-label _social_registration_form_check_label" htmlFor="flexRadioDefault2">I agree to terms & conditions</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                        <button type="submit" className="_social_registration_form_btn_link _btn1">Register now</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_bottom_txt">
                      <p className="_social_registration_bottom_txt_para">Already have an account? <Link to="/login">Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Registration Section End*/}
    </section>
  );
};

export default Register;
