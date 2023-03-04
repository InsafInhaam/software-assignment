import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const Post = db.define(
  "posts",
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    postedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Post.associate = function () {
  Post.belongsTo(User, { foreignKey: "postedBy" });
};

(async () => {
  await db.sync();
  console.log("Post table created!");

  // Call the association function here
  Post.associate(db.models);
})();

export default Post;
