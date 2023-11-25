import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/slice/user.slice';


const SignIn = () => {
  const [formData, setformData] = useState({});
  const { loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = e => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(loginStart())
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/")
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  }
  return (
    <div className=' p-5 max-w-xl mx-auto'>
      <h2 className='text-4xl font-semibold text-center my-7'>Sign In</h2>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <input id="Email" type="email" placeholder='Email' className='p-3 border rounded-lg' onChange={handleChange} />
        <input id="Password" type="password" placeholder='Password' className='p-3 border rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 uppercase text-white m-5 py-4 text-xl rounded-full hover:opacity-95'>{loading ? 'Loading ...' : 'Sign In'}</button>
      </form>
      <div className='flex'>
        <p>Don't have an account ?</p>
        <Link to="/sign-up">
          <span className='text-blue-700 hover:text-blue-500 pl-1'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      
    </div>
  )
}

export default SignIn