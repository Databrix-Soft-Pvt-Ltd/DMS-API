import { GraphQLUpload } from 'graphql-upload-ts';

import { questionMutations, questionQueries } from './questions';
import { tableMutations, tableQueries } from './table';
import { tempalteMasterMutations, templateMasterQueries } from './templateMaster';
import { roleQueries, roleMutations } from './role';
import { formQueries, formMutations } from './form';
import { cabinetMasterQueries, cabinetMasterMutations } from './cabinetMaster';
import { folderMasterQueries, folderMasterMutations } from './folderMaster';
import { subFolderMappingQueries, subFolderMappingMutations } from './subFolderMapping';
import { userQueries, userMutations } from './users';
import { subFolderMasterQueries, subFolderMasterMutations } from './subFolderMaster';
import { fileMutations, fileQueries } from './fileMaster';

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...questionQueries,
    ...tableQueries,
    ...templateMasterQueries,
    ...formQueries,
    ...roleQueries,
    ...cabinetMasterQueries,
    ...folderMasterQueries,
    ...subFolderMasterQueries,
    ...subFolderMappingQueries,
    ...fileQueries,
    ...userQueries
  },
  Mutation: {
    ...questionMutations,
    ...tableMutations,
    ...tempalteMasterMutations,
    ...formMutations,
    ...roleMutations,
    ...cabinetMasterMutations,
    ...folderMasterMutations,
    ...subFolderMasterMutations,
    ...subFolderMappingMutations,
    ...fileMutations,
    ...userMutations
  },
};

export default resolvers;
