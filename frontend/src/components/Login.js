
import authService from '../services/authService';

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  Header  from './Header'

import "../styles/Login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  useEffect(() => {
    if (authService.isLoggedIn()) {
      navigate("/home");
    }
    else {
        navigate("/");
    }
  }, [navigate]);


  useEffect(() => {
    setIsLoginDisabled(
      !email || !password || emailErrorMessage || passwordErrorMessage
    );
  }, [email, password, emailErrorMessage, passwordErrorMessage]);

  const validateEmail = (input) => {
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!emailRegex.test(input)) {
      setEmailErrorMessage("Enter valid northeastern email ID");
    } else {
      setEmailErrorMessage("");
    }
  };

  const validatePassword = (input) => {
    if (input.length < 8) {
      setPasswordErrorMessage("Invalid Password, Minimum 8 Characters");
    } else {
      setPasswordErrorMessage("");
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();

    validateEmail(email);
    validatePassword(password);

    try {
      await authService.login(email, password);
      navigate('/home');
    } catch (err) {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(e);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <>
    <Header />
      <div className="login-container">
        <div className="login-container-body">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <p className="loginName">LOGIN</p>
            </div>
            <div className="form-floating mb-3 is-invalid login-container-1">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              <label htmlFor="floatingInput">Email address</label>
              {emailErrorMessage && (
                <div className="alert alert-danger alert-small" role="alert">
                  {emailErrorMessage}
                </div>
              )}
            </div>

            <div className="form-floating mb-3 login-container-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              <label htmlFor="floatingPassword">Password</label>
              {passwordErrorMessage && (
                <div className="alert alert-danger alert-small" role="alert">
                  {passwordErrorMessage}
                </div>
              )}
            </div>

            <div className="form-floating mb-3 login-container-3">
              <button
                type="submit"
                className="btn btn-success login-container-3-submit-btn"
                disabled={isLoginDisabled}
              >
                Login
              </button>
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="form-floating mb-3 login-container-4">
              <p className="texts">Become a member? Please register below. </p>
              <button
                type="button"
                className="btn btn-primary login-container-4-register-btn"
                onClick={navigateToRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
