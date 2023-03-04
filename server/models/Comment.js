import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Post from "./Post.js";

const { DataTypes } = Sequelize;

const Comment = db.define(
  "comments",
  {
    comment: {
      type: DataTypes.STRING,
    },
    postedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Post",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Comment.associate = function () {
  Comment.belongsTo(Post, { foreignKey: "postedBy" });
};

(async () => {
  await db.sync();
  console.log("Comment table created!");

  // Call the association function here
  Comment.associate(db.models);
})();

export default Comment;
