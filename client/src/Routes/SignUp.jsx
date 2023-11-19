import {Link} from 'react-router-dom'


const SignUp = () => {
  return (
    <div className=' p-5 max-w-xl mx-auto'>
      <h2 className='text-4xl font-semibold text-center my-7'>Sign Up</h2>
      <form className='flex flex-col gap-5'>
        <input id='username' type="text" placeholder='Username' className='p-3 border rounded-lg' />
        <input id="email" type="email" placeholder='Email' className='p-3 border rounded-lg' />
        <input id="password" type="password" placeholder='Password' className='p-3 border rounded-lg' />
        <button className='bg-slate-700 uppercase text-white m-5 py-4 text-xl rounded-full hover:opacity-95'>Sign Up</button>
      </form>
      <div className='flex'>
        <p>Have an Account ? </p>
        <Link to="/sign-in">
        <span className='text-blue-700 hover:text-blue-500'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp