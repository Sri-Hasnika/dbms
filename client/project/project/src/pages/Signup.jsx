// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { toast } from 'react-hot-toast'
// import useAuthStore from '../store/authStore'

// const Signup = () => {
//   const navigate = useNavigate()
//   const login = useAuthStore((state) => state.login)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   })

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Check if passwords match
//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match!');
//       return;
//     }
  
//     try {
//       // Simulate signup - Make an API call
//       const response = await fetch('http://localhost:3001/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           name: formData.name,
//         }),
//       });
  
//       if (!response.ok) {
//         console.log("Hi")
//         throw new Error('Signup failed');
//          // Handle non-200 responses
//       }
  
//       const data = await response.json();
//       login({ email: formData.email, name: formData.name, token: data.token }); // Assuming a token is returned
//       toast.success('Account created successfully!');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error(`Signup failed: ${error.message}`);
//     }
//   };
  

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
//     >
//       <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             className="input-field"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             className="input-field"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             className="input-field"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             className="input-field"
//             value={formData.confirmPassword}
//             onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//             required
//           />
//         </div>
//         <button type="submit" className="w-full btn-primary">
//           Sign Up
//         </button>
//       </form>
//     </motion.div>
//   )
// }

// export default Signup


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    console.log(formData);

    try {
      // Use Axios for signup API call
      const response = await axios.post('http://localhost:3001/api/register', {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });


      // Extract data from Axios response
      const { token } = response.data;

      login({ email: formData.email, name: formData.name, token }); // Assuming token is returned
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Signup failed: ${errorMessage}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="input-field"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="input-field"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="input-field"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="w-full btn-primary">
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
