import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Tab } from '@headlessui/react'
import useTripStore from '../store/tripStore'
import ItineraryTab from '../components/ItineraryTab'
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'

const TripDetails = () => {
  const { id } = useParams()
  const { trips, selectTrip, selectedTrip } = useTripStore()
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const trip = trips.find((t) => t.id === parseInt(id))
    if (trip) {
      selectTrip(trip)
    }
  }, [id, trips, selectTrip])

  if (!selectedTrip) return null

  const tabs = [
    { name: 'Itinerary', icon: CalendarIcon, component: ItineraryTab },
    { name: 'Budget', icon: CurrencyDollarIcon },
    { name: 'Documents', icon: DocumentIcon },
    { name: 'Collaborators', icon: UserGroupIcon },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedTrip.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>{selectedTrip.startDate} - {selectedTrip.endDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>{selectedTrip.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <UserGroupIcon className="h-5 w-5 mr-2" />
            <span>{selectedTrip.collaborators} collaborators</span>
          </div>
        </div>
      </motion.div>

      <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
        <Tab.List className="flex space-x-1 bg-white p-1 rounded-lg shadow-md mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `flex-1 flex items-center justify-center py-3 px-4 rounded-md focus:outline-none ${
                    selected
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.name}
              </Tab>
            )
          })}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, idx) => (
            <Tab.Panel key={idx}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-4">{tab.name}</h2>
                {tab.component ? <tab.component /> : <p>Coming soon...</p>}
              </motion.div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default TripDetails