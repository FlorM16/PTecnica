import app from './app.js'
import { sequelize } from './db.js'
import './models/user.models.js'
import './models/product.models.js'


async function main(){
    try{
        await sequelize.sync()
        app.listen(4000)
        console.log('Conexión establecida correctamente',4000)
    }catch(error){
        console.log('Error de conexion', error)
    }   
}

main();