import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const sampleDetails = {
  1: {
    name: 'Amazon Rainforest',
    description: 'Explore the lush greenery and rich biodiversity of the Amazon Rainforest.',
    photos: [
      'https://source.unsplash.com/featured/?amazon,rainforest,1',
      'https://source.unsplash.com/featured/?amazon,rainforest,2',
      'https://source.unsplash.com/featured/?amazon,rainforest,3',
    ],
  },
  2: {
    name: 'Mount Everest',
    description: 'Experience the ultimate adventure at Mount Everest.',
    photos: [
      'https://source.unsplash.com/featured/?mount-everest,1',
      'https://source.unsplash.com/featured/?mount-everest,2',
      'https://source.unsplash.com/featured/?mount-everest,3',
    ],
  },
  // Add more details here
};

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const details = sampleDetails[id];
    if (!details) {
      navigate('/404'); // Redirect to 404 if no details found
    } else {
      setDestination(details);
    }
  }, [id, navigate]);

  if (!destination) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">{destination.name}</h1>
      <p className="text-lg mb-4">{destination.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destination.photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1} of ${destination.name}`}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationDetails;
