import {useForm} from 'react-hook-form'
import { useProducts } from '../context/ProductsContext'
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from 'react';

function ProductFormPage(){
    const {register, handleSubmit, setValue} = useForm();
    const {createProduct, getProduct, updateProduct} = useProducts();
    const navigate = useNavigate();
    // console.log(createProduct)
    const params = useParams();

    useEffect( () => {
        async function loadProduct(){
        if(params._id){
          const product = await getProduct(params._id);
          console.log(product)
          setValue('title', product.title)
          setValue('description', product.description)
          setValue('price', product.price)
        }
      }
    loadProduct()  
    }, []

    )

    const onSubmit = handleSubmit((data)=>{
        if(params._id){
          updateProduct(params._id, data)
        }else{
          createProduct(data);
        
        }
        navigate('/products');
    })

    return (
      <div className=' flex h-[calc(100vh-100px)] items-center justify-center '>
          <div className='bg-zinc-800 max-w-md p-10 rounded-md bg-opacity-85 block'>
            <form onSubmit={onSubmit}>
                <input 
                className='w-full bg-zinc-400 text-white px-3 py-1 rounded-md my-3 placeholder-gray-200 '
                type="text" 
                placeholder="Title"
                { ...register("title")}
                autoFocus
                />
                <textarea rows="3" 
                className='w-full bg-zinc-400 text-white px-3 py-1 rounded-md my-3 placeholder-gray-200 '
                placeholder="Description"
                { ...register("description")}>
                </textarea>
                <input 
                className='w-full bg-zinc-400 text-white px-3 py-1 rounded-md my-3 placeholder-gray-200 '
                type="text" 
                placeholder="Price"
                { ...register("price")}
                autoFocus
                />
                <button className="bg-purple-300 hover:bg-purple-500 text-white font-bold py-1 px-3 rounded my-4"> Guardar </button>
            </form>
        </div>
      </div>
    )
}

export default ProductFormPage