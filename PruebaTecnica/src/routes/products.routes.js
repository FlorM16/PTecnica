import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js' /*Solo para usuarios autenticados */
import { getProduct, createProduct, getProducts, updateProduct, deleteProduct} from '../controllers/products.controller.js'


const router = Router()

router.get('/products', authRequired, getProducts );
router.post('/products', authRequired, createProduct );
router.put('/products/:_id', authRequired, updateProduct );
router.delete('/products/:_id', authRequired, deleteProduct );
router.get('/products/:_id', authRequired, getProduct );


export default router 