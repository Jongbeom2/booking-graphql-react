const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
module.exports = async (resolve, root, args, context, info) => {
  // get Authorization header
  const authHeader = context.request.get('Authorization');
  if (!authHeader) {
    context.isAuth = false;
    return await resolve(root, args, context, info);
  }
  // get token from header
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    context.isAuth = false;
    return await resolve(root, args, context, info);
  }
  // get decoded token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    context.isAuth = false;
    return await resolve(root, args, context, info);
  }
  if (!decodedToken) {
    context.isAuth = false;
    return await resolve(root, args, context, info);
  }
  // set isAuth and userId
  context.isAuth = true;
  context.userId = decodedToken.userId;
  return await resolve(root, args, context, info);
}