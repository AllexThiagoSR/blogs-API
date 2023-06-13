const formatServiceReturn = require('../utils/formatServiceReturn');
const { Category } = require('../models');

const INTERNAL_ERROR = formatServiceReturn(500, 'Internal server error');

const create = async (name) => {
  try {
    const category = await Category.create({ name });
    return formatServiceReturn(201, category);
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

const getAll = async () => {
  try {
    const categories = await Category.findAll();
    return formatServiceReturn(200, categories);
  } catch (error) {
    return INTERNAL_ERROR;
  }
};

module.exports = { create, getAll };
