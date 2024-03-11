import React, { useState } from 'react';
import bg from '../assets/home.jpg';

const CreateItem = () => {

    const host = 'https://food-backend-rqn3.onrender.com';

    const user = JSON.parse(localStorage.getItem('user'))
    const role = user.role;
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    condition: '',
    storageTemperature: '',
    spoilage: '',
    originLocation: '',
    harvestDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch(`${host}/items/create-item`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...formData,
            role:user.role
        }),
    })
    const data = await res.json();

    console.log('Data:', data);
    if(data.success)
      alert("Item created Successfully")
    else
    alert("Some Error Occured while creating Item")

    setFormData({
      name: '',
      quantity: '',
      condition: '',
      storageTemperature: '',
      spoilage: '',
      originLocation: '',
      harvestDate: '',
    });
  };

  return (
    <div className="relative h-full min-h-[100vh] w-full">
      <img src={bg} alt="" className="z-5 absolute top-0 left-0 h-full h-min-[100vh] w-full object-cover" />

      <div className="absolute left-[40%] bg-white p-8 w-[40vw]">
        {
          role==="Farmer" ?
          <>
          
            <h2 className="text-3xl font-bold mb-4">Add Food Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md outline-green-500"
                  required
                  placeholder='e.g. Potatoes'
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md outline-green-500"
                  required
                  placeholder='e.g. 12Kgs'
                />
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                  Condition:
                </label>
                <input
                  type="text"
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md outline-green-500"
                  required
                  placeholder='Describe condition of food'
                />
              </div>

              <div>
                <label htmlFor="storageTemperature" className="block text-sm font-medium text-gray-700">
                  Storage Temperature:
                </label>
                <input
                  type="text"
                  id="storageTemperature"
                  name="storageTemperature"
                  value={formData.storageTemperature}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md outline-green-500"
                  placeholder='Describe current storage temperature'
                />
              </div>

              <div>
                <label htmlFor="spoilage" className="block text-sm font-medium text-gray-700">
                  Spoilage:
                </label>
                <input
                  type="text"
                  id="spoilage"
                  name="spoilage"
                  value={formData.spoilage}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md outline-green-500"
                  placeholder='Describe Spoilage if any'
                />
              </div>

              <div>
                <label htmlFor="originLocation" className="block text-sm font-medium text-gray-700">
                  Origin Location:
                </label>
                <input
                  type="text"
                  id="originLocation"
                  name="originLocation"
                  value={formData.originLocation}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md outline-green-500"
                  required
                  placeholder='Enter location of origin'
                />
              </div>

              <div>
                <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">
                  Harvest Date:
                </label>
                <input
                  type="date"
                  id="harvestDate"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md outline-green-500"
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </>:
          <p className='text-red-500 text-3xl font-semibold'>Only FARMERS Can Access This Route.</p>
        }
      </div>
    </div>
  );
};

export default CreateItem;
