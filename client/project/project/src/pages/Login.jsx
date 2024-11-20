// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { toast } from 'react-hot-toast'
// import useAuthStore from '../store/authStore'

// const Login = () => {
//   const navigate = useNavigate()
//   const login = useAuthStore((state) => state.login)
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       // Simulate login - Make an API call
//       const response = await fetch('http://localhost:8000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: formData.email, password: formData.password }) // Include necessary data
//       });
  
//       if (!response.ok) {
//         throw new Error('Login failed'); // Handle non-200 status codes
//       }
  
//       const data = await response.json();
//       login({ email: formData.email, token: data.token }); // Assuming token is returned
//       toast.success('Successfully logged in!');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error(`Login failed: ${error.message}`); // Display an error toast
//     }
//   };
  

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
//     >
//       <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
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
//         <button type="submit" className="w-full btn-primary">
//           Login
//         </button>
//       </form>
//     </motion.div>
//   )
// }

// export default Login
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   try {
  //     // Use Axios for login API call
  //     const response = await axios.post('http://localhost:8000/api/login', {
  //       email: formData.email,
  //       password: formData.password,
  //     });

  //     console.log(response.data);

  //     // Extract data from Axios response
  //     const { token, name } = response.data;

  //     login({ email: formData.email, name, token }); // Assuming name and token are returned
  //     toast.success('Successfully logged in!');
  //     navigate('/dashboard');
  //   } catch (error) {
  //     const errorMessage = error.response?.data?.message || error.message;
  //     toast.error(`Login failed: ${errorMessage}`);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Use Axios for login API call
      const response = await axios.post('http://localhost:8000/api/login', {
        email: formData.email,
        password: formData.password,
      });
  
      console.log(response.data);
  
      // Extract data from Axios response
      const { token, name, phoneNumber } = response.data;
  
      login({ email: formData.email, name, token }); // Include name in state
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Login failed: ${errorMessage}`);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button type="submit" className="w-full btn-primary">
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
