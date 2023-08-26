// const jwt = require("jsonwebtoken");

// const verifyJWT = (req, res, next) => {
//   try {
//     const authHeader =
//       req?.headers?.authorization || req?.headers?.Authorization;

//     if (!authHeader?.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err || decoded?.userEmail !== req?.body?.email) {
//         return res.status(403).json({ message: "Forbidden" });
//       }

//       next();
//     });
//   } catch (error) {
//     // Handle other errors here if needed
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = verifyJWT;
