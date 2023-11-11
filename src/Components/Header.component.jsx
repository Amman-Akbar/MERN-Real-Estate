import { Link } from 'react-router-dom'

const Header = () => {
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
        <ul className='flex gap-4 pr-5'>
          <Link to="/">
            <li className='hidden sm:inline text-slate-600 hover:underline'>Home</li>
          </Link>
          <Link to="about">
            <li className='hidden sm:inline text-slate-600 hover:underline'>About</li>
          </Link>
          <Link to="login">
            <li className='text-slate-600 hover:underline'>Login</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header