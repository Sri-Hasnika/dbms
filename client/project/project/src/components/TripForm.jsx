import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import useTripStore from '../store/tripStore'

const TripForm = () => {
  const navigate = useNavigate()
  const addTrip = useTripStore((state) => state.addTrip)
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTrip = {
      id: Date.now(),
      ...formData,
      collaborators: 1,
    }
    addTrip(newTrip)
    toast.success('Trip created successfully!')
    navigate('/trips')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Create New Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Trip Title</label>
          <input
            type="text"
            className="input-field"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              className="input-field"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              className="input-field"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="input-field"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="input-field"
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/trips')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Trip
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default TripForm