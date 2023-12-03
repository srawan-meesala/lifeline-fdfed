import React from 'react'
import { MdCall } from "react-icons/md";
import Navbar from '../components/Navbar';
import Diamond from '../images/6.png';
import EachDoctor from '../components/EachDoctor';
import Searchbar from '../components/Searchbar';


const ShowDoctors = () => {
  return (
    <div class="containerr">
        <Navbar/>
        <div className='ShowDoctors-searchbar'>
            <Searchbar/>
        </div>
        <div class="content-mid">
            <div class="content-searched">
                <p class="searched-for">
                    Search results for &nbsp;"<span>Ram prasad</span>"
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
        <div class="panels">
            <EachDoctor/>
            <EachDoctor/>
            <EachDoctor/>
            <EachDoctor/>
            <EachDoctor/>
        </div>
    </div>
  )
}

export default ShowDoctors