// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuthStore from '../store/authStore';

// const Profile = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuthStore();

//   // Redirect to login if not authenticated
//   if (!user) {
//     navigate('/login');
//     return null;
//   }

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

//       <div className="space-y-4">
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Name</h3>
//           <p className="text-gray-600">{user.name}</p>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Email</h3>
//           <p className="text-gray-600">{user.email}</p>
//         </div>
//       </div>

//       <button 
//         onClick={handleLogout} 
//         className="w-full mt-6 btn-primary"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Profile;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuthStore from '../store/authStore';

// const Profile = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuthStore();
//   console.log(user);

//   // Redirect to login if not authenticated
//   if (!user) {
//     navigate('/login');
//     return null;
//   }

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

//       <div className="space-y-4">
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Name</h3>
//           <p className="text-gray-600">{user.name}</p>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Email</h3>
//           <p className="text-gray-600">{user.email}</p>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Phone Number</h3>
//           <p className="text-gray-600">{user.phoneNumber}</p>
//         </div>
//       </div>

//       <button 
//         onClick={handleLogout} 
//         className="w-full mt-6 btn-primary"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Profile;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Name</h3>
          <p className="text-gray-600">{user.name}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Email</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        {/* <div>
          <h3 className="text-lg font-medium text-gray-700">Phone Number</h3>
          <p className="text-gray-600">{user.phoneNumber || 'Not provided'}</p>
        </div> */}
      </div>

      <button onClick={handleLogout} className="w-full mt-6 btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Profile;
