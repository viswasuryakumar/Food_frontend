import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bg from '../assets/home.jpg';
const ViewItemSingle = () => {

  let { itemId } = useParams();
  const [item, setItem] = useState({
    name:'',

  });

  useEffect(() => {
    // Fetch item details based on itemId from your backend API
    fetchItemDetails(itemId);
  }, []);

  const fetchItemDetails = async (itemId) => {
    
    itemId = itemId.substring(1)
    try {
      const response = await fetch(`https://food-backend-rqn3.onrender.com/items/get-item/:${itemId}`);
      if (response.ok) {
        const data = await response.json();
        setItem(data);
        console.log(data)
        
      } else {
        console.error('Failed to fetch item details');
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };
  const formatDate = (dateStr)=>{
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString();
    return formattedDate
  }
  return (
    <div className='relative min-h-[100vh] w-full flex flex-col items-center pb-8'>
      <img src={bg} alt="" className="z-5 absolute top-0 left-0 h-full h-min-[100vh] w-full object-cover" />

      <h1 className='text-2xl font-bold text-left mt-4 z-20'>Item Details </h1>
      <div className='z-20 bg-zinc-200 rounded-md p-6 px-10 mt-6 flex flex-col gap-y-2'>
        {/* Render details of the item */}
        <h2 className='text-xl font-bold'>{item?.name}</h2>
        <p>Harvest Date: {formatDate(item?.harvestDate)}</p>
        <p>Origin Location: {item?.originLocation}</p>
        <p>Quantity: {item?.quantity}</p>
        <p>Spoilage: {item?.spoilage}</p>
        <p>Storage Temperature: {item?.storageTemperature}</p>

        {/* Render checkpoints */}
        <h3 className='mt-4 mb-2 text-xl font-semibold'>Checkpoints</h3>
        {item?.checkpoints && item?.checkpoints.length > 0 ? (
          <ul className='max-h-[45vh] overflow-y-scroll'>
            {item?.checkpoints.map((checkpoint, index) => (
              <li key={index} className='mb-2'>
                <h2 className='font-semibold text-lg'>Checkpoint {index+1}</h2>
                <p>Created by a <span className='font-semibold'>{checkpoint.user.role}</span> </p>
                <p>Condition: {checkpoint.condition}</p>
                <p>Created On: {formatDate(checkpoint.createdOn)}</p>
                <p>Current Location: {checkpoint.currentLocation}</p>
                <p>Spoilage: {checkpoint.spoilage}</p>
                <p>Storage Temperature: {checkpoint.storageTemperature}</p>
                {/* ... other checkpoint properties */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No checkpoints available.</p>
        )}
      </div>
      
    </div>
  )
}

export default ViewItemSingle