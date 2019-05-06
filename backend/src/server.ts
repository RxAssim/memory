import 'reflect-metadata';
require('dotenv').config();
import { GraphQLServer } from 'graphql-yoga';
import * as jwt from 'jsonwebtoken';
import { createConnection, Repository } from 'typeorm';
import { User } from './entity/User';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema(__dirname + '/schema.graphql');

const resolvers = {
  Query: {
    leaderboard: async (_, {}, { repos, models }) => {
      const UserRepo = repos.UserRepo as Repository<User>;
      return await UserRepo.createQueryBuilder('user')
        .select('*')
        .orderBy('user.score', 'DESC')
        .limit(5)
        .execute();
    }
  },
  Mutation: {
    createUser: async (_, { name }, { repos, models }) => {
      let User = new models.User() as User;
      User.name = name;
      await repos.UserRepo.save(User);

      const token = jwt.sign(
        {
          data: { id: User.id }
        },
        'SECRET', // CHANGE LATER
        { expiresIn: '1h' }
      );

      return {
        user: User,
        token
      };
    },
    saveScore: async (_, { score }, { repos, models, currentUserId }) => {
      if (!currentUserId) throw new Error('Must be authenticated');
      const currentUser = await repos.UserRepo.findOne({ id: currentUserId });
      if (!currentUser) throw new Error('Must be authenticated');
      currentUser.score = score;
      await repos.UserRepo.save(currentUser);
      return currentUser;
    }
  }
};

const start = async () => {
  const conn = await createConnection();

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: async ({ request }) => {
      const token = request.headers.authorization;
      let currentUserId;
      if (token) {
        const [_, tokenString] = token.split(' ');
        const decoded = jwt.decode(tokenString);
        if (typeof decoded === 'object' && decoded !== null) {
          currentUserId = decoded.data.id;
        }
      }
      const UserRepo = conn.getRepository(User);
      return { repos: { UserRepo }, models: { User }, currentUserId };
    }
  });
  server.start(() => console.log('Server is running on localhost:4000'));
};

start().catch(err => console.log("Error happened and Server didn't start ==> ", err));
