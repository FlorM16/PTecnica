import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import ProductsPage from './pages/ProductsPage'
import HomePage from './pages/HomePage'
import ProductFormPage from './pages/ProductFormPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'
import { ProductProvider } from './context/ProductsContext'
import Navbar from './components/Navbar';

function App() {
  return (
   <AuthProvider>
     <ProductProvider>
        <BrowserRouter>
        <main className='container mx-auto px-10' >  
        <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={  <LoginPage/>  } />
            <Route path='/register' element={ <RegisterPage/>  } />      
            <Route element={<ProtectedRoute/>} >      
              <Route path='/products' element={<ProductsPage/>} />
              <Route path='/add-product' element={<ProductFormPage/>} />
              <Route path='/products/:_id' element={<ProductFormPage/>} />
              <Route path='/profile' element={<ProfilePage/>} />   
            </Route>     
          </Routes> 
        </main>
        </BrowserRouter>
     </ProductProvider>
   </AuthProvider>
  )
}

export default App