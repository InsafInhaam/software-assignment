import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Post from "./Post.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    userType: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);

// Define the association between User and Post models
User.associate = function () {
  User.hasMany(Post, { foreignKey: "postedBy" });
};

(async () => {
  await db.sync();
  console.log("User table created!");

  // Call the association function here
  User.associate(db.models);
})();

export default User;
