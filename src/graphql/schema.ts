import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

import resolvers from './resolvers';

const gqlFiles = readdirSync(join(__dirname, './typedefs'));

const typeDefsString = `${gqlFiles
  .map((file) =>
    readFileSync(join(__dirname, './typedefs', file), {
      encoding: 'utf8',
    }),
  )
  .join('')}`;

const typeDefs = gql`
  ${typeDefsString}
`;

const schema = buildSubgraphSchema({
  typeDefs,
  resolvers,
});

export default schema;
