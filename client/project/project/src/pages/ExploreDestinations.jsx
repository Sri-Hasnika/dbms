
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ExploreDestinations = () => {
//   const [destinations, setDestinations] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [loading, setLoading] = useState(true);

//   const fetchDestinations = async (category) => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:3080/api/destinations', {
//         params: { category },
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setDestinations(response.data);
//     } catch (err) {
//       console.error('Error fetching destinations:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDestinations(filter);
//   }, [filter]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
//         Explore Destinations
//       </h1>
//       <div className="flex justify-center mb-6">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="p-3 border rounded-lg shadow-md w-full max-w-xs bg-white focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">All Categories</option>
// <option value="nature">Nature</option>
// <option value="adventure">Adventure</option>
// <option value="family-friendly">Family-Friendly</option>
// <option value="beaches">Beaches</option>
// <option value="mountains">Mountains</option>
// <option value="historical-sites">Historical Sites</option>
// <option value="wildlife">Wildlife</option>
// <option value="cultural-experiences">Cultural Experiences</option>
// <option value="luxury">Luxury</option>
// <option value="budget-friendly">Budget-Friendly</option>
// <option value="romantic">Romantic</option>
// <option value="nightlife">Nightlife</option>
// <option value="foodie-paradise">Foodie Paradise</option>
// <option value="wellness-retreats">Wellness Retreats</option>
// <option value="shopping">Shopping</option>
// <option value="offbeat">Offbeat</option>

//         </select>
//       </div>
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {destinations.map((destination) => (
//             <div
//               key={destination.id}
//               className="relative group overflow-hidden border rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
//             >
//               <img
//                 src={destination.imageUrl}
//                 alt={destination.name}
//                 className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black bg-opacity-50 text-white">
//                 <h2 className="text-lg font-bold truncate">{destination.name}</h2>
//                 <p className="text-sm truncate">{destination.description}</p>
//                 <span className="mt-2 inline-block px-2 py-1 text-xs bg-blue-600 text-white rounded">
//                   {destination.category}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // export default ExploreDestinations;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ExploreDestinations = () => {
//   const [destinations, setDestinations] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [loading, setLoading] = useState(true);

//   const sampleDestinations = [
//     { id: 1, name: 'Amazon Rainforest', category: 'nature', description: 'Explore the lush greenery of the Amazon.', imageUrl: 'https://via.placeholder.com/300x200?text=Amazon+Rainforest' },
//     { id: 2, name: 'Mount Everest', category: 'adventure', description: 'The ultimate adventure for climbers.', imageUrl: 'https://via.placeholder.com/300x200?text=Mount+Everest' },
//     { id: 3, name: 'Disneyland', category: 'family-friendly', description: 'Fun for all ages at Disneyland.', imageUrl: 'https://via.placeholder.com/300x200?text=Disneyland' },
//     { id: 4, name: 'Maldives', category: 'beaches', description: 'Pristine beaches and crystal-clear waters.', imageUrl: 'https://via.placeholder.com/300x200?text=Maldives' },
//     { id: 5, name: 'Swiss Alps', category: 'mountains', description: 'Snowy peaks and serene landscapes.', imageUrl: 'https://via.placeholder.com/300x200?text=Swiss+Alps' },
//     { id: 6, name: 'Pyramids of Giza', category: 'historical-sites', description: 'Marvel at ancient wonders.', imageUrl: 'https://via.placeholder.com/300x200?text=Pyramids+of+Giza' },
//     { id: 7, name: 'Serengeti National Park', category: 'wildlife', description: 'Witness the great migration.', imageUrl: 'https://via.placeholder.com/300x200?text=Serengeti+National+Park' },
//     { id: 8, name: 'Kyoto', category: 'cultural-experiences', description: 'Traditional temples and culture.', imageUrl: 'https://via.placeholder.com/300x200?text=Kyoto' },
//     { id: 9, name: 'Dubai', category: 'luxury', description: 'Experience opulence and grandeur.', imageUrl: 'https://via.placeholder.com/300x200?text=Dubai' },
//     { id: 10, name: 'Bangkok', category: 'budget-friendly', description: 'Affordable yet vibrant.', imageUrl: 'https://via.placeholder.com/300x200?text=Bangkok' },
//     { id: 11, name: 'Santorini', category: 'romantic', description: 'Picturesque sunsets for couples.', imageUrl: 'https://via.placeholder.com/300x200?text=Santorini' },
//     { id: 12, name: 'Ibiza', category: 'nightlife', description: 'Party all night at Ibiza.', imageUrl: 'https://via.placeholder.com/300x200?text=Ibiza' },
//     { id: 13, name: 'Tokyo', category: 'foodie-paradise', description: 'A haven for food lovers.', imageUrl: 'https://via.placeholder.com/300x200?text=Tokyo' },
//     { id: 14, name: 'Bali Retreat', category: 'wellness-retreats', description: 'Relax and rejuvenate in Bali.', imageUrl: 'https://via.placeholder.com/300x200?text=Bali+Retreat' },
//     { id: 15, name: 'Milan', category: 'shopping', description: 'Fashion capital of the world.', imageUrl: 'https://via.placeholder.com/300x200?text=Milan' },
//     { id: 16, name: 'Antarctica', category: 'offbeat', description: 'Explore the icy wilderness.', imageUrl: 'https://via.placeholder.com/300x200?text=Antarctica' },
//   ];

//   const fetchDestinations = async (category) => {
//     try {
//       setLoading(true);
//       // Filter destinations locally based on category for demonstration
//       const filteredDestinations = category
//         ? sampleDestinations.filter((dest) => dest.category === category)
//         : sampleDestinations;
//       setDestinations(filteredDestinations);
//     } catch (err) {
//       console.error('Error fetching destinations:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDestinations(filter);
//   }, [filter]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
//         Explore Destinations
//       </h1>
//       <div className="flex justify-center mb-6">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="p-3 border rounded-lg shadow-md w-full max-w-xs bg-white focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">All Categories</option>
//           <option value="nature">Nature</option>
//           <option value="adventure">Adventure</option>
//           <option value="family-friendly">Family-Friendly</option>
//           <option value="beaches">Beaches</option>
//           <option value="mountains">Mountains</option>
//           <option value="historical-sites">Historical Sites</option>
//           <option value="wildlife">Wildlife</option>
//           <option value="cultural-experiences">Cultural Experiences</option>
//           <option value="luxury">Luxury</option>
//           <option value="budget-friendly">Budget-Friendly</option>
//           <option value="romantic">Romantic</option>
//           <option value="nightlife">Nightlife</option>
//           <option value="foodie-paradise">Foodie Paradise</option>
//           <option value="wellness-retreats">Wellness Retreats</option>
//           <option value="shopping">Shopping</option>
//           <option value="offbeat">Offbeat</option>
//         </select>
//       </div>
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {destinations.map((destination) => (
//             <div
//               key={destination.id}
//               className="relative group overflow-hidden border rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
//             >
//               <img
//                 src={destination.imageUrl}
//                 alt={destination.name}
//                 className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black bg-opacity-50 text-white">
//                 <h2 className="text-lg font-bold truncate">{destination.name}</h2>
//                 <p className="text-sm truncate">{destination.description}</p>
//                 <span className="mt-2 inline-block px-2 py-1 text-xs bg-blue-600 text-white rounded">
//                   {destination.category}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExploreDestinations;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import amazon from '../assets/amazon.jpg';
import disneyland from '../assets/disneyland.jpg';
import everest from '../assets/everest.jpg';
import maldives from '../assets/maldives.jpg';
const ExploreDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sampleDestinations = [
    {
      id: 1,
      name: 'Amazon Rainforest',
      category: 'nature',
      description: 'Explore the lush greenery of the Amazon.',
      imageUrl: 'https://www.google.com/imgres?q=amazon%20forest%20hd%20images%20download&imgurl=https%3A%2F%2Ft3.ftcdn.net%2Fjpg%2F05%2F36%2F24%2F84%2F360_F_536248460_6v17TuLgFcIzwNzNzQfrRfeO2OUvOgAe.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Drainforest%2Bamazon&docid=066YNRp3fsguJM&tbnid=gD-1pApZsFaOlM&vet=12ahUKEwjfqND3gu6JAxXbTWwGHV1bIBkQM3oECGMQAA..i&w=540&h=360&hcb=2&ved=2ahUKEwjfqND3gu6JAxXbTWwGHV1bIBkQM3oECGMQAA'
    },
    {
      id: 2,
      name: 'Mount Everest',
      category: 'adventure',
      description: 'The ultimate adventure for climbers.',
      imageUrl: '',
    },
    {
      id: 3,
      name: 'Disneyland',
      category: 'family-friendly',
      description: 'Fun for all ages at Disneyland.',
      imageUrl: '',
    },
    {
      id: 4,
      name: 'Maldives',
      category: 'beaches',
      description: 'Pristine beaches and crystal-clear waters.',
      imageUrl: '',
    },
    // Add more destinations here
  ];

  const fetchDestinations = async (category) => {
    try {
      setLoading(true);
      const filteredDestinations = category
        ? sampleDestinations.filter((dest) => dest.category === category)
        : sampleDestinations;
      setDestinations(filteredDestinations);
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations(filter);
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
        Explore Destinations
      </h1>
      <div className="flex justify-center mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 border rounded-lg shadow-md w-full max-w-xs bg-white focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          <option value="nature">Nature</option>
          <option value="adventure">Adventure</option>
          <option value="family-friendly">Family-Friendly</option>
          <option value="beaches">Beaches</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="relative group overflow-hidden border rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/destination/${destination.id}`)}
            >
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black bg-opacity-50 text-white">
                <h2 className="text-lg font-bold truncate">{destination.name}</h2>
                <p className="text-sm truncate">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreDestinations;
