import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import graphqlServer from './graphql';

const app = express();
const httpServer = http.createServer(app);

graphqlServer.start().then(() => {
  app.use(
    '/graphql',
    cors(),
    bodyParser.json({
      limit: '100mb',
    }),
    graphqlUploadExpress(),
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => ({
        user: {
          name: req.headers['x-user-name'],
          userId: req.headers['x-user-id'],
          userType: req.headers['x-user-type'],
        },
      }),
    }),
  );

  app.get('/health', (req, res) => {
    res.status(200).send('Okay!');
  });
});

export default httpServer;
