'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('moviments_items', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      moviment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'moviments', key: 'id'},
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'products', key: 'id'},
      },
      quantity:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    await queryInterface.dropTable('moviments_items'); 
  }
};
