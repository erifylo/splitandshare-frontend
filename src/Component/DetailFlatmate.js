import React, { useState, useEffect } from "react";
import axios from "axios";

function DetailFlatmate(props) {
  const [flatmate, setFlatmate] = useState({});

  useEffect(() => {
    
    if(Object.keys(flatmate).length===0){
    axios
      .get(`http://localhost:4000/profile/${props.match.params.id}`)
      .then((response) => {
        setFlatmate(response.data);
      });
    }
  });
  return (
    <div>
      <div>
        <img src={flatmate.image} alt="Profile"></img>
      </div>
      <div>
        <p> Hi, I am {flatmate.username} </p>
        <ul>
          <li>Gender: {flatmate.gender}</li>
          <li>Age:{flatmate.age}</li>
          <li>My Budget:{flatmate.maxBudget}</li>
          <li>Pets:{flatmate.hasPet}</li>
          <li>Smoking:{flatmate.isSmoking}</li>
          <li>Studying:{flatmate.isStudying}</li>
          <li>Working:{flatmate.isWorking}</li>
        </ul>
        <div>
          <p> I am looking for:</p>
          <ul>
          <li>Gender: {flatmate.searchingFor.gender}</li>
          <li>Max number of flatmates: {flatmate.searchingFor.Flatmates}</li>
          <li>pets: {flatmate.searchingFor.pets}</li>
          <li>smoke: {flatmate.searchingFor.smoke}</li>
          <li>Age: Between{flatmate.searchingFor.minAge} and {flatmate.searchingFor.maxAge}</li>
          
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailFlatmate;