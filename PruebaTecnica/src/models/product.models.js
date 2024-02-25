/*Como lucen los datos que estamos guardando */
import {DataTypes} from 'sequelize'
import {sequelize} from '../db.js'
import {user} from '../models/user.models.js'

export const product = sequelize.define('products',{
    _id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    title:{
        type:DataTypes.STRING,
        
    },
    description:{
        type:DataTypes.STRING,
    },
    price:{
        type:DataTypes.INTEGER,
    }
    // usuario: {
    //     require:true,
    //     type: DataTypes.INTEGER,
    //     ref: 'user'
    // },
     
},{
    timestamps: true
},

)

// user.hasMany(product, {
//     foreignKey: 'userId',
//     sourceKey: '_id',
//   })

//   product.belongsTo(user, { 
//     foreignKey: 'userId', 
//     targetId: '_id',
// })


