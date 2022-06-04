const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');

class Comment extends Model {

}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: "id",
        },
    },
  },
  {
 
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;
