import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {};

export const Register = async (req, res) => {
  const user = new User(req.body);

  if (!req.body.name || !req.body.email || !req.body.password) {
    console.log("please add all the fields");
  }

  let existingEmail;

  try {
    existingEmail = await User.findOne({ where: { email: req.body.email } });
  } catch (error) {
    console.log(error);
  }

  //   console.log(existingEmail);
  if (existingEmail) {
    return res.status(422).json({ error: "This email already exists" });
  }

  // password hashing
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  user.password = hashedPassword;

  try {
    const newUser = await user.save();

    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    return res.status(422).json({ error: "User created unsuccessfully" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  let user;

  if (email) {
    user = await User.findOne({ where: { email: req.body.email } });
  }
  if (!user) {
    return res.status(404).send({ error: "Incorrect user or password" });
  }
  //   console.log(user)

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({ error: "Incorrect user or password" });
  }
  //   console.log(user.id)

  const token = jwt.sign(
    { id: user.id, name: user.name, email },
    process.env.JWT_SECERT_KEY
  );
  const { id, name, userType } = user;
  res.json({
    message: "successfully signed in",
    token,
    user: { id, name, email, userType },
  });
};
