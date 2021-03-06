import React, { useState, useEffect } from "react";
import ButtonCard from "./ButtonCard";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faSmoking, faPaw, faMapMarkerAlt, faBriefcase, faGraduationCap, faTransgenderAlt, faVenusMars } from '@fortawesome/free-solid-svg-icons'



function DetailFlatmate(props) {
  const [flatmate, setFlatmate] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if(Object.keys(flatmate).length===0 || flatmate._id !== props.match.params.id){
    service.getFlatmate(props.match.params.id)
    .then((response) => {      
      setFlatmate(response)
    })
    service.isFavoriteUser(props.match.params.id)
    .then((response) => {      
      setIsFavorite(response)
    })
    }
  }); 

  const handleFavorite = () => {
    service.setFavoriteUser(props.match.params.id)
    .then(() => {setIsFavorite(!isFavorite)}) 
  }

  return (
    <div className = "detailFlatmate-container">
    <figure className="snip1515">
      <div>
      <div className="profile-image"> <img src={flatmate.image} alt="Profile" width="250" height="300"></img></div>
      </div>
      <div>
      <figcaption>

        <h3> Hi, I am {flatmate.username} </h3>
        <h4>{flatmate.age} years old</h4>
        <ul>
          <li><FontAwesomeIcon icon={faVenusMars} /> <FontAwesomeIcon icon={faTransgenderAlt} />: {flatmate.gender}</li>
         
          <li>My Budget: {flatmate.maxBudget} €</li>
          <br></br>
          <li><FontAwesomeIcon icon={faGraduationCap} />: {flatmate.isStudying ? "Yes" : "No"}</li>
          <li><FontAwesomeIcon icon={faPaw} />:  {flatmate.hasPet ? "Yes" : "No"}</li>
          <li><FontAwesomeIcon icon={faSmoking} />:  {flatmate.isSmoking ? "Yes" : "No"}</li>
          
          <li><FontAwesomeIcon icon={faBriefcase} />:{flatmate.isWorking ? "Yes" : "No"}</li>
        </ul>
         <div> 
          <p> <b>I am looking for:</b></p>
          <ul>
          <li>Max number of flatmates: {flatmate.searchingFor ? flatmate.searchingFor.Flatmates : ""}</li>
          <li><FontAwesomeIcon icon={faVenusMars} /> <FontAwesomeIcon icon={faTransgenderAlt} />: {flatmate.searchingFor ? flatmate.searchingFor.gender : ""}</li>
          <li><FontAwesomeIcon icon={faMapMarkerAlt} />: {flatmate.searchingFor ? flatmate.searchingFor.location : ""}</li>
          <li><FontAwesomeIcon icon={faPaw} /> : {flatmate.searchingFor ? flatmate.searchingFor.pets : ""}</li>
          <li><FontAwesomeIcon icon={faSmoking} /> : {flatmate.searchingFor ? flatmate.searchingFor.smoke : ""}</li>
          <li><FontAwesomeIcon icon={faBirthdayCake} />: Between {flatmate.searchingFor ? flatmate.searchingFor.minAge : ""} and {flatmate.searchingFor ? flatmate.searchingFor.maxAge : ""}</li>
          </ul>
        </div>  
       
       { props.user._id === props.match.params.id ? <ButtonCard  buttonTitle="Edit my profile" link="/improveMyProfile"  /> : <button  className="btnB" onClick={handleFavorite}>{isFavorite ? "remove from favorite" : "add to favorite"}</button>}
        <ButtonCard buttonTitle="Messages" link={`/chat/${props.match.params.id}`} />
       
       </figcaption> 
      </div>
      
      </figure>
    </div>
  );
}

export default withAuth(DetailFlatmate);
