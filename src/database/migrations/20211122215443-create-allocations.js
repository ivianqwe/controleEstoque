'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('allocations', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'stocks', key: 'id'}
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'products', key: 'id'},
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('allocations');
  }
};
