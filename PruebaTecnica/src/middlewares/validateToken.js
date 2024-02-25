import {TOKEN_SECRET} from '../config.js';
import jwt from 'jsonwebtoken';


export const authRequired = (req, res, next) => {

    const {token} = req.cookies;
    // console.log(token)
    // // return res.json({
    //     message: 'ok'
    // })
    // const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({message: "No token. Autorización denegada"});
    
    /*Verifica si es un token que existe */
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) {return res.status(403).json({message: "Token inválido"});}
    console.log('prueba')
    req.user = user
    console.log(req.user )

    next();
    })
  
}