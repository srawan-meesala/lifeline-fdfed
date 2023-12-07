// ShowDoctors.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import EachDoctor from '../components/EachDoctor';
import Searchbar from '../components/Searchbar';
import axios from 'axios';

const ShowDoctors = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [hospitalsList, setHospitalsList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/doctorsAPI');
        setDoctorsList(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();

    axios.get('http://localhost:8000/hospitalsAPI')
      .then(response => {
        setHospitalsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching hospital data:', error);
      });
  }, []);

  const getHospitalCity = (hospitalName) => {
    const hospital = hospitalsList.find(hospital => hospital.hospitalName === hospitalName);
    return hospital ? hospital.city : 'Unknown';
  };

  const handleSearch = async (query) => {
    setSearchResults(query);
  };

  return (
    <div className="containerr">
      <Navbar />
      <div className="ShowDoctors-searchbar">
        <Searchbar onSearch={handleSearch} />
      </div>
      <div className="content-mid">
        <div className="content-searched">
          <p className="searched-for">
            Search results 
          </p>
          <form action="/" class="filters">
                <div class="sort">
                    <label for="sortOrder">Sort order</label>
                    <select name="sortOrder" id="sortOrder">
                        <option value="priceAsc">Price &darr;</option>
                        <option value="priceDesc">Price &uarr;</option>
                    </select>
                </div>
                <div class="spec">
                    <label for="specialization">Specialization</label>
                    <select name="specialization" id="specialization">
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                        <option value="cardiology">cardiology</option>
                    </select>
                </div>
                <div class="exp-sort">
                    <label for="expSort">Hospital Name</label>
                    <select name="expSort" id="expSort">
                        <option value="Ram Prasad Clinic">Ram Prasad Clinic</option>
                    </select>
                </div>
            </form>
        </div>
      </div>
      <div className="panels">
        {searchResults.length > 0 ? (
          searchResults.map((doctor, index) => (
            <EachDoctor
              key={index}
              city={getHospitalCity(doctor.hospitalName)}
              {...doctor}
            />
          ))
        ) : (
          doctorsList.map((doctor, index) => (
            <EachDoctor
              key={index}
              city={getHospitalCity(doctor.hospitalName)}
              {...doctor}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ShowDoctors;



        
      