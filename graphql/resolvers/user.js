const Event = require('../../models/event');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userResolvers = {
  Query: {
    login: async (_, {email, password}) => {
      try{
        const user = await User.findOne({email});
        if(!user){
          throw new Error('User does not Exist!');
        }
        const isEqual = await bcrypt.compare(password,user._doc.password);
        if(!isEqual){
          throw new Error('Password is incorrect!');
        }
        const token = jwt.sign({userId:user.id, email:user.email},'secretkey',{
          expiresIn: '1h'
        });
        return {
          userId: user.id,
          token,
          tokenExpiration: 1
        }
      }catch(err){
        console.log(err);
        throw err;
      }
    }
  },
  User: {
    _id(_, args) {
      return _._id;
    },
    email(_, args) {
      return _.email;
    },
    async createdEvents(_, args) {
      try {
        const events = await Event.find({ _id: { $in: _.createdEvents } })
        return events.map(event => ({ ...event._doc, _id: event.id }));
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        // Check email
        const exUser = await User.findOne({ email: args.userInput.email });
        if (exUser) {
          throw new Error('User exists already.');
        }
        // Create hashed password
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        })
        // Save user
        const result = await user.save();
        // Return created user
        return { ...result._doc, password: null };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }
}
module.exports = userResolvers; 