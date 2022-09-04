import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast'

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post('/api/user/register', details);
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirected to the login page");
        navigate("/login");
        setLoading(false);
      } else {
        toast.error(response.data.message);
        setLoading(false)
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false)
    }
  }

  return (
    <div className='authentication flex flex-1 justify-center items-center'>
      <div className='authentication-form bg-white p-5 rounded-lg border w-[30rem]'>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <h1 className='font-medium text-xl text-center'>Register</h1>
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
            <input type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" onChange={handleChange}></input>
          </div>
          <div className='mb-6'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" onChange={handleChange}></input>
          </div>
          {
            loading === true ? <div>Registering account...</div> : <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          }

        </form>
        <div className="mt-6">
          <Link to="/login" className='text-blue-700 text-sm'>Click here to login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register