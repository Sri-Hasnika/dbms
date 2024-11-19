import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useTripStore from '../store/tripStore'
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  const { trips, setTrips } = useTripStore()

  useEffect(() => {
    // Simulate API call - In a real app, this would fetch from a backend
    setTrips([
      {
        id: 1,
        title: 'Paris Adventure',
        startDate: '2024-06-15',
        endDate: '2024-06-22',
        location: 'Paris, France',
        collaborators: 3,
      },
      {
        id: 2,
        title: 'Tokyo Explorer',
        startDate: '2024-07-10',
        endDate: '2024-07-20',
        location: 'Tokyo, Japan',
        collaborators: 2,
      },
    ])
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/trips/new" className="btn-primary">
          Create New Trip
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <Link to={`/trips/${trip.id}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{trip.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>{trip.startDate} - {trip.endDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{trip.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  <span>{trip.collaborators} collaborators</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard