import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import authService from "../services/authService";
import axios from "axios";

import "../styles/Login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);



  useEffect(() => {
    setIsRegisterDisabled(
      emailErrorMessage ||
        fullNameErrorMessage ||
        passwordErrorMessage ||
        !email ||
        !password ||
        !username 
    );
  }, [
    emailErrorMessage,
    fullNameErrorMessage,
    passwordErrorMessage,
    email,
    password,
    username,
  ]);


  const validateFullName = (input) => {
    var regExFullName = /^[A-Za-z ]{3,}$/;
    var returnVal = false;
    if (input.trim().length < 1){
      setFullNameErrorMessage("Name should not empty")
      returnVal = false;
    }
    else if (input.trim().length < 3){
      setFullNameErrorMessage("Enter valid Name with minimum of three characters");
      returnVal = false;
    }
    else if (!input.trim().match(regExFullName)) {
      setFullNameErrorMessage("Name should contain only letters and spaces");
      returnVal = false;
    } 
    else {
      setFullNameErrorMessage("");
      returnVal = true;
    }
    return returnVal;
  };

  const validateEmail = (input) => {
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!emailRegex.test(input)) {
      setEmailErrorMessage("Enter valid email ID");
      return false;
    } else {
      setEmailErrorMessage("");
      return true;
    }
  };

  const validatePassword = (input) => {
    var returnVal = false;
    var regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (input.trim().length < 1){
      setPasswordErrorMessage("Password should not be empty!");
      returnVal = false;
    }
    else if (input.trim().length < 8){
      setPasswordErrorMessage("Password should be at least 8 characters long!");
      returnVal = false;
    }
    else if (!input.trim().match(regExPassword)) {
      setPasswordErrorMessage("Password should contain at least 1 upper case, 1 lower case,1 number, and 1 special character!");
      returnVal = false;
    }
    else {
      setPasswordErrorMessage("");
      returnVal = true;
    }
    return returnVal;
  };
  

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      const user = { username, email, password };
      console.log(user);
      await authService.register(user);
      navigate("/"); // Redirect to login page after successful registration
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      onRegister(e);
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-container-body">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <p className="loginName">REGISTER</p>
            </div>
            <div className="form-floating mb-3 is-invalid login-container-1">
              <input
                type="text"
                className="form-control"
                id="floatingFullName"
                placeholder="name@example.com"
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateFullName(e.target.value);
                }}
              />
              <label htmlFor="floatingFullName">Name</label>
              {fullNameErrorMessage && (
                <div className="alert alert-danger alert-small" role="alert">
                  {fullNameErrorMessage}
                </div>
              )}
            </div>
            <div className="form-floating mb-3 is-invalid login-container-1">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              <label htmlFor="floatingEmail">Email address</label>
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
                disabled={isRegisterDisabled}
              >
                Register
              </button>
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            {/* Already A user */}
            <div className="form-floating mb-3 login-container-4">
              <p className="texts">Already a User? Please login to your account.</p>
              <button
                type="button"
                className="btn btn-primary login-container-4-register-btn"
                onClick={navigateToLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
