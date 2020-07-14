const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
module.exports = req => {
  // get Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return {isAuth: false, userId: ''};
  }
  // get token from header
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    return {isAuth: false, userId: ''};
  }
  // get decoded token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return {isAuth: false, userId: ''};
  }
  if (!decodedToken) { 
    return {isAuth: false, userId: ''};
  }
  // return isAuth and userId
  return {isAuth: true, userId: decodedToken.userId};
}