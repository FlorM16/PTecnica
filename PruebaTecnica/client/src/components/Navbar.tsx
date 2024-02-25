import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar(){

    const { isAuthenticated, logout, user } = useAuth();
    console.log(user)

    return (
        <nav className='bg-zinc-800 bg-opacity-85 my-4 flex justify-between py-5 px-12 rounded-lg text-purple-300' >
            <Link to = '/'>
            
            <h1 className='text-2xl font-bold hover:text-purple-300 text-white' >Products Manager</h1>
            </Link>
            <ul className='flex gap-x-2'>
               { isAuthenticated ? (
                 <>
                 <li className='ml-10 text-white'>
                 Welcome {user.username}
                 </li>
                 <li className='ml-10 text-white'>
                 <Link className='hover:text-purple-300' to='/add-product' > Add Product </Link>
                 </li>
                 <li className='ml-10 text-white'>
                 <Link className='hover:text-purple-300' to='/' onClick={() => {logout()}}> Logout </Link>
                 </li>
                 </>

               ) : (
                <>
                <li className='ml-15 text-white' >
                <Link className='hover:text-purple-300' to='/login' > Login Page </Link>
                </li>
                <li className='ml-10 text-white'>
                <Link className='hover:text-purple-300' to='/register' > Register Page </Link>
                </li>
                </>

               )}
            </ul>
        </nav>
    )
}

export default Navbar