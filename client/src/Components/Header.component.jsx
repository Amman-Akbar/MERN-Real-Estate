import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const { currentUser } = useSelector(state => state.user)
  return (
    <header className='bg-lime-200 items-center'>
      <div className="flex items-center p-3 mx-auto justify-between">
        <Link to="/">
          <h1 className='font-bold text-lg lg:text-3xl'>
            <span className='text-slate-400'>Real</span>
            <span className='text-slate-800'>Estate</span>
          </h1>
        </Link>
        <form>
          <input type="text" placeholder='Search ...' className='rounded-xl p-3' />
        </form>
        <ul className='flex items-center gap-4 pr-5'>
          <Link to="/">
            <li className='hidden sm:inline text-slate-600 hover:underline'>Home</li>
          </Link>
          <Link to="about">
            <li className='hidden sm:inline text-slate-600 hover:underline'>About</li>
          </Link>
          <Link to="profile">
            {currentUser ? (
                <img className='rounded-full h-12 w-12 object-cover' src={currentUser.Avatar} alt="Profile" />
            ): (
                <li className = 'text-slate-600 hover:underline'>Sign in</li>
            )}
        </Link>
      </ul>
    </div>
    </header >
  )
}

export default Header