'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'posts_categories',
      {
        postId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          field: 'post_id',
          referenses: {
            model: 'blog_posts',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        categoryId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          field: 'category_id',
          references: {
            model: 'categories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
