const Sequelize = require('sequelize');
const config = require('../config/config');
const { Category, BlogPost, PostCategory } = require('../models');
const formatServiceReturn = require('../utils/formatServiceReturn');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const create = async (userId, { title, content, categoryIds }) => {
  const result = await sequelize.transaction(async (transaction) => {
    const post = await BlogPost.create({ title, userId, content }, { transaction });

    const postCategories = await Promise.all(categoryIds.map(async (id) => {
      const category = await Category.findByPk(id);
      if (!category) return undefined;
      return { postId: post.id, categoryId: category.id };
    }));

    if (postCategories.includes(undefined)) { 
      return formatServiceReturn(400, 'one or more "categoryIds" not found');
    }
    
    await PostCategory.bulkCreate(postCategories, { transaction });
    return formatServiceReturn(201, post);
  });
  return result;
};

module.exports = { create };
