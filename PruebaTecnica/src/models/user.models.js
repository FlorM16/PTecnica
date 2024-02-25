/*Como lucen los datos que estamos guardando */
import {DataTypes} from 'sequelize'
import {sequelize} from '../db.js'
import {product} from '../models/product.models.js'

export const user = sequelize.define('users',{
    _id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        
    },
    email:{
        type:DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        
    },
    
},{
    timestamps: true
}
);

user.hasMany(product, {
    foreignKey: 'userId',
    sourceKey: '_id',
  });

  product.belongsTo(user, { 
    foreignKey: 'userId', 
    targetId: '_id',
});