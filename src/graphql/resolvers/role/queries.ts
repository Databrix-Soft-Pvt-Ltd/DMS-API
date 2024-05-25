import { dbConnection } from '../../../db';
import { AllRoles, AllRolesParam, GetAllRoles } from './types';

const roleQueries = {
  getAllRoles: async (_: undefined, record: AllRolesParam): Promise<GetAllRoles> => {
    const result: AllRoles[] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetRoles ?,?,?,?,?,?,?,?',
        [
          record.roleId || 0,
          record.isActive || false,
          record.page || 0,
          record.size || 0,
          record.searchColumns|| '',
          record.searchParam || '',
          record.orderAsc  || '',
          record.orderDesc  || '',
        ],
        (err, rows) => {
          if (err) {
            reject(err); // Handle error more specifically if possible
          } else {
            if (rows) {
              resolve(rows);
            } else {
              reject(new Error('No rows returned from the stored procedure.'));
            }
          }
        },
      );
    });
    console.log(result.length > 0 ? {allRoles: result, page:  {page : record?.page || null, size: record?.size || null, totalCount : result[0].totalCount || 0}} : {allRoles: result, page: {page : 0, size: 0, totalCount : 0}})
    return result.length > 0 ? {allRoles: result, page:  {page : record?.page || null, size: record?.size || null, totalCount : result[0].totalCount || 0}} : {allRoles: result, page: {page : 0, size: 0, totalCount : 0}};
  },
};

export default roleQueries;
