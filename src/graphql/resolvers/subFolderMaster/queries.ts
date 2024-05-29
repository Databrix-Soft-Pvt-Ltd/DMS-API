import { dbConnection } from '../../../db';
import {
  subFolderMaster,
  subFolderMasterWithFolderAndCabinet,
  AllSubFolderParam,
  GetAllSubFolders,
  AllSubFolders,
} from './types';

const queries = {
  getSubFolder: async (_: undefined, { id }: { id: number }): Promise<subFolderMaster[]> => {
    const result: any = await new Promise((resolve, reject) => {
      dbConnection.query('EXEC GetSubFolderMaster ?', [id], (err, rows: any) => {
        if (err) reject(err);

        console.log(rows);
        resolve(rows);
      });
    });

    return result;
  },

  getSubFolderWithFolderAndCabinet: async (
    _: undefined,
    { id }: { id: number },
  ): Promise<subFolderMasterWithFolderAndCabinet[]> => {
    const result: any = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetSubFolderMasterWithFolderAndCabinet ?',
        [id],
        (err, rows: any) => {
          if (err) reject(err);

          console.log(rows);
          resolve(rows);
        },
      );
    });

    return result;
  },
  getAllSubFolders: async (_: undefined, record: AllSubFolderParam): Promise<GetAllSubFolders> => {
    console.log('query was hit', record)
    const result: AllSubFolders[] = await new Promise((resolve, reject) => {
      dbConnection.query(
        'EXEC GetSubFolders ?,?,?,?,?,?,?,?',
        [
          record.subFolderId || 0,
          record.isActive || false,
          record.page || 0,
          record.size || 0,
          record.searchColumns || '',
          record.searchParam || '',
          record.orderAsc || '',
          record.orderDesc || '',
        ],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            console.log('rows length', rows?.length);
            console.log('row', rows && rows[0])
            if (rows && rows.length > 0) {
              resolve(rows);
            } else {
              reject(new Error('No rows returned from the stored procedure.'));
            }
          }
        },
      );
    });

    return result.length > 0
      ? {
          allSubFolder: result,
          page: {
            page: record?.page || null,
            size: record?.size || null,
            totalCount: result[0].totalCount || 0,
          },
        }
      : {
          allSubFolder: result,
          page: { page: 0, size: 0, totalCount: 0 },
        };
  },
};

export default queries;
