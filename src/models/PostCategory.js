module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        primaryKey: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'posts_categories',
    },
  );

  PostCategory.associate = ({ Category, BlogPost }) => {
    Category.belongsToMany(
      BlogPost,
      {
        foreignKey: 'categoryId',
        otherKey: 'postId',
        through: PostCategory,
        as: 'posts',
      }
    );
    BlogPost.belongsToMany(
      Category,
      {
        foreignKey: 'postId',
        otherKey: 'categoryId',
        through: PostCategory,
        as: 'categories',
      },
    );
  };
  return PostCategory;
};
