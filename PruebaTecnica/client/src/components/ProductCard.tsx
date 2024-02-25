import { useProducts } from "../context/ProductsContext"
import {Link} from 'react-router-dom'

function ProductCard({product}){
    
    const {deleteProduct} = useProducts();
    
    return (
    <div className="bg-zinc-800 bg-opacity-85 max-w-md w-full p-10 rounded-md lex flex-col justify-between">       
        <h1 className="text-2-l font-bold" >Title: {product.title} </h1>
        <p className="text-white" >Description: {product.description}</p>
        <p className="text-white" >Price: {product.price} </p>
        <button onClick={() => {
                deleteProduct(product._id)
            }} className="bg-purple-300 hover:bg-purple-500 text-white font-bold py-1 px-3 rounded my-2 mx-4"> Delete </button>
            <Link to={`/products/${product._id}`} className="bg-purple-300 hover:bg-purple-500 text-white font-bold py-1 px-3 rounded my-2 mx-4"> Edit</Link>
    </div>
    
    )
    
}

export default ProductCard