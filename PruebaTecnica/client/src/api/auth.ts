
import axios from './axios'; /*biblioteca que usa fetch para hacer peticiones hacia el backend*/
import { FieldValues } from 'react-hook-form';

// const API = 'http://localhost:4000/api'

export const registerRequest = (user: FieldValues) => axios.post('/register', user);
export const loginRequest = (user: FieldValues) => axios.post('/login', user); 
export const verifyTokenRequest = () => axios.get('/verify');
