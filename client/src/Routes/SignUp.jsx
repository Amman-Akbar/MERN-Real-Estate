import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'


const SignUp = () => {
  const [formData, setformData] = useState({});
  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState(null)
  const navigate=useNavigate();
  const handleChange = e => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null)
      navigate("/sign-in")
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }
  return (
    <div className=' p-5 max-w-xl mx-auto'>
      <h2 className='text-4xl font-semibold text-center my-7'>Sign Up</h2>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <input id='Username' type="text" placeholder='Username' className='p-3 border rounded-lg' onChange={handleChange} />
        <input id="Email" type="email" placeholder='Email' className='p-3 border rounded-lg' onChange={handleChange} />
        <input id="Password" type="password" placeholder='Password' className='p-3 border rounded-lg' onChange={handleChange} />
        <button disabled={Loading} className='bg-slate-700 uppercase text-white m-5 py-4 text-xl rounded-full hover:opacity-95'>{Loading ? 'Loading ...' : 'Sign Up'}</button>
      </form>
      <div className='flex'>
        <p>Have an Account ? </p>
        <Link to="/sign-in">
          <span className='text-blue-700 hover:text-blue-500'>Sign In</span>
        </Link>
      </div>
      {Error && <p className='text-red-500'>{Error}</p>}
    </div>
  )
}

export default SignUp