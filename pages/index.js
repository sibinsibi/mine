// import Head from 'next/head'
import React from "react";
import styles from "../styles/Login.module.css";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [hideRegister, showRegister] = useState(false);

  let password = React.createRef();

  const toggleForm = () => {
    showRegister(!hideRegister);
  };

  const [allValues, setAllValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    if (e.target.name === "password") checkPasswordStrength();
    setAllValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const showError = (msg) => {
    toast.error(msg, {
      toastId: msg,
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  var strength = {
    0: "Worst ☹",
    1: "Bad 😃",
    2: "Weak 😁",
    3: "Good 👌",
    4: "Strong 👍",
  };

  let strengthMsg = {
    strength: "",
    warning: "",
    suggestions: "",
  };

  const [feedbackValues, setFeedbackValues] = useState({
    strength: "",
    warning: "",
    warning: "",
    score: 0
  });

  const checkPasswordStrength = () => {
    let val = password.current.value;
    let result = zxcvbn(val);

    if (val !== "") {
      // strengthMsg.strength = strength[result.score];
      // strengthMsg.warning = result.feedback.warning;
      // strengthMsg.suggestions = result.feedback.suggestions;
      setFeedbackValues((prevState) => ({
        ...prevState,
        strength: strength[result.score],
        score: result.score
      }));
    } 
  };

  // var password = document.getElementById("password");
  // var meter = document.getElementById("password-strength-meter");
  // var text = document.getElementById("password-strength-text");

  // password.addEventListener("input", function () {
  //   var val = password.value;
  //   var result = zxcvbn(val);

  //   // Update the password strength meter
  //   meter.value = result.score;

  //   // Update the text indicator
  //   if (val !== "") {
  //     text.innerHTML =
  //       "Strength: " +
  //       "<strong>" +
  //       strength[result.score] +
  //       "</strong>" +
  //       "<span class='feedback'>" +
  //       result.feedback.warning +
  //       " " +
  //       result.feedback.suggestions +
  //       "</span";
  //   } else {
  //     text.innerHTML = "";
  //   }
  // });

  const signIn = async () => {
    if (!allValues.email) {
      showError("Enter an email");
      return;
    }
    if (!(await validateEmail(allValues.email))) {
      showError("Incorrect email format");
      return;
    }
    if (!allValues.password) {
      showError("Enter password");
      return;
    }
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  return (
    // <div className={styles.container}>
    //   <Head>
    //     <title>Create Next App</title>
    //     <meta name="description" content="Generated by create next app" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    // </div>
    <>
      <div className={styles.loginpage}>
        <div className={styles.container}>
          <div className={styles.box}>
            <img src="/img/logo.png" className={styles.logo} />

            <h2 className={styles.logotext}>Mine</h2>
            <form className={styles.loginForm}>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  name="email"
                  required
                  onChange={changeHandler}
                  autoComplete="off"
                />
                <label>Email</label>
              </div>
              <div className={styles.inputBox}>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="off"
                  onChange={changeHandler}
                  ref={password}
                />
                <label>Password</label>
                {allValues.password.length ? (
                  <div>
                    <meter max="4" id="password-strength-meter"></meter>
                    <span className={styles.passwordStrength}>
                      Strength: {feedbackValues.strength}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {hideRegister ? (
                <div className={styles.inputBox}>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    autoComplete="off"
                    onChange={changeHandler}
                  />
                  <label>Confirm Password</label>
                </div>
              ) : (
                ""
              )}

              {hideRegister ? (
                <button
                  type="button"
                  className={styles.loginButton}
                  value="Sign up"
                  onClick={signIn}
                >
                  Sign up
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.loginButton}
                  value="Sign in"
                  onClick={signIn}
                >
                  Sign in
                </button>
              )}
              <br />
              {hideRegister ? (
                <img
                  src="img/login-user.png"
                  className={styles.logo1}
                  onClick={toggleForm}
                />
              ) : (
                <img
                  src="/img/add-user.png"
                  className={styles.logo1}
                  onClick={toggleForm}
                />
              )}
            </form>
            <h1 className={styles.descryption}>Personalise Your Memories</h1>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
