const resolvers = {
  Query: {
    events: () => {
      return [`Romantic Cooking`, 'Sailing', 'All-Night Coding'];
    },
  },
  Mutation: {
    createEvent: (_, args) => {
      const eventName = args.name;
      return eventName;
    }
  }
}
module.exports = resolvers;