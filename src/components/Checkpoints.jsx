import React,{useState} from 'react';
import CreateCheckpointModal from './CreateCheckpointModal';

const Checkpoints = ({ item, onClose }) => {

  const [openModal,setOpenModal] = useState(false);
  const formatDate = (dateStr)=>{
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString();
    return formattedDate
  }
  return (
    <div className='bg-white p-4 mb-4 rounded-md shadow-md'>
      <h3 className='text-3xl font-semibold mb-4'>Checkpoints for {item.name}</h3>
      {item.checkpoints.length === 0 ? (
        <p>No checkpoints created yet.</p>
      ) : (
        item.checkpoints.map((checkpoint) => (
          <div key={checkpoint._id} className='border-b-2 mb-4 pb-4'>
            <p>Condition: {checkpoint.condition}</p>
            <p>Spoilage: {checkpoint.spoilage}</p>
            <p>Storage Temperature: {checkpoint.storageTemperature}</p>
            {/* Add other checkpoint details */}
            <p>Created on: {formatDate(checkpoint.createdOn)}</p>
            <p>Created by: {checkpoint.user.name}</p>
            <p>Created by a: {checkpoint.user.role}</p>
          </div>
        ))
      )}
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4'
        onClick={onClose}
      >
        Close Checkpoints
      </button>
      <button
        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4 ml-4'
        onClick={() => setOpenModal(true)}
      >
        Create Checkpoint
      </button>

      {openModal && <CreateCheckpointModal itemId={item._id} setOpenModal = {setOpenModal}/>}
    </div>
  );
};

export default Checkpoints;
