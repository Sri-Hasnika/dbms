import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

const ItineraryTab = () => {
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState({
    time: '',
    description: '',
  })

  const addActivity = () => {
    if (newActivity.time && newActivity.description) {
      setActivities([...activities, { ...newActivity, id: Date.now() }])
      setNewActivity({ time: '', description: '' })
    }
  }

  const removeActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input
          type="time"
          className="input-field w-40"
          value={newActivity.time}
          onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Activity description"
          className="input-field flex-1"
          value={newActivity.description}
          onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
        />
        <button onClick={addActivity} className="btn-primary">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
          >
            <span className="w-40 font-medium">{activity.time}</span>
            <span className="flex-1">{activity.description}</span>
            <button
              onClick={() => removeActivity(activity.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ItineraryTab