const graphql = require('graphql');
const Stuffy = require('../models/stuffy');
const Submission = require('../models/submission');
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

const SubmissionType = new GraphQLObjectType({
  name: 'Submission',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString},
    stuffyName: { type: GraphQLString },
    didFall: { type: GraphQLBoolean }
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
    priorSubmissions: {
      type: new GraphQLList(SubmissionType),
      args:{
        date: { type: GraphQLString},
      },
      resolve(parent, args) {
        return Submission.find({ date: args.date })
      }
    }
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
    },
    logStuffyFall: {
      type: SubmissionType,
      args: {
        date: {type: new GraphQLNonNull(GraphQLString) },
        stuffyName: { type: new GraphQLNonNull(GraphQLString) },
        didFall: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        let stuffyFall = new Submission({
          date: args.date,
          stuffyName: args.stuffyName,
          didFall: args.didFall
        })
        return stuffyFall.save();
      }
    },
    updateStuffyFall: {
      type: SubmissionType,
      args: {
        date: {type: new GraphQLNonNull(GraphQLString) },
        stuffyName: { type: new GraphQLNonNull(GraphQLString) },
        didFall: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        return Submission.findOneAndUpdate(
          {
            date: args.date,
            stuffyName: args.stuffyName
          },
          {didFall: args.didFall}
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});