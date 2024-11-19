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

export default Trips