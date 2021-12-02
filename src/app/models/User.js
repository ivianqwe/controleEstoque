const { Model, DataTypes } = require('sequelize');


class User extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true,
                }
            },
            birth_day: DataTypes.DATE,
            active: DataTypes.BOOLEAN
        }, {
            sequelize
        })
    }

    static associate(models){ 
        this.hasMany(models.Moviments, {foreignKey: 'user_id', as: 'movimentUser'})
        this.hasMany(models.Moviments, {foreignKey: 'client_id', as: 'movimentClient'})
    }
}

module.exports = User;