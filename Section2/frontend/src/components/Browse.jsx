import React, { useState } from 'react'
import laptopData from './dummyData';

const Browse = () => {
    
    const [laptopList, setlaptopList] = useState(laptopData);

    const displayLaptopData = ()=>{
        if(laptopList.length === 0) return <h1 className='text-center'>No Data Found</h1>

        return laptopList.map((laptop)=> (<div className='col-md-3'>
            <div className='card'>
                <img src={laptop.image} alt="" />
                <div className='card-body'>
                    <h4>{laptop.name}</h4>
                    <p>{laptop.price} avg rating</p>
                    <p>{laptop.reviews} reviews</p>
                    <h2>₹{laptop.price}</h2>

                </div>

            </div>
            
        </div>))
    };
    const filterLaptop = (e)=>{
        const value = e.target.value;
        setlaptopList(laptopData.filter((laptop) =>{
            return laptop.tittle.toLowerCase().includes(value.toLowerCase())
        } ));
    }
      return(
    
    <div>
        <header className='bg-target-tertiary'>
            <div className='container py-5'>
                <p className='display-2 text-center fw-bold'>Browse Laptop</p>
                <input type="text" className='form-control w-75 m-auto' onChange={filterLaptop}/>


            </div>
        </header>
        <div className='container'>
            <div className='row'>{displayLaptopData()}</div>

        </div>
    </div>
  )
}

export default Browse