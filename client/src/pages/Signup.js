import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import logo from "../assets/logo-duckies.png";
import "./style.css";
import LoginWrapper from "../components/LoginWrapper";
import SignupForm from '../components/SignupForm';
import Apiroutes from '../utils/Apiroutes';


function Signup() {
  //initialize state with empty fields
const [signupInfo, setSignupInfo] = useState({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: ""
})

const history = useHistory();
//use to set user type so we know which table to make POST request 
//because there are separate tables fro user and caregiver
const [usertype, setUsertype] = useState('');


const handleChange = (e) => {
  const {name, value} = e.target;
  setSignupInfo({... signupInfo, [name]:value});
}

const radioInput= (e) => {
  console.log(e.target.value)
  setUsertype(e.target.value)
}

//depending on user type, POST request will be made to relevant table
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(signupInfo)

  if(usertype === "user") {
    Apiroutes.userSignup(signupInfo)
    .then(res => {
      console.log("user signed in")
      localStorage.clear()
      localStorage.setItem('user', true)
      history.push("/welcomeuser")
    })
    // .then (res => {
    //   if(localStorage.getItem("user") === true) {
    //     history.push("/welcomeuser")
    //         }
    //         else {
    //             setTimeout(() => {
    //                 history.push("/welcomeuser")
    //                 window.location.reload()
    //             }, 2000)
    //         }
    // })
    .catch(err => console.log(err))
  }
  else if (usertype === "caregiver") {
    Apiroutes.cgSignup(signupInfo)
    .then(res => {
      console.log("caregiver signed in")
      localStorage.clear()
      localStorage.setItem('caregiver', true)
      history.push("/profile")
    })
      // .then (res => {
      //   if(localStorage.getItem("caregiver") === true) {
      //     history.push("/profile")
      //         }
      //         else {
      //             setTimeout(() => {
      //                 history.push("/profile")
      //                 window.location.reload()
      //             }, 2000)
      //         }
      // })
    .catch(err => console.log(err))
  }
}


    return (
        <>
      <LoginWrapper>

    <section className="col-10 mx-auto justify-content-center text-center col-lg-5">
     

     <SignupForm
     handleChange={handleChange}
     handleSubmit={handleSubmit}
     radioInput={radioInput}
     />
 
    </section>

 </LoginWrapper>
        </>
    )
}

export default Signup;
