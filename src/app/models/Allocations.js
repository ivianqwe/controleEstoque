const { Model, DataTypes } = require('sequelize');

class Allocation extends Model {
    static init(sequelize){
        super.init({
            stock_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            quantity: DataTypes.FLOAT,
        }, {
            sequelize
        })
    }
}

module.exports = Allocation;