'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('moviments', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nf: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      user_id: {
        type: Sequelize. INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'},
      },
      client_id: {
        type: Sequelize. INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'},
      },
      payment_type: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('moviments'); 
  }
};
