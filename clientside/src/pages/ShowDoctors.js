import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import EachDoctor from '../components/EachDoctor';
import Searchbar from '../components/Searchbar';
import axios from 'axios';

const ShowDoctors = () => {
  const [hospitalsList, setHospitalsList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/doctorsAPI');
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    }
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

  const [sortOrder, setSortOrder] = useState('None')

  useEffect(() => {
    if (sortOrder === 'priceAsc') {
      let sortedDocs = [...searchResults]
      sortedDocs.sort((a, b) => a.fee - b.fee);
      setSearchResults(sortedDocs);
    } else if (sortOrder === 'priceDesc') {
      let sortedDocs = [...searchResults]
      sortedDocs.sort((a, b) => b.fee - a.fee);
      setSearchResults(sortedDocs);
    } else {
    }
  }, [sortOrder, searchResults]);

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
          <form action="/" className="filters">
            <div className="sort">
              <label htmlFor="sortOrder">Sort order</label>
              <select onChange={e => setSortOrder(e.target.value)} name="sortOrder" id="sortOrder">
                <option value="priceAsc">Price &darr;</option>
                <option value="priceDesc">Price &uarr;</option>
              </select>
            </div>
            <div className="spec sort">
              <label htmlFor="specialization">Specialization</label>
              <select name="specialization" id="specialization">
                <option value="cardiology">cardiology</option>
                <option value="cardiology">cardiology</option>
                <option value="cardiology">cardiology</option>
                <option value="cardiology">cardiology</option>
                <option value="cardiology">cardiology</option>
                <option value="cardiology">cardiology</option>
              </select>
            </div>
            <div className="exp-sort sort">
              <label htmlFor="expSort">Hospital Name</label>
              <select name="expSort" id="expSort">
                {hospitalsList.map(hospital => (
                  <option key={hospital.hospID} value={hospital.hospName}>{hospital.hospName}</option>
                ))}
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
          <div>Not Found</div>
        )}
      </div>
    </div>
  );
};

export default ShowDoctors;




