const { Model, DataTypes } = require('sequelize');

class Stock extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            active: DataTypes.BOOLEAN
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsToMany(models.Product, {foreignKey: 'stock_id', through: 'allocations', as: 'stockProduct'})
    }
}

module.exports = Stock;