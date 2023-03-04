import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECERT_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const userdata = await User.findByPk(payload.id);
    if (!userdata) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = userdata;
    next();
  });
};

export const requireUserType = (userType) => {
  return async (req, res, next) => {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    if (user.userType !== userType) {
      return res
        .status(401)
        .json({ error: "You are not authorized to access this resource" });
    }

    next();
  };
};

// export const requireLoginUser = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     res.status(401).json({ error: "You must be logged in" });
//   }

//   const token = authorization.replace("Bearer ", "");
//   jwt.verify(token, process.env.JWT_SECERT_KEY, (err, payload) => {
//     if (err) {
//       return res.status(401).json({ error: "You must be logged in" });
//     }

//     User.findByPk(payload.id).then((userdata) => {
//       if (!userdata) {
//         return res.status(401).json({ error: "User not found" });
//       }

//       req.user = userdata;
//       next();
//     });
//   });
// };

// export const requireLoginAdmin = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     res.status(401).json({ error: "You must be logged in" });
//   }

//   const token = authorization.replace("Bearer ", "");
//   jwt.verify(token, process.env.JWT_SECERT_KEY, (err, payload) => {
//     if (err) {
//       return res.status(401).json({ error: "You must be logged in" });
//     }

//     User.findByPk(payload.id).then((userdata) => {
//       if (!userdata) {
//         return res.status(401).json({ error: "User not found" });
//       }

//       if (userdata.userType == !0) {
//         return res.status(401).json({ error: "Your not allowed" });
//       }
//       req.user = userdata;
//       next();
//     });
//   });
// };
