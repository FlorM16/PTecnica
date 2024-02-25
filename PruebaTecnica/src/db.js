import Sequelize from 'sequelize'

export const sequelize = new Sequelize('pruebaTecnicaDB', 'postgres', 'toor', {
    host: 'localhost',
    dialect: 'postgres'

})

// export const connectDB = async() => {
//    try{await Sequelize.connect('postgresql://localhost/pruebaTecnicaDB');
//    }catch(error){
//     console.log(error)
//    }
// }