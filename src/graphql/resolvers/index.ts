import { GraphQLUpload } from 'graphql-upload-ts';
import { questionMutations, questionQueries } from './questions';
import { tableMutation, tableQueries } from './table';
import { booksMutations, booksQueries } from './books';
import { TempalteMasterMutations, TemplateMasterQueries } from './templateMaster';
import { RoleQueries, RoleMutations } from './role';
import { FormQueries, FormMutations } from './form';
import { CabinetMasterQueries, CabinetMasterMutations } from './cabinetMaster';
import { FolderMasterMutations, FolderMasterQueries } from './folderMaster';
import { SubfolderMappingMutations, SubfolderMappingQueries } from './subfolderMapping';
import { UserMutations, UserQueries } from './users';

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...questionQueries,
    ...tableQueries,
    ...booksQueries,
    ...TemplateMasterQueries,
    ...FormQueries,
    ...RoleQueries,
    ...CabinetMasterQueries,
    ...FolderMasterQueries,
    ...SubfolderMappingQueries,
    ...UserQueries
  },
  Mutation: {
    ...questionMutations,
    ...tableMutation,
    ...booksMutations,
    ...TempalteMasterMutations,
    ...FormMutations,
    ...RoleMutations,
    ...CabinetMasterMutations,
    ...FolderMasterMutations,
    ...SubfolderMappingMutations,
    ...UserMutations
  },
};

export default resolvers;
