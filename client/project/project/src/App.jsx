import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Trips from './pages/Trips'
import TripDetails from './pages/TripDetails'
import TripForm from './components/TripForm'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        } />
        <Route path="/trips" element={
          <PrivateRoute>
            <Layout><Trips /></Layout>
          </PrivateRoute>
        } />
        <Route path="/trips/new" element={
          <PrivateRoute>
            <Layout><TripForm /></Layout>
          </PrivateRoute>
        } />
        <Route path="/trips/:id" element={
          <PrivateRoute>
            <Layout><TripDetails /></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App