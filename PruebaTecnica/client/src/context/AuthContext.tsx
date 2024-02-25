import {createContext, useState, useContext, useEffect} from 'react'
import {registerRequest, loginRequest, verifyTokenRequest} from '../api/auth'
import Cookies from 'js-cookie'
import { FieldValues} from 'react-hook-form';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
  };

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const signup =  async (user: FieldValues) => {
        try{
            const res = await registerRequest(user) /*registro de usuario */
            console.log(res.data)
            setUser(res.data); /*Se establece el usuario */
            setIsAuthenticated(true);
        }catch(error){
            console.log(error)
        }
    }

    const signin = async (user: FieldValues) => {
        try{
            const res = await loginRequest(user)
            // console.log(res)

            setUser(res.data)
            setIsAuthenticated(true);
        }catch(error){
            console.log(error)
        }
    }

    const logout = () => {
      Cookies.remove('token');
      setIsAuthenticated(false);
      setUser(null);

    }

    /*Cuando actualizamos la aplicacion, haremos una consulta al backend para que no nos bote de la sesion iniciada */
    useEffect(() => {
       
        const checkLogin = async () => {
          const cookies = Cookies.get();
          if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
    
          try {
            const res = await verifyTokenRequest(cookies.token);
            console.log(res);
            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            setIsAuthenticated(false);
            setLoading(false);
          }
        };
        checkLogin();
      }, []);

      


      return (
        <AuthContext.Provider
          value={{
            user,
            signup,
            signin,
            logout,
            isAuthenticated,
           
            loading,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}