import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api', /* */
    withCredentials:true /*Establece las cookies en ese localhost */
})

export default instance