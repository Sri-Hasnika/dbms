import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useTripStore from '../store/tripStore'
import TripCard from '../components/TripCard'
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline'

const Trips = () => {
  const { trips } = useTripStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.location.toLowerCase().includes(searchTerm.toLowerCase())
    if (filter === 'all') return matchesSearch
    if (filter === 'upcoming') return matchesSearch && new Date(trip.startDate) > new Date()
    if (filter === 'past') return matchesSearch && new Date(trip.endDate) < new Date()
    return matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
        <Link to="/trips/new" className="btn-primary flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          New Trip
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search trips..."
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <select
            className="input-field"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Trips</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}
export default Trips;

// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const NewTrip = () => {
//   const [tripName, setTripName] = useState('')
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [purpose, setPurpose] = useState('')
//   const [budget, setBudget] = useState('')
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const tripData = {
//       tripName,
//       startDate,
//       endDate,
//       purpose,
//       budget,
//     }

//     try {
//       const response = await fetch('http://localhost:3080/api/trips', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(tripData),
//       })

//       if (response.ok) {
//         const data = await response.json()
//         // Redirect to the trip details page or dashboard after successful creation
//         navigate(`/trips/${data.tripId}`)
//       } else {
//         console.error('Failed to create trip')
//       }
//     } catch (error) {
//       console.error('Error creating trip:', error)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Trip Name</label>
//         <input
//           type="text"
//           value={tripName}
//           onChange={(e) => setTripName(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Start Date</label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>End Date</label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Purpose</label>
//         <textarea
//           value={purpose}
//           onChange={(e) => setPurpose(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Budget</label>
//         <input
//           type="number"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//         />
//       </div>
//       <button type="submit">Create Trip</button>
//     </form>
//   )
// }

// export default NewTrip
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'

// const NewTrip = () => {
//   const [tripName, setTripName] = useState('')
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')
//   const [purpose, setPurpose] = useState('')
//   const [budget, setBudget] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     const tripData = {
//       tripName,
//       startDate,
//       endDate,
//       purpose,
//       budget,
//     }

//     try {
//       const response = await fetch('http://localhost:8000/api/trips', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(tripData),
//       })

//       if (response.ok) {
//         const data = await response.json()
//         // Redirect to the trip details page after successful creation
//         navigate(`/trips/${data.tripId}`)
//       } else {
//         const data = await response.json()
//         setError(data.error || 'Failed to create trip')
//       }
//     } catch (error) {
//       console.error('Error creating trip:', error)
//       setError('Something went wrong, please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
//       <motion.h1
//         className="text-3xl font-bold text-center mb-6 text-gray-900"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         Create New Trip
//       </motion.h1>

//       <form onSubmit={handleSubmit}>
//         <div className="space-y-4">
//           {/* Trip Name */}
//           <div>
//             <label htmlFor="tripName" className="block text-sm font-semibold text-gray-700">
//               Trip Name
//             </label>
//             <input
//               type="text"
//               id="tripName"
//               value={tripName}
//               onChange={(e) => setTripName(e.target.value)}
//               className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Start Date */}
//           <div>
//             <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700">
//               Start Date
//             </label>
//             <input
//               type="date"
//               id="startDate"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* End Date */}
//           <div>
//             <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700">
//               End Date
//             </label>
//             <input
//               type="date"
//               id="endDate"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Purpose */}
//           <div>
//             <label htmlFor="purpose" className="block text-sm font-semibold text-gray-700">
//               Purpose
//             </label>
//             <textarea
//               id="purpose"
//               value={purpose}
//               onChange={(e) => setPurpose(e.target.value)}
//               className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="4"
//               required
//             />
//           </div>

//           {/* Budget */}
//           <div>
//             <label htmlFor="budget" className="block text-sm font-semibold text-gray-700">
//               Budget
//             </label>
//             <input
//               type="number"
//               id="budget"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//               className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="text-red-600 text-sm mt-4">
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
//             disabled={loading}
//             whileTap={{ scale: 0.95 }}
//           >
//             {loading ? 'Creating Trip...' : 'Create Trip'}
//           </motion.button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default NewTrip