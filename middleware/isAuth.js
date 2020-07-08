const jwt = require('jsonwebtoken');
module.exports = async (resolve, root, args, context, info) => {
  const authHeader = context.request.get('Authorization');
  if (!authHeader) {
    context.isAuth = false;
    return await resolve(root, args, context, info);
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    context.isAuth = false;
    return await resolve(root, args, context, info);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretkey');
  } catch (err) {
    context.isAuth = false;
    return await resolve(root, args, context, info);
  }
  if (!decodedToken) {
    context.isAuth = false;
    return await resolve(root, args, context, info);
  }
  context.isAuth = true;
  context.userId = decodedToken.userId;
  return await resolve(root, args, context, info);
}