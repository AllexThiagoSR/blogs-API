const Sequelize = require('sequelize');
const config = require('../config/config');
const { Category, BlogPost, PostCategory, User } = require('../models');
const formatServiceReturn = require('../utils/formatServiceReturn');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const { Op } = Sequelize;

const INTERNAL_ERROR = formatServiceReturn(500, 'Internal server error');

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
    return INTERNAL_ERROR;
  }
};

const getPostById = async (id) => BlogPost.findByPk(id, {
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
    const post = await getPostById(id);
    if (!post) return formatServiceReturn(404, 'Post does not exist');
    return formatServiceReturn(200, post);
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const getPosts = async (q = '') => BlogPost.findAll(
  {
    where: {
      [Op.or]: [
        { title: { [Op.substring]: q } },
        { content: { [Op.substring]: q } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { model: PostCategory, attributes: [] } },
    ],
  },
);

const getAll = async (q) => {
  try {
    const posts = await getPosts(q);
    return formatServiceReturn(200, posts);
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const userIsAuthorized = (userId, post) => Number(userId) === post.userId;

const updatePost = async (id, { title, content }) => BlogPost.update(
  { title, content },
  { where: { id } },
);

const update = async (postId, userId, fields) => {
  try {
    const post = await BlogPost.findByPk(postId);
    if (!post) return formatServiceReturn(404, 'Post does not exist');
    if (!userIsAuthorized(userId, post)) return formatServiceReturn(401, 'Unauthorized user');
    await updatePost(postId, fields);
    const updatedPost = await getPostById(postId);
    return formatServiceReturn(200, updatedPost);
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const deletePost = async (id, userId) => {
  try {
    const post = await getPostById(id);
    if (!post) return formatServiceReturn(404, 'Post does not exist');
    if (!userIsAuthorized(userId, post)) return formatServiceReturn(401, 'Unauthorized user');
    await BlogPost.destroy({ where: { id } });
    return formatServiceReturn(204);
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

module.exports = { create, getById, getAll, update, deletePost };
