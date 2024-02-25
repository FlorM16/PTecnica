import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'



function RegisterPage() {

    const {register, handleSubmit} = useForm();
    const {signup, user, isAuthenticated} = useAuth();
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(isAuthenticated) navigate ("/products") /*Si el usuario esta autenticado se enlaza a la ruta de products */
    }, [isAuthenticated])

    const onSubmit = handleSubmit ( async (values) => {
        // console.log(values)
        signup(values)
        
    })

    useEffect(() => {
        if(isAuthenticated) navigate('/products');

    }, [isAuthenticated]

    )

    return (
        
        <div className='flex h-[calc(100vh-100px)] items-center justify-center '>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md bg-opacity-85 block'>
            <form onSubmit= {onSubmit}>
            <h1 className='text-4xl font-bold text-center text-purple-300 py-2'>Register </h1>  
                <input type="text"
                    {...register('username', {required: true})}
                    className='w-full bg-zinc-400 text-white px-4 py-2 rounded-md my-4 placeholder-gray-200 '
                    placeholder='Ingrese su username'
                />
                <input type="email"  
                    {...register('email', {required: true})}
                    className='w-full bg-zinc-400 text-white px-4 py-2 rounded-md my-4 placeholder-gray-200 '
                    placeholder='Ingrese su email'
                />
                <input type="password" 
                    {...register('password', {required: true})}
                    className='w-full bg-zinc-400 text-white px-4 py-2 rounded-md my-4 placeholder-gray-200 '
                    placeholder='Ingrese su password'
                />
                <button type='submit' className="bg-purple-300 hover:bg-purple-500 text-white font-bold py-1 px-3 rounded my-4" > Register </button>
            </form>
            <p className='flex gap-x-2 justify-between'>Si ya tienes una cuenta. <Link to = '/login' className='hover:text-purple-300' > Inicia sesión aquí</Link>
            </p>
        </div>
        </div>
    )
}

export default RegisterPage