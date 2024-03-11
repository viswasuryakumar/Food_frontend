import React, { useState } from 'react';
import { GrFormClose } from "react-icons/gr";
const CreateCheckpointModal = ({ setOpenModal, onSave,itemId }) => {

  const host = 'https://food-backend-rqn3.onrender.com'

  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    condition: '',
    storageTemperature: '',
    spoilage: '',
    location:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${host}/checkpoint/create-checkpoint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId:user._id,
          itemId:itemId
        }),
      });

      if (response.ok) {
        
        alert('Checkpoint created succesfully');;
        
      } else {
        // Handle error scenarios
        alert('Error in creating Checkpoint');;
        console.error('Failed to create checkpoint:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating checkpoint:', error);
    }
    setOpenModal(false)
  };

  return (
    <div className='bg-[rgba(0,0,0,0.7)] fixed top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center'>
      <div className='relative bg-white p-6 rounded-lg min-w-[30vw]'>

        <GrFormClose onClick={()=>setOpenModal(false)} className='h-6 w-6 text-black absolute right-4 top-4 cursor-pointer'/>

        <h2 className='text-2xl font-semibold mb-4'>Create Checkpoint</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='condition' className='block text-sm font-medium text-gray-700'>
              Current Location
            </label>
            <input
              type='text'
              id='location'
              name='location'
              value={formData.location}
              onChange={handleChange}
              required
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='condition' className='block text-sm font-medium text-gray-700'>
              Condition
            </label>
            <input
              type='text'
              id='condition'
              name='condition'
              value={formData.condition}
              onChange={handleChange}
              required
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='storageTemperature' className='block text-sm font-medium text-gray-700'>
              Storage Temperature
            </label>
            <input
              type='text'
              id='storageTemperature'
              name='storageTemperature'
              value={formData.storageTemperature}
              onChange={handleChange}
              required
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='spoilage' className='block text-sm font-medium text-gray-700'>
              Spoilage
            </label>
            <input
              type='text'
              id='spoilage'
              name='spoilage'
              value={formData.spoilage}
              onChange={handleChange}
              required
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          </div>

          <div className='flex justify-between'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'
            >
              Save
            </button>
            <button
              type='button'
              onClick={()=>setOpenModal(false)}
              className='ml-4 bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCheckpointModal;
