'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // User Table
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      profile_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Service Table
    await queryInterface.createTable('Services', {
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      service_code: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      service_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      service_icon: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      service_tariff: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Transaction Table
    await queryInterface.createTable('Transactions', {
      invoice_number: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
      service_code: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      service_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      total_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      user_user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      service_service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Services',
          key: 'service_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Banner Table
    await queryInterface.createTable('Banners', {
      banner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      banner_image: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Banners');
    await queryInterface.dropTable('Transactions');
    await queryInterface.dropTable('Services');
    await queryInterface.dropTable('Users');
  },
};
