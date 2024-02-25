import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

function LoginPage() {
    
    const {register, handleSubmit} = useForm();
    const {signin, isAuthenticated} = useAuth();
    const navigate = useNavigate()
    const onSubmit = handleSubmit ((data) => {
        signin(data)
    }
    );

    useEffect(() => {
        if(isAuthenticated) navigate('/products');

    }, [isAuthenticated]

    )

    return (
       <div className=' flex h-[calc(100vh-100px)] items-center justify-center '>     
            <div className='bg-zinc-800 bg-opacity-85 max-w-md p-10 rounded-md  block' >    
            <form onSubmit= {onSubmit}>
              <h1 className='text-4xl font-bold text-center text-purple-300 py-2' >Login</h1>  
                <input type="email"  
                    {...register('email', {required: true})}
                    className='w-full bg-zinc-400 text-white px-4 py-2 rounded-md my-4 placeholder-gray-200 '
                    placeholder='Email'
                />
                <input type="password" 
                    {...register('password', {required: true})}
                    className='w-full bg-zinc-400 text-white px-4 py-2 rounded-md my-4 placeholder-gray-200'
                    placeholder='Password'
                />
                
                <button className="bg-purple-300 hover:bg-purple-500 text-white font-bold py-1 px-3 rounded my-4"> Login </button>
               
            </form>
            <p className='flex gap-x-2 justify-between'>Si no tienes una cuenta. <Link to = '/register' className='hover:text-purple-300' > Registrate aquí</Link>
            </p>
        </div>
        </div>
    )
}

export default LoginPage