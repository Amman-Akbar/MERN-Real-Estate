import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='p-5 max-w-xl mx-auto'>
      <h1 className='text-4xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <img className='rounded-full h-32 w-32 object-cover self-center' src={currentUser.Avatar} alt="profile" />
        <input className='p-3 border rounded-lg' type="text" name="Username" id="Username" placeholder='Username'/>
        <input className='p-3 border rounded-lg' type="email" name="Email" id="Email" placeholder='Email' />
        <input className='p-3 border rounded-lg' type="password" name="Password" id="Password" placeholder='Password' />
        <button className='bg-slate-700 uppercase text-white m-5 py-4 text-xl rounded-full hover:opacity-80'>UPDATE</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile