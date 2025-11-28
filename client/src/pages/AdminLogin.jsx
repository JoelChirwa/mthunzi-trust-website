import React, { useState } from 'react'
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { setAdminAuthenticated } from '../utils/auth.js'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/admin/login',
        { email, password }
      );
      if (response.data.success) {
        login(response.data.admin);
        try { setAdminAuthenticated(true) } catch (e) {}
        localStorage.setItem('token', response.data.token);
        navigate('/admin');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-linear-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className='font-sevillana text-3xl text-white'>
        Mthunzi Trust Admin Panel
      </h2>
      <div className='border shadow p-6 w-80 bg-white'>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700'>Email</label>
            <input
              type="email"
              className='w-full px-3 py-2 border rounded'
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700'>Password</label>
            <input
              type="password"
              className='w-full px-3 py-2 border rounded'
              placeholder='**********'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mb-4 flex items-center justify-between'>
            <label htmlFor="remember" className='inline-flex items-center'>
              <input type="checkbox" className='form-checkbox' />
              <span className='ml-2 text-gray-700'>Remember me</span>
            </label>
          </div>

          <div>
            <button className='w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition duration-300'>
              Login
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login
