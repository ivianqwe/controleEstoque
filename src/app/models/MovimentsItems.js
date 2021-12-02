const { Model, DataTypes } = require('sequelize');


class MovimentsItems extends Model {
    static init(sequelize){
        super.init({
            quantity: DataTypes.FLOAT,
            price: DataTypes.FLOAT
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Moviments, {foreignKey: 'moviment_id', as: 'movimentMovimentItem'})
        this.belongsTo(models.Product, {foreignKey: 'product_id', as: 'movimentsItemsProduct'})
    }
}

module.exports = MovimentsItems;