import React, { useState, useEffect } from "react";
import HomeCard from "../components/HomeCard";
import popupS from "popups";

import NavBar from "../components/NavBar";
import Apiroutes from "../utils/Apiroutes";



function onClick(e, title, thumbnail){
  let userinput= title;
  let image = thumbnail;
  console.log(userinput)
 
  Apiroutes.saveUserAction ({userinput})
  .then (res => {
    console.log("action saved!")
    
    })
    .catch(err => console.log(err))


    popupS.modal({
        title:   userinput,
        content: {
            tag: "img",
            src: image
            // props.communication_image
        }
    });
}


function Homepage() {

const [user, setUser]= useState([])

useEffect(() => {
  getUserEmotions()
}, []);

const getUserEmotions = () => {
  Apiroutes.getUserData()
  .then (res => {
    console.log(res.data)
    
    setUser(res.data)
    })
     
    .catch(err => console.log(err))
}


  return (
    
    <>
    <NavBar/>
      <div className="container">
    <div className="row row-cols-1 row-cols-md-3 g-3 row-cols-lg-3">

        <div className="col">
          <HomeCard 
          id={user.userid +1}
          title={"Happy"}
          onClick={onClick}
         
      
          
          thumbnail={user.happy}
          />
        </div>

        <div className="col">
          <HomeCard 
          id={user.userid +2}
          title={"Sad"}
          onClick={onClick}
          thumbnail={user.sad}
          />
        </div>

        <div className="col">
          <HomeCard 
          id={user.userid +3}
          title={"Nervous"}
          onClick={onClick}
          thumbnail={user.nervous}
          />
        </div>

        <div className="col">
          <HomeCard 
          id={user.userid +4}
          title={"Hungry"}
          onClick={onClick}
          thumbnail={user.hungry}
          />
        </div>

        <div className="col">
          <HomeCard 
          id={user.userid +5}
          title={"Thirsty"}
          onClick={onClick}
          thumbnail={user.thirsty}
          />
        </div>

        <div className="col">
          <HomeCard 
          id={user.userid +6}
          title={"Restroom"}
          onClick={onClick}
          thumbnail={user.restroom}
          />
        </div>
        
        

    </div>
    </div>
    </>
  );
}


export default Homepage;
