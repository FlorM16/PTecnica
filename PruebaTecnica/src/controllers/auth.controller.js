import { user } from '../models/user.models.js';
import bcrypt from 'bcryptjs'; /*Encriptar contraseñas */
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'



export const register = async (req, res) => {
    const {username, email, password} = req.body
    try{
        /*Se encripta la contraseña */
        const passwordHash = await bcrypt.hash(password, 10) 

        /*Se crea un usuario */
        const newUser = new user({ 
            username, 
            email, 
            password: passwordHash,
        })

        /*Se guarda un usuario */
        const userSaved = await newUser.save();

        /*Se crea el token */
        const token = await createAccessToken ({_id: userSaved._id})
       
            res.cookie('token', token) /*el token se guarda en el valor de la cookie */
            // res.json({
            //     message: "Usuario creado satisfactoriamente",
            // })
            res.json({
                _id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
            
            })
    }catch(e){
        res.status(500).json({message: e.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try{

        const userFound = await user.findOne({where: {email}})/*usuario buscado por el email */
        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

        const isMatch = await bcrypt.compare(password, userFound.password) /*Compara la contraseña del input y la de la bd */

        if (!isMatch) return res.status(400).json({message: "Contraseña incorrecta"})

        /*Se crea el token */
        const token = await createAccessToken ({_id: userFound._id}) 
       
            res.cookie('token', token); /*el token se guarda en el valor de la cookie */
            // res.json({
            //     message: "Usuario creado satisfactoriamente",
            // })
            res.json({
                _id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            })
    }catch(e){
        res.status(500).json({message: e.message})
    }
}
   
export const logout = (req, res) => {
    /*Quitamos el valor de la cookie (token)*/
    res.cookie('token', "", {
        expires: new Date (0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await user.findByPk(req.user._id)
    
    if(!userFound) {
        return res.status(400).json({message: "Usuario no encontrado"});
    }
    return res.json({
        _id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, _user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await user.findByPk(_user._id);
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        _id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };
