import React, { useEffect, useState } from 'react';
import Checkpoints from '../components/Checkpoints';

const ViewItems = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user.role;

  const host = 'https://food-backend-rqn3.onrender.com'
  const frontendHost = 'https://food-frontend-alpha.vercel.app'
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCheckpoints, setShowCheckpoints] = useState(false);

  useEffect(() => {
    // Fetch all items from the backend
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${host}/items/get-items`); // Replace with your backend API endpoint
      if (response.ok) {
        const data = await response.json();
        setItems(data);
        console.log(data);
      } else {
        alert('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const formatDate = (dateStr)=>{
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString();
    return formattedDate
  }
  const handleEditDetails = (item) => {
    setSelectedItem(item);
    setShowCheckpoints(true);
  };

  const handleCloseCheckpoints = () => {
    setShowCheckpoints(false);
  };

  return (
    <div className='min-h-[90vh] bg-slate-300 h-full w-full px-16 py-8 flex gap-4'>
      <div className='w-1/2'>
        <h2 className='text-3xl font-bold mb-4'>All Items</h2>
        {items.map((item) => (
          <div
            key={item._id}
            className='relative bg-white p-4 mb-4 rounded-md shadow-md flex flex-col gap-2'
          >

            <h3 className='text-3xl font-semibold'>{item.name}</h3>
            <div className={`grid  ${role==="Customer"?'grid-cols-1':'grid-cols-2'} `}>
                <div className='flex flex-col gap-y-2'>
                    <p> <span className='text-xl font-semibold'>Condition:</span>  {item.condition}</p>
                    <p><span className='text-xl font-semibold'>Quantity:</span>  {item.quantity}</p>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p><span  className='text-xl font-semibold'>Storage Temperature: </span> {item.storageTemperature}</p>
                    
                    <p><span  className='text-xl font-semibold'>Origin Location: </span> {item.originLocation}</p>
                </div>
            </div>
            <p><span  className='text-xl font-semibold'>Spoilage: </span> {item.spoilage}</p>
            <p><span  className='text-xl font-semibold'>Harvest Date: </span>{formatDate(item.harvestDate)}</p>
            
            {
            role==="Customer" &&  <div className={'absolute right-[10%] bottom-[50%] translate-y-1/2'}>
                <img src={`http://api.qrserver.com/v1/create-qr-code/?data=${frontendHost}/view-item/:${item._id}&size=200x200`} alt=""/>
              </div>
            } 
              

            <p className='text-sm text-zinc-500 font-semibold '>Item ID - {item._id}  </p>
            {
              role!=="Customer" && 
              <button onClick={() => handleEditDetails(item)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4'>
                Edit Details
              </button>
            }
          </div>
        ))}
      </div>
      {
        role!=="Customer" && 

      <div className='w-1/2'>
        <h2 className='text-3xl font-bold mb-4'>All Checkpoints</h2>
        {showCheckpoints && (
          <Checkpoints
          item={selectedItem}
          onClose={handleCloseCheckpoints}
          />
          )}
      </div>
      }
    </div>
  );
};

export default ViewItems;
