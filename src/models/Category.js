module.exports = (sequelize, DataTypes) => {
  const Category  = sequelize.define(
    'Category',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      uderscored: true,
      tableName: 'categories',
      timestamps: false,
    },
  );
  return Category;
};
