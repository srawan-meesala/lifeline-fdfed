import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import EachDoctor from '../components/EachDoctor';
import Searchbar from '../components/Searchbar';
import axios from 'axios';

const ShowDoctors = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [hospitalsList, setHospitalsList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/hospitalsAPI')
      .then(response => {
        setHospitalsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching hospital data:', error);
      });

    axios.get('http://localhost:8000/doctorsAPI') 
      .then(response => {
        setDoctorsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor data:', error);
      });
  }, []);

  const getHospitalCity = (hospitalName) => {
    const hospital = hospitalsList.find(hospital => hospital.hospitalName === hospitalName);
    return hospital ? hospital.city : 'Unknown';
  };

  return (
    <div className="containerr">
      <Navbar />
      <div className="ShowDoctors-searchbar">
        <Searchbar />
      </div>
      <div class="content-mid">
            <div class="content-searched">
                <p class="searched-for">
                    Search results 
                </p>
            </div>
            <form action="/" class="filters">
                <div class="sort">
                    <label for="sortOrder">Sort order</label>
                    <select name="sortOrder" id="sortOrder">
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                        <option value="priceAsc">Price &darr;</option>
                        <option value="priceDesc">Price &uarr;</option>
                    </select>
                </div>
                <div class="spec">
                    <label for="specialisation">Specialisation</label>
                    <select name="specialisation" id="specialisation">
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                    </select>
                </div>
                <div class="exp-sort">
                    <label for="expSort">Experience</label>
                    <select name="expSort" id="expSort">
                        <option value="<5">5 years or less</option>
                        <option value="5-10">5-10 years</option>
                        <option value=">10">10 years or more</option>
                    </select>
                </div>
            </form>
        </div>
      <div className="panels">
        {doctorsList.map((doctor, index) => (
          <EachDoctor
            key={index}
            city={getHospitalCity(doctor.hospitalName)}
            {...doctor}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowDoctors;