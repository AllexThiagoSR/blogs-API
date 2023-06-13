const Sequelize = require('sequelize');
const config = require('../config/config');
const { Category, BlogPost, PostCategory, User } = require('../models');
const formatServiceReturn = require('../utils/formatServiceReturn');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const { Op } = Sequelize;

const createPostCategories = async (categoryIds, postId) => {
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  return categories.map(({ id }) => ({ postId, categoryId: id }));
};

const insertPostWithTransaction = async (userId, { title, content, categoryIds }, transaction) => {
  const post = await BlogPost.create({ title, userId, content }, { transaction });
  const postCategories = await createPostCategories(categoryIds, post.id);
  if (postCategories.length !== categoryIds.length) { 
    return formatServiceReturn(400, 'one or more "categoryIds" not found');
  }
  await PostCategory.bulkCreate(postCategories, { transaction });
  return formatServiceReturn(201, post);
};

const create = async (userId, postInfos) => {
  try {
    const result = await sequelize.transaction(
      async (transaction) => insertPostWithTransaction(userId, postInfos, transaction),
    );
    return result;
  } catch (error) {
    return formatServiceReturn(500, 'Internal server error');
  }
};

const getPost = async (id) => BlogPost.findByPk(id, {
  include: [
    { 
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { model: PostCategory, attributes: [] },
    },
  ],

});

const getById = async (id) => {
  try {
    const post = await getPost(id);
    if (!post) return formatServiceReturn(404, 'Post does not exist');
    return formatServiceReturn(200, post);
  } catch (error) {
    console.log(error);
    return formatServiceReturn(500, 'Internal server error');
  }
};

module.exports = { create, getById };
