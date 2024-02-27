import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import EachDoctor from '../components/EachDoctor';
import Searchbar from '../components/Searchbar';
import axios from 'axios';

const ShowDoctors = () => {
  const [hospitalsList, setHospitalsList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [updatedResults, setUpdatedResults] = useState(searchResults);

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

  const [sortOrder, setSortOrder] = useState('priceAsc')

  useEffect(() => {
    if (sortOrder === 'priceAsc') {
      let sortedDocs = [...updatedResults]
      sortedDocs.sort((a, b) => a.fee - b.fee);
      setUpdatedResults(sortedDocs);
    } else if (sortOrder === 'priceDesc') {
      let sortedDocs = [...updatedResults]
      sortedDocs.sort((a, b) => b.fee - a.fee);
      setUpdatedResults(sortedDocs);
    }
  }, [sortOrder]);

  const [specs, setSpecs] = useState([])

  useEffect(() => {
    let allSpecs = new Set()
    for (let searchResult of searchResults) {
      allSpecs.add(searchResult.specialization)
    }
    let newSpecs = Array.from(allSpecs)
    setSpecs(newSpecs)
  }, [searchResults])

  const [selected, setSelected] = useState('All')

  useEffect(() => {
    if (selected === 'All') {
      setUpdatedResults(searchResults)
    } else {
      let docsAll = [...searchResults]
      let docsSpecialized = []
      for (let doc of docsAll) {
        if (doc.specialization === selected) {
          docsSpecialized.push(doc)
        }
        console.log(docsSpecialized);
      }
      setUpdatedResults(docsSpecialized)
    }
  }, [selected])

  const [hospSelected, setHospSelected] = useState('All')

  useEffect(() => {
    if (hospSelected === 'All') {
      setUpdatedResults(searchResults)
    } else {
      let docsAll = [...searchResults]
      let docsFromHospSelected = []
      for (let doc in docsAll) {
        if (docsAll[doc].hospName === hospSelected) {
          docsFromHospSelected.push(docsAll[doc])
        }
        console.log(docsFromHospSelected);
      }
      setUpdatedResults(docsFromHospSelected);
    }
  }, [hospSelected, searchResults]);

  return (
    <div className="containerr">
      <Navbar title={'Book an Appointment'} />
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
              <select onChange={e => setSelected(e.target.value)} name="specialization" id="specialization">
                <option value="All">All</option>
                {specs.map((spec, i) => (
                  <option key={i} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <div className="exp-sort sort">
              <label htmlFor="expSort">Hospital Name</label>
              <select onChange={e => setHospSelected(e.target.value)} name="expSort" id="expSort">
                <option value="All">All</option>
                {hospitalsList.map(hospital => (
                  <option key={hospital.hospID} value={hospital.hospName}>{hospital.hospName}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>
      <div className="panels">
        {updatedResults.length > 0 ? (
          updatedResults.map((doctor, index) => (
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




