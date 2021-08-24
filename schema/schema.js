const graphql = require('graphql');
const Stuffy = require('../models/stuffy');
const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

const StuffyType = new GraphQLObjectType({
  name: 'Stuffy',
  fields: () => ({
    id: { type: GraphQLID },
    stuffyName: { type: GraphQLString },
    primaryColor: { type: GraphQLString },
    secondaryColor: { type: GraphQLString },
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {      
    stuffies: {
      type: new GraphQLList(StuffyType),
      resolve(parent, args) {
          return Stuffy.find({});
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStuffy: {
      type: StuffyType,
      args: {
        stuffyName: { type: new GraphQLNonNull(GraphQLString) },
        primaryColor: { type: new GraphQLNonNull(GraphQLString) },
        secondaryColor: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let stuffy = new Stuffy({
          stuffyName: args.stuffyName,
          primaryColor: args.primaryColor,
          secondaryColor: args.secondaryColor
        });
        return stuffy.save();
      }
    },        
    updateStuffy: {
      type: StuffyType,
      args: {
        id: { type: GraphQLID },
        stuffyName: { type: new GraphQLNonNull(GraphQLString) },
        primaryColor: { type: new GraphQLNonNull(GraphQLString) },
        secondaryColor: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Stuffy.findByIdAndUpdate( args.id, {
          stuffyName: args.stuffyName,
          primaryColor: args.primaryColor,
          secondaryColor: args.secondaryColor
        });
      } 
    },
    removeStuffy: {
      type: StuffyType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Stuffy.findByIdAndDelete(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});