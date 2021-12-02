const { Model, DataTypes } = require('sequelize');


class Moviments extends Model {
    static init(sequelize){
        super.init({
            type: DataTypes.STRING,
            nf: DataTypes.INTEGER,
            total: DataTypes.FLOAT,
            payment_type: DataTypes.STRING
        }, {
            sequelize
        })
    }
    
    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'userMoviments'}),
        this.belongsTo(models.User, {foreignKey: 'client_id', as: 'clientMoviments'})

        this.hasMany(models.MovimentsItems, {foreignKey: 'moviment_id', as: 'movimentItems'})
    }
}

module.exports = Moviments;